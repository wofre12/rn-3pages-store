/** @type {import('@react-native-community/cli-types').Config} */
module.exports = {
  dependencies: {
    'react-native-gesture-handler': { platforms: { android: null } },
    '@react-native-community/netinfo': { platforms: { android: null } },
    'react-native-biometrics': { platforms: { android: null } },
    'react-native-mmkv': { platforms: { android: null } },
    'react-native-safe-area-context': { platforms: { android: null } },
    'react-native-screens': { platforms: { android: null } },
  },
  project: {
    android: { sourceDir: './android', packageName: 'com.gehad_hassan.rn3pagesstore' },
    ios: { sourceDir: './ios' }, // if you have iOS
  },
  assets: [],
};
