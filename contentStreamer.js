setInterval(() => {
    const video = document.querySelector('video');

    if (video) {
        try{
            chrome.runtime.sendMessage({ type: 'videoTimestamp', paused: video.paused, timestamp: video.currentTime, url: window.location.href });
        } catch(e) {}
    }
}, 100);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === 'syncVideo') {
        const parts = request.data.split('$$');

        const video = document.querySelector('video');
        if (video) {
            const paused = parts[0];
            const currentTime = parseInt(parts[1]);

            console.log(paused);
            if(paused === 'START') {
                if(video.paused) {
                    video.play();
                }
                if (video.currentTime > currentTime + 2 || video.currentTime < currentTime - 2) {
                    video.currentTime = currentTime;
                }
            } else {
                video.pause();
                video.currentTime = currentTime;
            }
        }
    }
});