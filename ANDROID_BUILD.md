# Build instructions for Android APK

## المتطلبات - Requirements

### Windows:
```bash
# 1. تثبيت Node.js من https://nodejs.org/
# 2. تثبيت Java JDK 11 من https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
# 3. تثبيت Android Studio من https://developer.android.com/studio
```

### macOS:
```bash
brew install node
brew install openjdk@11
# تثبيت Android Studio من https://developer.android.com/studio
```

### Linux:
```bash
sudo apt-get install nodejs npm openjdk-11-jdk
# تثبيت Android Studio من https://developer.android.com/studio
```

## خطوات البناء السريعة

```bash
# 1. استنساخ المشروع
git clone https://github.com/you846dhkdjdh/calculator-apk.git
cd calculator-apk

# 2. تثبيت الحزم
npm install

# 3. بناء المشروع
npm run build

# 4. إضافة منصة Android
npx cap add android

# 5. نسخ الملفات
npx cap copy

# 6. فتح Android Studio
npx cap open android
```

## بناء APK في Android Studio

1. افتح `android/` مجلد في Android Studio
2. اذهب إلى `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. اختر `debug` أو `release`
4. انتظر انتهاء البناء

## موقع ملف APK

```
android/app/build/outputs/apk/debug/app-debug.apk
أو
android/app/build/outputs/apk/release/app-release.apk
```

## تثبيت APK على الهاتف

```bash
# تثبيت باستخدام ADB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# أو الضغط على الملف مباشرة على الهاتف
```

## استكشاف الأخطاء

### خطأ: "JAVA_HOME is not set"
```bash
# على Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11

# على macOS/Linux
export JAVA_HOME=/usr/libexec/java_home -v 11
```

### خطأ: "Android SDK not found"
```bash
# على Windows
set ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk

# على macOS
export ANDROID_SDK_ROOT=~/Library/Android/sdk

# على Linux
export ANDROID_SDK_ROOT=~/Android/Sdk
```

### خطأ: "Gradle build failed"
```bash
# مسح الذاكرة المؤقتة
cd android
./gradlew clean
cd ..
npm install
npm run build
npx cap copy
```

## حل المشاكل الشائعة

1. **APK كبير جداً**: قم بتمكين ProGuard في `android/app/build.gradle`
2. **بطء البناء**: استخدم `./gradlew assembleDebug` مباشرة
3. **مشاكل في الذاكرة**: زيادة `org.gradle.jvmargs` في `gradle.properties`

## بناء Release APK (للنشر)

```bash
cd android
./gradlew bundleRelease
# أو
./gradlew assembleRelease
```

ستحتاج إلى:
- keystore file
- key alias
- passwords

## المزيد من المعلومات

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer](https://developer.android.com/)
- [Gradle Documentation](https://gradle.org/)
