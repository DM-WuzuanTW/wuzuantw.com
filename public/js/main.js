document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const birthdayDay = 27;
        const birthdayMonth = 3;

        const container = countdownElement.parentElement;
        const label = container.querySelector('p');

        function updateCountdown() {
            const now = new Date();
            let year = now.getFullYear();
            let birthday = new Date(year, birthdayMonth, birthdayDay);

            const isBirthday = now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;

            if (isBirthday) {
                container.classList.add('is-birthday');
                if (label) {
                    label.innerText = 'Happy Birthday!';
                    label.classList.add('birthday-title');
                }
                countdownElement.innerHTML = `<span class="countdown-text">就在今天啦 🎉</span>`;
                countdownElement.classList.add('birthday-text');
                countdownElement.setAttribute('data-birthday', 'HAPPY BIRTHDAY');

                if (typeof confetti === 'function' && !window.confettiFired) {
                    window.confettiFired = true;
                    const duration = 15 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                    function randomInRange(min, max) {
                        return Math.random() * (max - min) + min;
                    }

                    const interval = setInterval(function () {
                        const timeLeft = animationEnd - Date.now();

                        if (timeLeft <= 0) {
                            return clearInterval(interval);
                        }

                        const particleCount = 50 * (timeLeft / duration);
                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                    }, 250);

                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                return;
            }

            container.classList.remove('is-birthday');
            if (label) {
                label.innerText = '距離生日還有：';
                label.classList.remove('birthday-title');
            }
            countdownElement.classList.remove('birthday-text');

            if (now > birthday) {
                birthday.setFullYear(year + 1);
            }

            const diff = birthday - now;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `<span class="countdown-text">${days}天 ${hours}時 ${minutes}分 ${seconds}秒</span>`;

            const y = birthday.getFullYear();
            const m = String(birthday.getMonth() + 1).padStart(2, '0');
            const d = String(birthday.getDate()).padStart(2, '0');

            countdownElement.setAttribute('data-birthday', `${y}/${m}/${d}`);
        }

        container.addEventListener('click', () => {
            if (container.classList.contains('is-birthday') && typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        });

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".laptop", {
            rotateY: "0deg",
            rotateX: "-5deg",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to(".laptop", {
            y: -15,
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: "sine.inOut"
        });

        const codeSnippets = [
            'npm i discord.js', 'npm run start', 'pm2 start index.js --name "bot"',
            'node src/index.js', 'docker-compose up -d', 'npx prisma db push',
            'git commit -m "feat: add slash commands"', 'npm i @discordjs/rest discord-api-types',
            'client.login(process.env.TOKEN);', 'new SlashCommandBuilder().setName("ping");',
            'await interaction.reply({ content: "Pong!" });', 'const guild = await client.guilds.fetch(id);',
            'interaction.options.getString("target");', 'new ActionRowBuilder().addComponents(button);',
            'if (!interaction.isChatInputCommand()) return;', 'const member = interaction.member;',
            'channel.send({ embeds: [embed] });', 'client.on("ready", () => console.log("Bot Online!"));',
            'new EmbedBuilder().setColor("#5865F2");', 'await interaction.deferReply({ ephemeral: true });',
            'const collector = channel.createMessageComponentCollector();'
        ];

        function createFloatingCode() {
            const existing = document.querySelectorAll('.code-float');
            if (existing.length > 10) {
                existing[0].remove();
            }

            const span = document.createElement('span');
            span.className = 'code-float';
            span.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            span.style.left = Math.random() * 95 + 'vw';
            span.style.top = Math.random() * 100 + 'vh';
            span.style.fontSize = (Math.random() * 0.5 + 0.5) + 'rem';
            document.body.appendChild(span);

            gsap.to(span, {
                y: -100,
                opacity: 0.2,
                duration: Math.random() * 10 + 8,
                ease: "none",
                onComplete: () => span.remove()
            });
        }

        setInterval(createFloatingCode, 8000);
    }

    const keysGrid = document.querySelector('.keys-grid');
    if (keysGrid) {
        for (let i = 0; i < 60; i++) {
            const key = document.createElement('div');
            key.className = 'key';
            keysGrid.appendChild(key);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const gravatarImages = document.querySelectorAll('img[data-gravatar-email]');
    gravatarImages.forEach(img => {
        const email = img.getAttribute('data-gravatar-email');
        if (email && email.trim() !== '') {
            const hash = md5(email.trim().toLowerCase());
            img.src = `https://www.gravatar.com/avatar/${hash}?s=200&d=mp`;
        }
    });
});