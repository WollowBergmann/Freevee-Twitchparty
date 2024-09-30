setInterval(() => {
    chrome.storage.sync.get('viewerenabled', (data) => {
        if(data.viewerenabled) {
            const video = document.querySelector('video');

            if (video) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                try{
                    chrome.runtime.sendMessage({ type: 'syncVideoTimestamp', data: qrCode.data });
                } catch(e) {}
            }
        }
    });
}, 100);