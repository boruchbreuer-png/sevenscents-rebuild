// Verification harness for the canon grade proof.
// Run after m00-canon.png / p11-canon.png are committed to public/assets/plates/.
//   node scratch/verify-plates.js   (server must be running on :3000)
const { chromium } = require('playwright-core');
const OUT = process.env.OUT || '/tmp/claude-0/-home-user-sevenscents-rebuild/14536ca7-9316-51fa-8225-b8ea65198d38/scratchpad';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
  const shots = [
    ['m00', 252, 'canon-m00-0412'],
    ['m00', 340, 'canon-m00-0540'],
    ['m00', 462, 'canon-m00-0742'],
    ['m00', 484, 'canon-m00-0804'],
    ['p11', 462, 'canon-p11-0742'], // P-11 is the 7:42 macro reference
  ];
  for (const [plate, m, tag] of shots) {
    await p.goto(`http://localhost:3000/lab/grade?plate=${plate}&m=${m}`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${tag}.png` });
    console.log('shot', tag);
  }
  await b.close();
})();
