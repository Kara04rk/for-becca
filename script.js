document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionView = document.getElementById('question-view');
    const successView = document.getElementById('success-view');
    const particleContainer = document.getElementById('particle-container');

    let lastMouseX = 0;
    let lastMouseY = 0;

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        const hearts = ['💖', '❤️', '💝', '🌸', '🌹', '💕'];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 15 + 12;
        heart.style.fontSize = size + 'px';
        
        const duration = Math.random() * 3 + 3;
        heart.style.animationDuration = duration + 's';
        
        particleContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(spawnHeart, 500);

    function handleProximity(e) {
        let mouseX, mouseY;
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

        if (distance < 80) {
            escape();
        }
    }

    function escape() {
        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
        }

        const btnRect = noBtn.getBoundingClientRect();
        
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        let attempts = 0;
        while (attempts < 15) {
            const btnWorldCenterX = newX + btnRect.width / 2;
            const btnWorldCenterY = newY + btnRect.height / 2;
            const distToCursor = Math.hypot(lastMouseX - btnWorldCenterX, lastMouseY - btnWorldCenterY);

            if (distToCursor > 120) {
                break;
            }
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            attempts++;
        }

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }

    document.addEventListener('mousemove', handleProximity);
    document.addEventListener('touchmove', handleProximity, { passive: true });

    const blockEvents = ['touchstart', 'pointerdown', 'mousedown', 'click'];
    blockEvents.forEach(evtName => {
        noBtn.addEventListener(evtName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            escape();
        });
    });

    yesBtn.addEventListener('click', () => {
        questionView.classList.add('hidden');
        successView.classList.remove('hidden');

        noBtn.classList.add('hidden');

        for (let i = 0; i < 40; i++) {
            setTimeout(spawnHeart, i * 50);
        }
    });
});
