module.exports = {
  proguardFiles: [
    getDefaultProguardFile('proguard-android.txt'),
    'proguard-rules.pro'
  ],
  minifyEnabled: true,
  shrinkResources: true,
  optimize: true,
  debuggable: false
};
