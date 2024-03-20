package com.nlp;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class ActivityStarter extends ReactContextBaseJavaModule {
    private static final String TAG = "ActivityStarter";

    public ActivityStarter(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    public void openFile(String filePath) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(filePath));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            getReactApplicationContext().startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(getReactApplicationContext(), "لطفا برنامه مخصوص فایل‌های PDF را نصب کنید.", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void fileExists(String filePath, Callback notFoundCallback) {
        Log.d(TAG, "fileExists: " + filePath);
        if (new File(filePath).exists()) {
            openFile(filePath);
        } else {
            notFoundCallback.invoke();
        }
    }

}