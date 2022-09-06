package com.todolistandroid;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.time.Year;
import java.util.Calendar;
import java.util.Map;
import android.content.Intent;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.provider.Settings;

import java.util.HashMap;
import android.util.Log;
import android.app.AlarmManager;
import android.widget.Toast;

public class AlarmModule extends ReactContextBaseJavaModule{

    @Override    
        public boolean canOverrideExistingModule() {        
          return true;    
        }   

    private static ReactApplicationContext reactContext;
    AlarmModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public String setAlarm(Integer year, Integer month, Integer day, Integer hour, Integer minute){
        AlarmManager alarmManager = (AlarmManager) reactContext.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this.getCurrentActivity(), MyAlarm.class);
        Calendar date = Calendar.getInstance();
        date.set(year, month, day, hour, minute, 0);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(this.getCurrentActivity(), 0, intent, PendingIntent.FLAG_IMMUTABLE);
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, date.getTimeInMillis(), pendingIntent);

        Toast.makeText(this.getCurrentActivity(), "Task reminder has been scheduled", Toast.LENGTH_SHORT).show();
        return "It is Done";
    }

    @ReactMethod
    public void cancelAlarm() {
        Intent intent = new Intent(this.getCurrentActivity(), MyAlarm.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this.getCurrentActivity(), 0, intent, 0);
        AlarmManager alarmManager = (AlarmManager) reactContext.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(pendingIntent);
    }

}
