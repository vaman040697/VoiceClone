document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ttsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        convertToSpeech();
    });

    fetchVoices();
});

function fetchVoices() {
    // Fetch the available voices and populate the select element
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            AUTHORIZATION: '74a352fe78234f119e785e29ad8bd2e1',
            'X-USER-ID': 'CfFLvgRKobctjCuYfxL398FMQom1'
        }
    };

    fetch('https://api.play.ht/api/v2/cloned-voices', options)
        .then(response => response.json())
        .then(data => {
            const voiceSelect = document.getElementById('voice');
            data.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.url;
                option.textContent = voice.name;
                voiceSelect.appendChild(option);
            });
        })
        .catch(err => console.error(err));
}

function convertToSpeech() {
    const text = document.getElementById('text').value;
    const voice = document.getElementById('voice').value;
    
    const options = {
        method: 'POST',
        headers: {
            accept: 'text/event-stream',
            'content-type': 'application/json',
            AUTHORIZATION: 'YOUR_AUTHORIZATION_KEY',
            'X-USER-ID': 'YOUR_USER_ID'
        },
        body: JSON.stringify({
            text: text,
            voice: voice,
            output_format: 'mp3',
            voice_engine: 'PlayHT2.0'
        })
    };

    fetch('https://api.play.ht/api/v2/tts', options)
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = data.url;
        })
        .catch(err => console.error(err));
}
