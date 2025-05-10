
let currentImageIndex = 0;
const images = [
    "images/timeline/st-peters-church-2.jpg",
    "images/timeline/Canals.jpg",
    "images/timeline/Paris house.jpg"
];

function rotateImage() {
    const img = document.getElementById('rotatingImage');
    if (img) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        img.src = images[currentImageIndex];
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    setInterval(rotateImage, 5000);

    
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    const timeline = document.querySelector('.timeline-scroll');
    const leftArrow = document.getElementById('timelineLeft');
    const rightArrow = document.getElementById('timelineRight');

    if (timeline && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            timeline.scrollBy({ left: -200, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            timeline.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('click', function() {
            
            timelineEvents.forEach(e => e.classList.remove('active'));
            
            this.classList.add('active');
        });
    });
}); 