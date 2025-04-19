document.addEventListener('DOMContentLoaded', function() {
    // Sample banks data
    const sampleBanks = [
        // Bank 1
        [
            { name: "Ah-Ha", file: "audio/bank1/ah-ha.mp3", duration: "1.4" },
            { name: "Back of the net", file: "audio/bank1/back-of-the-net.mp3", duration: "1.02" },
            { name: "Bang out of order", file: "audio/bank1/bangoutoforder.mp3", duration: "1.38" },
            { name: "Dan", file: "audio/bank1/dan.mp3", duration: "0.5" },
            { name: "Drone", file: "audio/bank1/drone.mp3", duration: "2.1" },
            { name: "Email of the evening", file: "audio/bank1/emailoftheevening.mp3", duration: "1.2" },
            { name: "Hello Partridge", file: "audio/bank1/hellopartridge.mp3", duration: "2.25" },
            { name: "I ate a scotch egg", file: "audio/bank1/iateascotchegg.mp3", duration: "1.5" },
            { name: "Inconfused", file: "audio/bank1/inconfused.mp3", duration: "1.1" }
        ],
        // Bank 2
        [
            { name: "Chilling", file: "audio/bank2/chilling.mp3", duration: "1.8" },
            { name: "Piano", file: "audio/bank2/piano.mp3", duration: "2.3" },
            { name: "Water", file: "audio/bank2/water.mp3", duration: "1.5" },
            { name: "Jurassic Park", file: "audio/bank2/jurassicpark.mp3", duration: "1.49" },
            { name: "Cashback", file: "audio/bank2/cashback.mp3", duration: "1.3" },
            { name: "Hotdog", file: "audio/bank2/hotdog.mp3", duration: "0.8" },
            { name: "Lynne", file: "audio/bank2/lynne.mp3", duration: "1.0" },
            { name: "Monkey news", file: "audio/bank2/monkeynews.mp3", duration: "1.7" },
            { name: "Partridge", file: "audio/bank2/partridge.mp3", duration: "1.2" }
        ]
    ];

    // DOM elements
    const soundboard = document.getElementById('soundboard');
    const prevBankBtn = document.getElementById('prev-bank');
    const nextBankBtn = document.getElementById('next-bank');
    const bankIndicator = document.querySelector('.bank-indicator');
    const ttsText = document.getElementById('tts-text');
    const ttsPlayBtn = document.getElementById('tts-play');
    const ttsVolume = document.getElementById('tts-volume');

    // State
    let currentBank = 0;
    let voices = [];
    let currentAudio = null;

    // Initialize the soundboard
    function initSoundboard() {
        renderBank(currentBank);
        updateNavButtons();
        initTextToSpeech();
    }

    // Render a sample bank
    function renderBank(bankIndex) {
        soundboard.innerHTML = '';
        bankIndicator.textContent = `Bank ${bankIndex + 1}`;
        
        sampleBanks[bankIndex].forEach(sample => {
            const sampleElement = document.createElement('div');
            sampleElement.className = 'sample';
            sampleElement.innerHTML = `
                <h2>${sample.name}</h2>
                <p>${sample.duration}s</p>
                <audio src="${sample.file}" preload="auto"></audio>
            `;
            
            sampleElement.addEventListener('click', function() {
                playSample(this, sample.file);
            });
            
            soundboard.appendChild(sampleElement);
        });
    }

    // Play a sample
    function playSample(element, audioFile) {
        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            document.querySelectorAll('.sample').forEach(el => el.classList.remove('active'));
        }
        
        // Play the new sample
        const audio = element.querySelector('audio');
        audio.volume = 1;
        audio.play()
            .then(() => {
                currentAudio = audio;
                element.classList.add('active');
                
                // Remove active class when audio ends
                audio.addEventListener('ended', () => {
                    element.classList.remove('active');
                    currentAudio = null;
                }, { once: true });
            })
            .catch(error => {
                console.error('Error playing audio:', error);
            });
    }

    // Update navigation buttons
    function updateNavButtons() {
        prevBankBtn.disabled = currentBank === 0;
        nextBankBtn.disabled = currentBank === sampleBanks.length - 1;
    }

    // Initialize text-to-speech
    function initTextToSpeech() {
        // Load available voices
        function loadVoices() {
            voices = window.speechSynthesis.getVoices();
        }
        
        // Load voices when they become available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        loadVoices();
    }

    // Play text-to-speech
    function playTextToSpeech() {
        const text = ttsText.value.trim();
        if (!text) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = parseFloat(ttsVolume.value);
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }

    // Event listeners
    prevBankBtn.addEventListener('click', () => {
        if (currentBank > 0) {
            currentBank--;
            renderBank(currentBank);
            updateNavButtons();
        }
    });

    nextBankBtn.addEventListener('click', () => {
        if (currentBank < sampleBanks.length - 1) {
            currentBank++;
            renderBank(currentBank);
            updateNavButtons();
        }
    });

    ttsPlayBtn.addEventListener('click', playTextToSpeech);

    // Initialize the app
    initSoundboard();
});