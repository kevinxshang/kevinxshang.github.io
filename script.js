/* ---------- GLOBAL THEME TOGGLE ---------- */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

/* ---------- INDEX PAGE: FLIP CARD + NAVIGATION ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const flipCardBtn = document.getElementById('flipCard');
    if (flipCardBtn) {
        window.flipCard = function () {
            flipCardBtn.classList.toggle('flip-active');
        };

        const flipButtons = document.querySelectorAll(".flip-btn");
        const routes = ['about.html', 'skills.html', 'experience.html', 'contact.html'];

        flipButtons.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                window.location.href = routes[i];
            });
        });
    }
});

/* ---------- ABOUT/EXPERIENCE PAGE: EXPANDABLE PROJECTS + HOVER ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // Toggle details
    document.querySelectorAll('.project-card.openable').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('open');
            const chevron = card.querySelector('.chevron');
            if (chevron) {
                chevron.textContent = card.classList.contains('open') ? '⌃' : '⌄';
            }
        });
    });

    // Hover effect for experience cards
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
            card.closest('.experience-cards')?.classList.add('hovering');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
            card.closest('.experience-cards')?.classList.remove('hovering');
        });
    });

    // Scroll to section by hash
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
});

/* ---------- CONTACT PAGE: FLYING SUBMIT BUTTON ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.fly-btn');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!button || !firstName || !lastName || !email || !message) return;

    const distanceBetween = (x1, y1, x2, y2) => {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    };

    document.addEventListener('mousemove', (event) => {
        const formFilled =
            firstName.value.trim() &&
            lastName.value.trim() &&
            email.value.trim() &&
            message.value.trim();

        if (!formFilled) {
            const rect = button.getBoundingClientRect();
            const bx = rect.left + rect.width / 2;
            const by = rect.top + rect.height / 2;

            const dist = distanceBetween(event.clientX, event.clientY, bx, by) + 2;
            const angle = Math.atan2(event.clientY - by, event.clientX - bx);

            const radius = Math.max(button.offsetWidth * 0.75, button.offsetHeight * 0.75, 100);
            const ox = -1 * Math.cos(angle) * Math.max((radius - dist), 0);
            const oy = -1 * Math.sin(angle) * Math.max((radius - dist), 0);
            const rx = oy / 2;
            const ry = -ox / 2;

            button.style.transition = 'all 0.1s ease';
            button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            button.style.boxShadow = `${Math.abs(ox)}px ${Math.abs(oy)}px 40px rgba(0, 0, 0, 0.15)`;
        } else {
            button.style.transform = '';
            button.style.boxShadow = '';
        }
    });
});

/* ---------- SKILLS PAGE: Animate Skill Items on Button Click ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const animateButton = document.getElementById('animateSkills');
    const skillItems = document.querySelectorAll('.skill-item');

    if (!animateButton || skillItems.length === 0) return;

    function animateSkills() {
        let delay = 0;
        animateButton.disabled = true;

        skillItems.forEach((skill, index) => {
            setTimeout(() => {
                skill.classList.add("active-hover");

                setTimeout(() => {
                    skill.classList.remove("active-hover");
                    if (index === skillItems.length - 1) {
                        animateButton.disabled = false;
                    }
                }, 400);
            }, delay);

            delay += 150;
        });
    }

    animateButton.addEventListener("click", animateSkills);
});
