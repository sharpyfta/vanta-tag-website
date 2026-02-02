const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const stars = [];
const STAR_COUNT = 400;

// initialize stars
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random()
    });
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    // nebula gradient overlay
    const nebula = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    nebula.addColorStop(0, 'rgba(64,0,128,0.3)');
    nebula.addColorStop(0.5, 'rgba(128,0,255,0.05)');
    nebula.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, width, height);

    // draw stars
    stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < 0) star.x = width;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
