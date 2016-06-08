var req = new XMLHttpRequest();
req.open('POST', 'https://gc.evsfy.com');
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
var obj = {hello:'world'};
req.send(JSON.stringify(obj));
