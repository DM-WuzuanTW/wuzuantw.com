const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

async function compileEjs(srcViewName, destRelativePath) {
    const srcPath = path.join(viewsDir, `${srcViewName}.ejs`);
    const destPath = path.join(distDir, destRelativePath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    console.log(`Compiling ${srcViewName}.ejs -> ${destRelativePath}...`);
    try {
        const html = await ejs.renderFile(srcPath, {});
        fs.writeFileSync(destPath, html, 'utf-8');
    } catch (err) {
        console.error(`Error compiling ${srcViewName}.ejs:`, err);
        process.exit(1);
    }
}

async function main() {
    console.log('Starting build process...');

    if (fs.existsSync(distDir)) {
        console.log('Cleaning existing dist directory...');
        fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    console.log('Copying static assets...');
    if (fs.existsSync(publicDir)) {
        copyDir(publicDir, distDir);
    }

    await compileEjs('index', 'index.html');

    await compileEjs('project-pterodactyl', 'project-pterodactyl.html');

    await compileEjs('project-pterodactyl', 'project/pterodactyl-bot/index.html');

    console.log('Build completed successfully!');
}

main();
