import Toast from "react-native-toast-message";

export default Toast;

// tiny helpers so you can call toast.success(...) anywhere
export const toast = {
  success: (msg: string) => Toast.show({ type: "success", text1: msg }),
  error: (msg: string) => Toast.show({ type: "error", text1: msg }),
  info: (msg: string) => Toast.show({ type: "info", text1: msg }),
};
