// Builds the site for GitHub Pages and pushes dist/ to the gh-pages branch. Run: npm run deploy
import { execSync } from 'node:child_process';
import { copyFileSync, rmSync, writeFileSync } from 'node:fs';

const REPO = 'https://github.com/lukmaz88/MEIKO-DEMO-1.git';
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, BASE_PATH: '/MEIKO-DEMO-1/' } });

run('npx vite build');
copyFileSync('dist/index.html', 'dist/404.html'); // SPA fallback for deep links
writeFileSync('dist/.nojekyll', '');
rmSync('dist/.git', { recursive: true, force: true });
run('git init -q -b gh-pages', 'dist');
run('git add -A', 'dist');
run('git commit -q -m deploy', 'dist');
run(`git push -f -q ${REPO} gh-pages`, 'dist');
rmSync('dist/.git', { recursive: true, force: true });
console.log('Published: https://lukmaz88.github.io/MEIKO-DEMO-1/');
