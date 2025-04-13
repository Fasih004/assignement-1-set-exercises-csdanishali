document.addEventListener('DOMContentLoaded', function() {
    const samples = document.querySelectorAll('.sample');
    
    samples.forEach(sample => {
        sample.addEventListener('click', function() {
            const soundId = this.getAttribute('data-sound');
            const audio = document.getElementById(soundId);
            
            // Stop all other audio that might be playing
            document.querySelectorAll('audio').forEach(a => {
                a.pause();
                a.currentTime = 0;
            });
            
            audio.play();
            
            // Add active class for visual feedback
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
    });
});