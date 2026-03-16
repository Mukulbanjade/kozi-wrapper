# iOS Capacitor Reset – What Was Done

This document describes the steps taken to completely reset the iOS Capacitor setup while preserving Android and the web app.

---

## Commands Executed (in order)

### 1. Removed iOS folder and symlink

```bash
cd /Users/macbook/kozi-wrapper
rm -f ios                    # Remove symlink (if present)
rm -rf /Users/macbook/ios    # Remove the old iOS project folder
```

### 2. Cleared iOS-related caches

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/App-*
```

### 3. Re-added iOS platform

```bash
cd /Users/macbook/kozi-wrapper
npx cap add ios
```

### 4. Synced project

```bash
npx cap sync ios
```

### 5. Added push notification and camera setup

- **AppDelegate.swift** – Added `didRegisterForRemoteNotificationsWithDeviceToken`, `didFailToRegisterForRemoteNotificationsWithError`, and `didReceiveRemoteNotification`.
- **Info.plist** – Added `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`, and `UIBackgroundModes` (remote-notification).

---

## Verification

### iOS structure

- **Project root:** `/Users/macbook/kozi-wrapper`
- **iOS folder:** `/Users/macbook/kozi-wrapper/ios/` (real folder, not symlink)
- **Xcode project:** `ios/App/App.xcodeproj`
- **CapApp-SPM:** `ios/App/CapApp-SPM/Package.swift` (plugins: Camera, Push Notifications)

### Android and web

- **Android:** `android/` – unchanged
- **Web assets:** `www/` – unchanged
- **Config:** `capacitor.config.json` – unchanged

---

## Next Steps for You

### 1. Add Push Notifications capability in Xcode

1. Open Xcode: `npx cap open ios`
2. Select the **App** target → **Signing & Capabilities**.
3. Click **+ Capabilities**.
4. Add **Push Notifications**.
5. Add **Background Modes** and enable **Remote notifications**.

### 2. Add Firebase (if you use FCM)

- Download `GoogleService-Info.plist` from the Firebase Console.
- Place it in `ios/App/App/`.
- Add the FirebaseMessaging Swift package in Xcode (or use CocoaPods).
- See: [Capawesome Push Notifications Guide](https://capawesome.io/blog/the-push-notifications-guide-for-capacitor/)

### 3. Build and run

```bash
cd /Users/macbook/kozi-wrapper
npx cap open ios
```

Then in Xcode: select a device or simulator and press **Run** (⌘R).

---

## Workflow from now on

```bash
cd /Users/macbook/kozi-wrapper
# After web changes:
npm run build   # or your build command
npx cap sync ios
npx cap open ios
```
