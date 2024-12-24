import fs from "fs";
import path from "path";

const defaultOpts = {
  lookupDir: "src",
  outputFile: "src/plugins/fontawesome-autoimport.js",
  iconRegex: /\[['"](fa[a-z])['"], *['"]([a-z0-9-]+)['"]\]/g,
  fileRegex: /\.(vue|js)$/,
  outputHeader: `/* eslint-disable */\n// prettier-ignore\n// Auto generated by vite-plugin-fontawesome-autoimport\n\n`
};

const autoImport = ({
  rootDir,
  lookupDir,
  outputFile,
  iconRegex,
  fileRegex,
  outputHeader
}) => {
  const beginAt = Date.now();
  const { dependencies } = JSON.parse(
    fs.readFileSync(`${rootDir}/package.json`)
  );
  const styles = Object.keys(dependencies).reduce((acc, dependency) => {
    if (!/^@fortawesome.*svg-icons$/.test(dependency)) return acc;
    const [, license, name] = dependency.match(
      /^@fortawesome\/([a-z]+)-([a-z]+)-svg-icons$/
    );
    return { ...acc, [`fa${name[0]}`]: { name, license, icons: new Map() } };
  }, {});
  const consolidatedIcons = [];
  const prevConsolidatedIcons = [
    ...new Set(
      [
        ...(fs.existsSync(outputFile) && fs.readFileSync(outputFile))
          .toString()
          .matchAll(/fa[a-z][A-Z]\w+/g)
      ].map(([icon]) => icon)
    )
  ].sort();

  const setIcons = file =>
    [...fs.readFileSync(file).toString().matchAll(iconRegex)].forEach(
      ([, style, name]) =>
        styles[style]
          ? styles[style].icons.set(name)
          : console.warn(`! Unknown icon: ${style}-${name} (in ${file})`)
    );

  const parse = path =>
    fs.readdirSync(path).forEach(entry => {
      const entryPath = `${path}/${entry}`;

      fs.lstatSync(entryPath).isDirectory()
        ? parse(entryPath)
        : fileRegex.test(entry) && setIcons(entryPath);
    });

  parse(lookupDir);

  let output = Object.entries(styles).reduce(
    (acc, [style, { name, license, icons }]) =>
      icons.size
        ? `${acc}\n// ${style}\nimport {${[...icons.keys()]
            .sort()
            .reduce((acc, icon) => {
              const pascalIcon = icon.replace(
                /(^|-)([a-z0-9])/g,
                (_match, _prev, char) => char.toUpperCase()
              );
              consolidatedIcons.push(`${style}${pascalIcon}`);
              return `${acc}\n  fa${pascalIcon} as ${style}${pascalIcon},`;
            }, "")}\n} from "@fortawesome/${license}-${name}-svg-icons";\n`
        : acc,
    outputHeader
  );

  output += `\nimport { library } from "@fortawesome/fontawesome-svg-core";\n`;
  output += `library.add(\n  ${consolidatedIcons.join(",\n  ")}\n);\n`;

  // Update the output file only if necessary
  if (
    JSON.stringify(prevConsolidatedIcons) === JSON.stringify(consolidatedIcons)
  )
    return console.log(
      `- Fontawesome treeshaking list already up-to-date. (took ${
        Date.now() - beginAt
      } ms)`
    );

  fs.mkdir(path.dirname(outputFile), { recursive: true }, err => {
    if (err) throw err;

    fs.writeFile(outputFile, output, err =>
      console.log(
        err ||
          `- Fontawesome treeshaking list generated. (took ${
            Date.now() - beginAt
          } ms)`
      )
    );
  });
};

export default (options = {}) => ({
  name: "vite-plugin-fontawesome-autoimport",
  configResolved({ root }) {
    autoImport({ rootDir: root, ...defaultOpts, ...options });
  },
  handleHotUpdate({ server: { config: { root } = {} } }) {
    autoImport({ rootDir: root, ...defaultOpts, ...options });
  }
});