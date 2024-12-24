<template>
  <div
    class="bg-black text-white min-h-screen flex flex-col text-center justify-center p-5"
  >
  <div v-if="!started" >

    <div class="mb-5">
      <div class="text-lg">Bonjour Marie,</div>

      <div>Afin de découvrir ton cadeau de Noël</div>
      <div>Voici quelques étapes préliminaires ...</div>
    </div>

    <NButton type="primary" @click="Object.assign(this, {started: true, step : 1, firstClue: true })">
      Démarrer
    </NButton>
  </div>

  <div v-if="step === 1 && firstClue">
    <div>PREMIERE QUESTION</div>
    Voici le premier indice:
    <img src="@/assets/Léon_Blum.jpg" />

    <NButton type="secondary" @click="Object.assign(this, { firstClue: false, secondClue: true})">
      Un autre indice ?
    </NButton>
    <NButton type="primary" @click="step = 2" class="mt-5">
      Non, j'ai la réponse<fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 1 && secondClue">
    <div>PREMIERE QUESTION</div>
    Un autre indice:
    <img src="@/assets/orlando_bloom.jpg" />

    <NButton type="primary" @click="Object.assign(this, { secondClue: false, step: 2})" class="mt-5">
      Suivant <fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 2">
    Entre ta réponse:
    <NInput v-model:value="answerOne" />
    <NButton type="primary" class="mt-5" @click="checkAnswerOne">
      VALIDER <fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 3" >

    <div class="mb-5">
      <div class="text-lg">Bien joué,</div>

      <div>Tu as trouvé le premier indice de ton cadeau</div>
      <div>Clique pour continuer ...</div>
    </div>

    <NButton type="primary" @click="Object.assign(this, {step : 4, thirdClue: true })">
      Continuer
    </NButton>
  </div>

  <div v-if="step === 4 && thirdClue">
    <div>SECONDE QUESTION</div>
    Voici le premier indice:
    <img src="@/assets/Laurent_Garnier.png" />

    <NButton type="secondary" @click="Object.assign(this, { thirdClue: false, fourthClue: true})">
      Un autre indice ?
    </NButton>
    <NButton type="primary" @click="step = 5" class="mt-5">
      Non, j'ai la réponse<fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 4 && fourthClue">
    <div>SECONDE QUESTION</div>
    Un autre indice:
    <img src="@/assets/dr_house.jpg" />

    <NButton type="primary" @click="Object.assign(this, { fourthClue: false, step: 5})" class="mt-5">
      Suivant <fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 5">
    Entre ta réponse:
    <NInput v-model:value="answerTwo" />
    <NButton type="primary" class="mt-5" @click="checkAnswerTwo">
      VALIDER <fa :icon="['fad', 'chevron-right']" class="ml-2" />
    </NButton>
  </div>

  <div v-if="step === 6">
    Voici ton cadeau:
    <a href="https://bloomhouse-hotel.com" class="bg-blue-500 underline">
      {{ answerOne }} {{ answerTwo }}
    </a> (clique pour découvrir)
  </div>

  </div>
</template>

<script>
import { notification } from "@/plugins/naiveUI.js";

export default {
  data: () => ({
    started: false,
    step: 0,
    firstClue: false,
    secondClue: false,
    thirdClue: false,
    fourthClue: false,
    answerOne: "",
    answerTwo: ""
  }),
  methods: {
    checkAnswerOne() {
      const regex = /^(bloom|blum)$/i;
      if (regex.test(this.answerOne)) {
        notification.success({
          title: "BRAVO !",
          content: "Tu as trouvé !",
          duration: 2500
        });
        Object.assign(this, { step: 3, firstClue: false, secondClue: false })
      } else {
        notification.success({
          title: "Eh non ...",
          content: "Dommage, essaye encore ...",
          duration: 2500
        });
        setTimeout(() => {
          Object.assign(this, { step: 1, firstClue: false, secondClue: true })
        }, 1500);
      }
    },
    checkAnswerTwo() {
      const regex = /^(house)$/i;
      if (regex.test(this.answerTwo)) {
        notification.success({
          title: "BRAVO !",
          content: "Tu as trouvé !",
          duration: 2500
        });
        Object.assign(this, { step: 6, thirdClue: false, fourthClue: false })
      } else {
        notification.success({
          title: "Eh non ...",
          content: "Dommage, essaye encore ...",
          duration: 2500
        });
        setTimeout(() => {
          Object.assign(this, { step: 4, thirdClue: false, fourthClue: true })
        }, 1500);
      }
    }
  }
};
</script>
