console.log("Interceptor loading...")

function base64ToWsMsg(base64) {
	return window.atob(base64)
}

function WsMsgToBase64(raw_data) {
	return window.btoa(raw_data)
}

wsHook.before = function(data, url, wsObject) {
	console.log("INTERCEPTED: Sending message to " + url + " : " + data)
	var base64msg = WsMsgToBase64(data)
	if (prompt("WS SENT: Intercept? Cancel for no. " + base64msg) !== null) {
		var newb64msg = prompt("Enter base64 encoded msg: " + base64msg)
		if (!newb64msg == "") {
			data = base64ToWsMsg(newb64msg)
		}
	}
	return data
}

// Make sure your program calls `wsClient.onmessage` event handler somewhere.
wsHook.after = function(messageEvent, url, wsObject) {
	console.log("INTERCEPTED: Received message from " + url + " : " + messageEvent.data)
	var base64msg = WsMsgToBase64(messageEvent.data)
	if (prompt("WS RECIEVED: Intercept? Cancel for no. " + base64msg) !== null) {
		var newb64msg = prompt("Enter base64 encoded msg: " + base64msg)
		if (!newb64msg == ""){
			messageEvent.data = base64ToWsMsg(newb64msg)
		}
	}
	return messageEvent
}

console.log("Intercepting web socket creation")
