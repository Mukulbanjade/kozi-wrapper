# Push Notifications Setup - Kozi

## What's Already Done ✓

1. **iOS**
   - Push capability enabled in `App.entitlements` (aps-environment)
   - APNs token handling in AppDelegate
   - `GoogleService-Info.plist` added to Xcode project

2. **Android**
   - `google-services.json` configured for com.kozi.rest
   - Firebase Messaging in use

3. **Capacitor**
   - PushNotifications plugin configured in capacitor.config.json
   - Presentation options: badge, sound, alert

---

## Step 1: Get Real GoogleService-Info.plist (iOS)

The current plist has placeholder values. **You must download the real file from Firebase:**

1. Go to [Firebase Console](https://console.firebase.google.com) → your project **kozi-c4b4b**
2. Project Settings (gear) → **Your apps**
3. If you see your iOS app (com.kozi.rest), click **Download GoogleService-Info.plist**
4. If not, click **Add app** → **iOS** → Bundle ID: `com.kozi.rest` → Download the plist
5. Replace the file at:  
   `kozi-wrapper/ios/App/App/GoogleService-Info.plist`

---

## Step 2: Add Push Registration to Your Web App

Your app loads from `https://worker-finder-spot.lovable.app/`. Add push registration there:

1. Include the Capacitor script in your HTML:
   ```html
   <script src="capacitor.js"></script>
   ```

2. Add this code where your app initializes (or use `www/push-registration.js` as reference):
   ```javascript
   import { PushNotifications } from '@capacitor/push-notifications';

   async function initPush() {
     const perm = await PushNotifications.requestPermissions();
     if (perm.receive === 'granted') {
       await PushNotifications.register();
     }
   }

   PushNotifications.addListener('registration', (token) => {
     // Send token.value to your backend
     console.log('Token:', token.value);
   });

   initPush();
   ```

3. **Important:** Send the token to your backend so you can target this device when sending push notifications.

---

## Step 3: Test Push Notifications

### Android
1. Build and run the app on a device
2. Grant notification permission when prompted
3. In Firebase Console → **Engage** → **Messaging** → **Create campaign** → **Firebase Notification messages**
4. Send a test message – use the FCM token from your backend/logs

### iOS
1. Build and run on a **physical** iPhone (push doesn’t work in Simulator)
2. Grant notification permission
3. Use the same flow in Firebase Console with the device token from your backend

---

## Summary

| Platform | Status |
|----------|--------|
| Firebase Console | APNs key added ✓ |
| Android | google-services.json ✓ |
| iOS | GoogleService-Info.plist added (replace with real file from Firebase) |
| Push registration | Add to your web app (Lovable) |
