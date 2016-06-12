var firebase = require("firebase"),
    moment = require('moment'),
    gcm = require('node-gcm');

firebase.initializeApp({
  databaseURL: "https://chatapp-53089.firebaseio.com/",
  serviceAccount: "./firebase-cert/ChatApp-cc98693ad5f5.json"
});

var db = firebase.database();
var msgRef = db.ref('messages');
var tokenRef = db.ref('tokens');


var tokens = [];
tokenRef.on("child_added", function(snapshot) {
        var data = snapshot.val();
        console.log('added token:', snapshot.key, data);
        tokens.push(data);
        console.log(tokens);
    }
);

msgRef.orderByChild('time').startAt(
    starttime()).on("child_added", function(snapshot) {
        var data = snapshot.val();
        var title = snapshot.key;
        console.log('chat message:', data);
        broadcast(data.username, data.message);
    }
);

function broadcast(username, content) {
    console.log('attempt to send notification:', username, content);
    var content = username + ': ' + content;
    var message = new gcm.Message({
        priority: "high",
        notification: {
            title: "FireChat",
            body: content
        }
    });
    var sender = new gcm.Sender("AIzaSyB0g2jxzqhPTlwZL9AxRvmD0NGbtL-Eg9I");
    var registrationTokens = {
        registrationTokens: tokens
    };
    sender.send(message, registrationTokens, 10, function (err, response) {
      if(err) {
        console.error('push failed:', err);
      } else {
        console.log('push success:', response);
      }
    });
}

function starttime () {
    var start = moment().format('YYYY/MM/DD, hh:mm:ss');
    console.log('start time:', start);
    return start;
}
