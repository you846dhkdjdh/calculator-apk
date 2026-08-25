import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yusufcalculator.app',
  appName: 'Calculator by Yusuf',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#0B0E11',
      showSpinner: false,
      androidSpinnerStyle: 'small'
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0B0E11',
      overlaysWebView: true
    }
  }
};

export default config;