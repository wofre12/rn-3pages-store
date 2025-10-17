
declare module "react-native-biometrics" {
    export default class ReactNativeBiometrics {
      isSensorAvailable(): Promise<{ available: boolean; biometryType?: string }>;
      simplePrompt(options: { promptMessage: string }): Promise<{ success: boolean }>;
    }
  }
  