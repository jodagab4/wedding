// guestList se define en guestData.js

function showGuestInfo(codeParam) {
    let code = codeParam;
    if (!code) {
        code = document.getElementById('guest-code').value.trim().toUpperCase();
    }
    const guest = guestList[code];
    if (guest) {
        document.getElementById('bp-names').textContent = guest.names;
        document.getElementById('bp-seats').textContent = guest.seats;
        const city = guest.city || '---';
        document.getElementById('bp-city').textContent = city;
        const shortCity = guest.shortCity || '---';
        document.getElementById('bp-city-code').textContent = shortCity;
        document.getElementById('guest-code').value = code;
    } else {
        document.getElementById('bp-names').textContent = 'CÃ³digo no vÃ¡lido';
        document.getElementById('bp-seats').textContent = '-';
        document.getElementById('bp-city').textContent = '-';
        document.getElementById('bp-city-code').textContent = '---';
    }
}

// Leer parÃ¡metro de la URL
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('codigo');
    if (code) {
        showGuestInfo(code.trim().toUpperCase());
    }
});

function speakPilotMessage() {
    const message = 'Bienvenidos al viaje del amor.';
    if (!('speechSynthesis' in window)) {
        return;
    }
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Intenta elegir una voz en espaÃ±ol si existe
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((voice) => voice.lang && voice.lang.startsWith('es'));
    if (spanishVoice) {
        utterance.voice = spanishVoice;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', () => {
    const soundBtn = document.querySelector('.sound-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', speakPilotMessage);
    }
});
