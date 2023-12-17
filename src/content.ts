enum State {
    running = 0,
    halted = 1,
}

let intervalT = 500;
let intervalId = 0;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.action == "set_state") {
        if (msg.data == State.running) {
            intervalId = setInterval(() => {
                const bigPlayButton = document.querySelector<HTMLButtonElement>("button.vjs-big-play-button");
                const progressBarDiv = document.querySelector<HTMLElement>('div[aria-label="Progress Bar"]');

                if (bigPlayButton) {
                    setTimeout(() => {
                        bigPlayButton.click();
                    }, 300);
                }
                if (!progressBarDiv) return;

                const sliderBarElement = progressBarDiv.querySelector<HTMLElement>(".vjs-slider-bar");
                const progressBarW = getComputedStyle(progressBarDiv).getPropertyValue("width");
                if (!sliderBarElement) return;

                const sliderBarW = getComputedStyle(sliderBarElement).getPropertyValue("width");

                if (progressBarW !== sliderBarW) {
                    
                    const videoParent = document.querySelector('[aria-label="Video Player"]');
                    if (!videoParent) return;

                    const videoElement = videoParent.querySelector<HTMLVideoElement>("video");
                    if (!videoElement || !videoElement.duration) return;

                    setTimeout(() => {
                        videoElement.currentTime = videoElement.duration;
                        progressBarDiv.style.width = sliderBarW;
                        const playProgresElem: HTMLDivElement | null = progressBarDiv.querySelector(".vjs-play-progress.vjs-slider-bar");
                        if (!playProgresElem) return;
                        playProgresElem.style.width = "100%";
                    }, 1000);
                } else {
                    const nextContentButton = document.querySelector<HTMLButtonElement>('[aria-label="next content"]');
                    if (nextContentButton) nextContentButton.click();
                }
            }, intervalT);
        } else if (msg.data == State.halted) {
            clearInterval(intervalId);
        }
    }
});
