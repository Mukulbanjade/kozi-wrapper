package com.kozi.rest;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        // Remove splash instantly with no slide/exit animation
        splashScreen.setOnExitAnimationListener(splashScreenView -> splashScreenView.remove());
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onStart() {
        super.onStart();
        // Capacitor's bridge and WebView are fully initialized by onStart.
        // Calling getWebView() in onCreate() can NPE if the bridge isn't ready yet.
        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView != null) {
            webView.setLongClickable(false);
            webView.setOnLongClickListener(v -> true);
            webView.setHapticFeedbackEnabled(false);
        }
    }
}
