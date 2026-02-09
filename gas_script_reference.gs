function doPost(e) {
  // 1. Parse JSON payload
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('log'); 
  // Ensure 'log' sheet exists

  // 2. Log to Spreadsheet
  sheet.appendRow([
    data.timestamp,
    data.memberId,
    data.memberName,
    data.status,
    data.leavingTime,
    data.notificationMethod, // Recorded for debugging/audit
    data.email1,
    data.email2
  ]);

  // 3. Handle Notifications
  var messages = [];
  var messageText = createMessageText(data);

  // LINE Notification
  if (data.lineUserId && (data.notificationMethod === 'line' || data.notificationMethod === 'both')) {
    sendLineMessage(data.lineUserId, messageText);
  }

  // Email Notification
  if ((data.notificationMethod === 'email' || data.notificationMethod === 'both')) {
    if (data.email1) sendEmail(data.email1, "【羽村さくら】練習活動通知", messageText);
    if (data.email2) sendEmail(data.email2, "【羽村さくら】練習活動通知", messageText);
  }

  return ContentService.createTextOutput("Success");
}

function createMessageText(data) {
  var time = new Date(data.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  if (data.status === 'present') {
    return `【羽村さくら】\n${data.memberName}さんが練習に参加しました。（${time}）`;
  } else if (data.status === 'leaving_early') {
    return `【羽村さくら】\n${data.memberName}さんが早退しました。（退出予定：${data.leavingTime}）`;
  } else if (data.status === 'left') {
    return `【羽村さくら】\n${data.memberName}さんが退出しました。（${time}）`;
  }
  return "";
}

function sendLineMessage(userId, text) {
  var token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
  var url = "https://api.line.me/v2/bot/message/push";
  var payload = {
    to: userId,
    messages: [{ type: 'text', text: text }]
  };
  
  UrlFetchApp.fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'post',
    payload: JSON.stringify(payload)
  });
}

function sendEmail(to, subject, body) {
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body
  });
}
