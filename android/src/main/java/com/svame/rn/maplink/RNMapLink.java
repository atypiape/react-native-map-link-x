package com.svame.rn.maplink;

import android.content.pm.PackageManager;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNMapLink extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    
    public RNMapLink(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNMapLink";
    }

    @ReactMethod
    public void isApkInstalled(String packageName, Promise promise) {
        if (TextUtils.isEmpty(packageName)) {
            promise.resolve(false);
            return;
        }

        try {
            reactContext.getPackageManager().getPackageInfo(packageName, 0);
            promise.resolve(true);
        } catch (PackageManager.NameNotFoundException e) {
            promise.resolve(false);
        }
    }
}
