chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === 'videoTimestamp') {
        chrome.runtime.sendMessage({ type: 'generateQR', data: request });
    } else if(request.type === 'syncVideoTimestamp') {
        const parts = request.data.split('$$');
        const url = parts[2];
        chrome.tabs.query({url: url + "*"}, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'syncVideo', data: request.data });
            } else {
                chrome.tabs.create({url: url});
            }
        });
    } else {
        if (request.mode === 'streamer') {
            // Logik für den Streamer-Modus
            chrome.tabs.query({url: "*://*.amazon.de/gp/video/detail/*"}, (tabs) => {
                if (tabs.length > 0) {
                    // Öffne eine neue Seite für den QR-Code
                    chrome.windows.create({
                        url: chrome.runtime.getURL('streamer.html'),
                        type: 'popup',
                        width: 500,
                        height: 500
                    });
                }
            });

        } else if (request.mode === 'coffee') {
            chrome.tabs.create({url: 'https://buymeacoffee.com/wollow_bergmann'});
        }
    }
});