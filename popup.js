document.getElementById('streamerMode').addEventListener('click', () => {
    chrome.runtime.sendMessage({ mode: 'streamer' });
});

document.getElementById('coffeeMode').addEventListener('click', () => {
    chrome.runtime.sendMessage({ mode: 'coffee' });
});

document.getElementById('viewerModeDisable').addEventListener('click', () => {
    chrome.storage.sync.set({ viewerenabled: false });
    document.getElementById('viewerModeDisable').style.display = 'none';
    document.getElementById('viewerModeEnable').style.display = 'block';
});

document.getElementById('viewerModeEnable').addEventListener('click', () => {
    chrome.storage.sync.set({ viewerenabled: true });
    document.getElementById('viewerModeDisable').style.display = 'block';
    document.getElementById('viewerModeEnable').style.display = 'none';
});

chrome.storage.sync.get('viewerenabled', (data) => {
    if(!data.viewerenabled) {
        document.getElementById('viewerModeDisable').style.display = 'none';
        document.getElementById('viewerModeEnable').style.display = 'block';
    } else {
        document.getElementById('viewerModeDisable').style.display = 'block';
        document.getElementById('viewerModeEnable').style.display = 'none';
    }
});