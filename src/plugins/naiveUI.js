import { createDiscreteApi } from "naive-ui";

export const { notification } = createDiscreteApi(["notification"], {
  notificationProviderProps: { keepAliveOnHover: true }
});
