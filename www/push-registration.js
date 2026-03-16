/**
 * Push Notification Registration for Capacitor
 * Include this script in your web app (e.g. worker-finder-spot.lovable.app)
 * and call initPushNotifications() when your app loads.
 */

async function initPushNotifications() {
  const cap = window.Capacitor || window.capacitor;
  if (!cap?.Plugins?.PushNotifications) return;

  const PushNotifications = cap.Plugins.PushNotifications;

  try {
    // Request permission and register
    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    // Listen for registration success - you get the token here
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token:', token.value);
      // TODO: Send token.value to your backend server
      // Example: fetch('/api/register-push-token', { method: 'POST', body: JSON.stringify({ token: token.value }) });
    });

    // Listen for registration errors
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
    });

    // Listen for received notifications (when app is in foreground)
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received:', notification);
    });

    // Listen for notification taps (when user taps notification)
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('Push action performed:', action);
    });
  } catch (err) {
    console.error('Push init error:', err);
  }
}

// Auto-init when running in Capacitor native app
const cap = window.Capacitor || window.capacitor;
if (cap?.isNativePlatform?.()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPushNotifications);
  } else {
    initPushNotifications();
  }
}
