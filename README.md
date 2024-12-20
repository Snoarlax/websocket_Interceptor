# Websocket Interceptor

This firefox extension overrides the constructor for the WebSocket object which allows the user to intercept writes and reads of a websocket. This can be used as a replacement proxy if a network level proxy has issues. It prints the intercepted message as base64 which can be thrown into Burp Decoder before being passed back as base64. 

## Usage
On firefox, visit this page: [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox). Click load Temporary Add-on and load the extension. It should work on any pages loaded after this.

By default, this should parse and intercept websocket messages sent as raw data. This can be changed to your usecase, take a look at the #TODO parts of the interceptor.js file. Modify the script to parse the websocket data before converting it to base64 to use this script for your application.

Try it out on [https://echo.websocket.org/.ws](https://echo.websocket.org/.ws) and it should work.

## TODO
Using js prompts and base64 sucks - this needs a front end where messages can be intercepted.
Make it a proper addon rather than one that has to be loaded as a temporary add on 

## Credits

Credits to the wsHook library, this project just wraps it up in an extension and provides a "frontend" [https://github.com/skepticfx/wshook](https://github.com/skepticfx/wshook)
