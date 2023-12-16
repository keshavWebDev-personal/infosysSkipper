enum State {
    running = 0,
    halted = 1,
}

document.addEventListener("DOMContentLoaded", () => {
    const btn: HTMLButtonElement | null = document.getElementById(
        "startBtn"
    ) as HTMLButtonElement | null;

    btn?.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "get_state" }, (r) => {
            let state = r.data as State;
            console.log(state);
            if (state == State.halted) {
                btn.innerText = "Started, Stop?";
                btn.style.backgroundColor = "#ffd3d1";
                chrome.runtime.sendMessage({
                    action: "set_state",
                    data: State.running,
                });
            } else {
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
