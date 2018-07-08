import { settingsStorage } from "settings";
import * as messaging from "messaging";

// Settings have been changed
settingsStorage.onchange = function(evt) {
  if (evt.newValue !== evt.oldValue) {
    sendValue(evt.key, evt.newValue);
  }
}

// Send key/value pair
function sendValue(key, val) {
  if (!key || !val) {
    return;
  };
  
  sendSettingData({
    key: key,
    value: JSON.parse(val)
  });
}

// Send JSON object
function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}