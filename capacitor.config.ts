import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aelion.myfabgallery',
  appName: 'my-fab-gallery',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": "3000",
      "launchAutoHide": true,
      "androidScaleType": "CENTER_CROP",
      "splashImmersive": "true",
      "backgroundColor": "#ffffff"
    }
  }
};

export default config;
