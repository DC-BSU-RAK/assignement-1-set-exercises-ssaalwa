
document.addEventListener('DOMContentLoaded', function() {
    
    const buttons = document.querySelectorAll('.button');
    const audioPlayer = document.getElementById('audio-player');
    
    let currentlyPlaying = null;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            
            const audioPath = this.getAttribute('data-sound');
            
            if (currentlyPlaying === this && !audioPlayer.paused) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                this.classList.remove('playing');
                currentlyPlaying = null;
                return;
            }
            
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('playing');
            }
            
            audioPlayer.src = audioPath;
            
            audioPlayer.play()
                .catch(error => {
                    console.error('Audio playback failed:', error);
                    console.error('Attempted to play file:', audioPath);
                    alert('Could not play the audio file. Check if the file ' + audioPath + ' exists.');
                });
            
            this.classList.add('playing');
            currentlyPlaying = this;
        });
    });
    
    audioPlayer.addEventListener('ended', function() {
        if (currentlyPlaying) {
            currentlyPlaying.classList.remove('playing');
            currentlyPlaying = null;
        }
    });
    
    document.addEventListener('keydown', function(event) {
        const key = parseInt(event.key);
        if (!isNaN(key) && key >= 1 && key <= 8) {
            const index = key - 1;
            if (buttons[index]) {
                buttons[index].click();
            }
        }
    });
    
    console.log('Soundboard initialized successfully!');
});