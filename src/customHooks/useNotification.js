// ./src/customeHooks/useNotification.js
import { App } from "antd";

const useNotification = () => {
  const { notification } = App.useApp();

  const onNotify = (type, message, description) => {
    switch (type) {
      case "success":
        notification.success({
          message,
          description,
          placement: "topRight",
        });
        break;

      case "error":
        notification.error({
          message,
          description,
          placement: "topRight",
        });
        break;
      case "warning":
        notification.warning({
          message,
          description,
          placement: "topRight",
        });
        break;
      default:
        notification.info({
          message,
          description,
          placement: "topRight",
        });
        break;
    }
  };

  return { onNotify };
};

export default useNotification;