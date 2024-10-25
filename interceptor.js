console.log("Interceptor loading...")

function base64ToWsMsg(base64) {
	return window.atob(base64)
}

function WsMsgToBase64(raw_data) {
	return window.btoa(raw_data);
}

const OriginalWebsocket = window.WebSocket
const ProxiedWebSocket = function() {
	console.log("Intercepting web socket creation")
	const ws = new OriginalWebsocket(...arguments)
	const originalAddEventListener = ws.addEventListener
	const proxiedAddEventListener = function() {
		if (arguments[0] === "message") {
			const cb = arguments[1]
			arguments[1] = function() {
				// TODO: MODIFY this section with what you want to do with incoming websocket messages
				var base64msg = WsMsgToBase64(arguments[0].data)
				console.log("incoming ws message: ", arguments[0].data)
				if (prompt("Intercept? Cancel for no. " + base64msg) !== null) {
					var newb64msg = prompt("Enter base64 encoded msg: " + base64msg)
					if (!newb64msg == ""){
						console.log("Old msg: ", base64msg)
						console.log("Passing: ", newb64msg)
						Object.defineProperty(arguments[0], "data", { value:  base64ToWsMsg(newb64msg) })
					}
				}
				console.log(arguments[0])
				return cb.apply(this, arguments)
			}
		}
		return originalAddEventListener.apply(this, arguments)
	}
	ws.addEventListener = proxiedAddEventListener
	Object.defineProperty(ws, "onmessage", {
		set(func) {
			return proxiedAddEventListener.apply(this, [
			"message",
			func,
			false
		]);
	}
	});

	const originalSend = ws.send
	const proxiedSend = function() {
		// TODO: MODIFY this section with what you want to do with outgoing websocket messages
		var base64msg = WsMsgToBase64(arguments[0])
		console.log("outgoing ws message: ", arguments[0])
		if (prompt("Intercept? Cancel for no. " + base64msg) !== null) {
			var newb64msg = prompt("Enter base64 encoded msg: " + base64msg)
			if (!newb64msg == "") {
				arguments[0] = base64ToWsMsg(newb64msg)
			}
		}
		return originalSend.apply(this, arguments)
	}
	ws.send = proxiedSend
	return ws
};
window.WebSocket = ProxiedWebSocket
