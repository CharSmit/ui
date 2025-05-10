// Image rotation setup
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

// Enable Bootstrap popovers and setup event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Start image rotation
    setInterval(rotateImage, 5000);

    // Enable Bootstrap popovers
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

    // Add click handling for timeline events
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('click', function() {
            // Remove active class from all events
            timelineEvents.forEach(e => e.classList.remove('active'));
            // Add active class to clicked event
            this.classList.add('active');
        });
    });
}); 