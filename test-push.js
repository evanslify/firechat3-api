var apn = require('apn');
var notify = new apn.Notification();
notify.device = new apn.Device("44533ec5de2e314f8eeb9f56ba5cf80a4240b2812855355ff99b8f38547d52df"); // ""裡面放欲推撥裝置的token
notify.badge = 100;     // App icon上面的數字badge
notify.alert = "測試XD";    // 推撥顯示文字
new apn.Connection({
    cert:'./apn-cert/cert.pem',
    key:'./apn-cert/key.pem',
    gateway:'gateway.sandbox.push.apple.com'
   }).sendNotification(notify);
