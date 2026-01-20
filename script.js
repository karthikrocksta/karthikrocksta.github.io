// Initialize AOS
AOS.init({ duration: 1000, once: true });

// --- Vibrant Three.js Background ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200; // More particles
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x00f3ff); // Cyan
    const color2 = new THREE.Color(0xff0055); // Pink

    for (let i = 0; i < particlesCount * 3; i+=3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 60; 
        posArray[i+1] = (Math.random() - 0.5) * 60; 
        posArray[i+2] = (Math.random() - 0.5) * 60;

        // Mixed Colors
        const mixedColor = Math.random() > 0.5 ? color1 : color2;
        colorsArray[i] = mixedColor.r;
        colorsArray[i+1] = mixedColor.g;
        colorsArray[i+2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true, // Use custom colors
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 25;

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x -= 0.0005;

        // Interactive Sway
        particlesMesh.rotation.x += mouseY * 0.0001;
        particlesMesh.rotation.y += mouseX * 0.0001;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
};
initThreeJS();

// --- Typewriter ---
const roles = ["Mobile Architecture", "Java Solutions", "Flutter Development", "Cross-Platform Apps"];
const typeSpan = document.querySelector(".typewriter");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typeSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
};
document.addEventListener("DOMContentLoaded", type);

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 80);
});

// Hover States
const hoverables = document.querySelectorAll('a, button, .glass-card');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.transform = "translate(-50%, -50%) scale(1.8)";
        follower.style.borderColor = "#00f3ff";
    });
    el.addEventListener('mouseleave', () => {
        follower.style.transform = "translate(-50%, -50%) scale(1)";
        follower.style.borderColor = "#bc13fe";
    });
});

// --- Project Filtering ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Initialize Vanilla Tilt explicitly (optional as auto-init works via data-tilt)
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});