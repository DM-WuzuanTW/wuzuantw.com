document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const birthdayDay = 27;

        function updateCountdown() {
            const now = new Date();
            let year = now.getFullYear();
            let birthday = new Date(year, 3, birthdayDay);

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
            const span = document.createElement('span');
            span.className = 'code-float';
            span.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            span.style.left = Math.random() * 95 + 'vw';
            span.style.top = Math.random() * 100 + 'vh';
            span.style.fontSize = (Math.random() * 0.8 + 0.6) + 'rem';
            document.body.appendChild(span);

            gsap.to(span, {
                y: -150,
                opacity: 0.3,
                duration: Math.random() * 15 + 10,
                ease: "none",
                onComplete: () => span.remove()
            });
        }

        setInterval(createFloatingCode, 3000);
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