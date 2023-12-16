"use strict";
var State;
(function (State) {
    State[State["running"] = 0] = "running";
    State[State["halted"] = 1] = "halted";
})(State || (State = {}));
var state = State.halted;
chrome.runtime.onMessage.addListener((msg, send, res) => {
    if (msg && msg.action == "get_state") {
        res({ data: state });
    }
    else if (msg && msg.action == "set_state") {
        state = msg.data;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "set_state", data: state });
            }
        });
    }
});
