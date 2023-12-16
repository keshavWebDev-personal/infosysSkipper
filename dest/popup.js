"use strict";
var State;
(function (State) {
    State[State["running"] = 0] = "running";
    State[State["halted"] = 1] = "halted";
})(State || (State = {}));
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("startBtn");
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "get_state" }, (r) => {
            let state = r.data;
            console.log(state);
            if (state == State.halted) {
                btn.innerText = "Started, Stop?";
                btn.style.backgroundColor = "#ffd3d1";
                chrome.runtime.sendMessage({
                    action: "set_state",
                    data: State.running,
                });
            }
            else {
                btn.innerText = "Start Skipping";
                btn.style.backgroundColor = "#e0ffe2";
                chrome.runtime.sendMessage({
                    action: "set_state",
                    data: State.halted,
                });
            }
        });
    });
});
