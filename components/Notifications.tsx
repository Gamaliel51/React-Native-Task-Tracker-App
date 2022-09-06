/* eslint-disable prettier/prettier */
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { NativeModules } from 'react-native';
class Notifications {
  constructor() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,

      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
      onAction: function (notification) {
        if (notification.action === 'Dismiss') {
          PushNotification.cancelLocalNotification(notification.id);
          const {AlarmModule} = NativeModules;
          AlarmModule.cancelAlarm();
        }
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  schduleNotification(intask: string, date: Date) {
    date.setMinutes(date.getMinutes() - 1);
    date.setSeconds(date.getSeconds() + 20);
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🔔 Reminder!',
      message: intask,
      userInfo: {id :intask},
      ignoreInForeground: false,
      vibrate: true,
      vibration: 2000,
      playSound: true,
      actions: ['Dismiss'],
      priority: 'high',
      allowWhileIdle: true,
      date,
    });
  }

  cancelNotification(taskContent: string) {
    PushNotification.getScheduledLocalNotifications(rn => {
        for (let i = 0; i < rn.length; i++){
            if (rn[i].message === taskContent){
                PushNotification.cancelLocalNotification(rn[i].id);
            }
        }
    });
  }
}

export default new Notifications();
