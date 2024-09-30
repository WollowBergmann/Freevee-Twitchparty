chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === 'generateQR') {
        console.log(request);
        generateQRCode((request.data.paused ? 'STOP' : 'START') + '$$' + request.data.timestamp + '$$' + request.data.url);
    }
});

function generateQRCode(text) {
    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = '';

    new QRCode(qrCodeContainer, {
        text: text,
        width: 256,  // Breite des QR-Codes
        height: 256, // Höhe des QR-Codes
    });
}