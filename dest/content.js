"use strict";
var State;
(function (State) {
    State[State["running"] = 0] = "running";
    State[State["halted"] = 1] = "halted";
})(State || (State = {}));
let intervalT = 500;
let intervalId = 0;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.action == "set_state") {
        if (msg.data == State.running) {
            intervalId = setInterval(() => {
                const bigPlayButton = document.querySelector("button.vjs-big-play-button");
                const progressBarDiv = document.querySelector('div[aria-label="Progress Bar"]');
                if (bigPlayButton) {
                    setTimeout(() => {
                        bigPlayButton.click();
                    }, 1000);
                }
                if (progressBarDiv) {
                    const sliderBarElement = progressBarDiv.querySelector(".vjs-slider-bar");
                    const progressBarW = getComputedStyle(progressBarDiv).getPropertyValue("width");
                    if (sliderBarElement) {
                        const sliderBarW = getComputedStyle(sliderBarElement).getPropertyValue("width");
                        if (progressBarW !== sliderBarW) {
                            const videoElement = document.querySelector("video");
                            if (videoElement && videoElement.duration) {
                                videoElement.currentTime =
                                    videoElement.duration;
                                progressBarDiv.style.width = sliderBarW;
                                const playProgresElem = progressBarDiv.querySelector(".vjs-play-progress.vjs-slider-bar");
                                if (playProgresElem)
                                    playProgresElem.style.width = "100%";
                            }
                        }
                        else {
                            const nextContentButton = document.querySelector('[aria-label="next content"]');
                            if (nextContentButton)
                                nextContentButton.click();
                        }
                    }
                }
            }, intervalT);
        }
        else if (msg.data == State.halted) {
            clearInterval(intervalId);
        }
    }
});
