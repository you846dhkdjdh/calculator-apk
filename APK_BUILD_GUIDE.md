# Calculator by Yusuf - APK Build Guide

## 🎯 نظرة عامة

هذا المشروع هو تطبيق آلة حاسبة علمية متقدمة مبني باستخدام Capacitor وVite، مصمم للعمل على أجهزة Android.

## 📱 المميزات

✅ **حسابات أساسية**: جمع، طرح، ضرب، قسمة  
✅ **وظائف متقدمة**: جذر، أس، دوال مثلثية (sin, cos, tan)  
✅ **وظائف لوغاريتمية**: log, ln  
✅ **ثوابت**: π (pi)، e (euler)  
✅ **واجهة عربية**: دعم كامل للغة العربية  
✅ **تصميم حديث**: واجهة مظلمة بألوان زاهية  
✅ **تكامل Capacitor**: وصول كامل لميزات Android

## 🚀 البدء السريع

### 1. المتطلبات

- Node.js v16+
- Java JDK 11+
- Android SDK
- Android Studio (موصى به)

### 2. التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/you846dhkdjdh/calculator-apk.git
cd calculator-apk

# تثبيت الحزم
npm install
```

### 3. بناء وتشغيل

```bash
# بناء الويب
npm run build

# إضافة Android
npx cap add android

# نسخ الملفات
npx cap copy

# فتح Android Studio
npx cap open android
```

## 📂 هيكل المشروع

```
calculator-apk/
├── index.html              # الصفحة الرئيسية
├── main.ts                 # منطق التطبيق (TypeScript)
├── style.css               # الأنماط
├── capacitor.config.ts     # إعدادات Capacitor
├── vite.config.ts          # إعدادات Vite
├── tailwind.config.js      # إعدادات Tailwind
├── package.json            # المتطلبات والحزم
├── manifest.json           # بيان تطبيق الويب
├── android/                # مشروع Android Studio
│   ├── app/
│   ├── build.gradle
│   └── settings.gradle
└── README.md               # هذا الملف
```

## 🛠️ أوامر مهمة

```bash
# تطوير محلي
npm run dev                # يشغل خادم تطوير

# بناء
npm run build              # بناء الويب

# Capacitor
npx cap add android        # إضافة منصة Android
npx cap copy               # نسخ الملفات إلى Android
npx cap sync               # مزامنة كاملة
npx cap open android       # فتح Android Studio

# Gradle (في مجلد android)
./gradlew assembleDebug    # بناء APK للتصحيح
./gradlew assembleRelease  # بناء APK للإصدار
./gradlew clean            # تنظيف البناء
```

## 📋 خطوات بناء APK كاملة

### للتطوير (Debug APK)

1. **تثبيت المتطلبات**
   ```bash
   npm install
   ```

2. **بناء الويب**
   ```bash
   npm run build
   ```

3. **إضافة Android وفتح Android Studio**
   ```bash
   npx cap add android
   npx cap copy
   npx cap open android
   ```

4. **في Android Studio**
   - انتظر انتهاء مزامنة Gradle
   - اذهب إلى `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - اختر `debug`
   - انقر على `Finish`

5. **البحث عن APK**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### للإصدار (Release APK)

```bash
cd android
./gradlew assembleRelease
```

ملف APK في:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 🔧 التخصيص

### تغيير اسم التطبيق

في `capacitor.config.ts`:
```typescript
appName: 'اسم تطبيقك'
```

### تغيير حزمة التطبيق

في `capacitor.config.ts`:
```typescript
appId: 'com.yourcompany.appname'
```

### تغيير الألوان

في `index.html` ضمن `<style>`:
```css
--accent-amber: #FFB454;  /* اللون الأساسي */
--bg-canvas: #0B0E11;     /* لون الخلفية */
```

## 🐛 استكشاف الأخطاء

### "JAVA_HOME not set"
```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11

# macOS/Linux
export JAVA_HOME=/usr/libexec/java_home -v 11
```

### "Android SDK not found"
```bash
export ANDROID_SDK_ROOT=~/Library/Android/sdk
```

### "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
npm install
npm run build
npx cap copy
```

## 📦 توزيع على Google Play Store

1. إنشاء مفتاح توقيع (keystore)
   ```bash
   keytool -genkey -v -keystore calculator.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias calculator
   ```

2. بناء release APK
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. توقيع APK
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore calculator.keystore \
   app/build/outputs/apk/release/app-release.apk calculator
   ```

4. تحميل على Google Play Console

## 📞 الدعم

للمزيد من المعلومات:
- [Capacitor Docs](https://capacitorjs.com)
- [Android Developer](https://developer.android.com)
- [Vite Docs](https://vitejs.dev)

## 📄 الترخيص

MIT License

---

**صُنع بـ ❤️ من قبل Yusuf**
