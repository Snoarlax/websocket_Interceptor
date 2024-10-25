# Websocket Interceptor

This firefox extension overrides the constructor for the WebSocket object which allows the user to intercept writes and reads of a websocket. This can be used as a replacement proxy if a network level proxy has issues. It prints the intercepted message as base64 which can be thrown into Burp Decoder before being passed back as base64. 

## Usage
On firefox, visit this page: [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox). Click load Temporary Add-on and load the extension. It should work on any pages loaded after this.

By default, this should parse and intercept websocket messages sent as raw data. This can be changed to your usecase, take a look at the #TODO parts of the interceptor.js file. Modify the script to parse the websocket data before converting it to base64 to use this script for your application.

Try it out on [https://echo.websocket.org/.ws](https://echo.websocket.org/.ws) and it should work.

## TODO
Using js prompts and base64 sucks - this needs a front end where messages can be intercepted.
Lots of repeated code, it could be optimised
Make it a proper addon rather than one that has to be loaded as a temporary add on 
I'm not conviced the "incoming" interceptor is working, i'll look into it sometime, maybe use [https://github.com/skepticfx/wshook](https://github.com/skepticfx/wshook) for hooking instead?

## Credits

Credits to the following Stackoverflow post, most of the code is taken from there:

[https://stackoverflow.com/questions/70205816/intercept-websocket-messages](https://stackoverflow.com/questions/70205816/intercept-websocket-messages)

The code from Ionică Bizău comprised most of this extension, I just wrapped it up into an extension. It was the one that worked best with my version of Firefox.

