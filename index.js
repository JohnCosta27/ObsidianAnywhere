const fs = require('fs');

const execSync = require('child_process').execSync;
const file = process.argv[2];

const testVaultPath = '/home/johnc/Obsidian/TestVault';

/**
 * Step 1. Copy the markdown file.
 */
fs.copyFile(file, `/home/johnc/Obsidian/TestVault/${file}`, (err) => {
  if (err) throw err;
  console.log('File copied to test vault');
});

/**
 * Step 2. Change obsidian.json to open the test vault.
 */

let obsidianJson = JSON.parse(
  fs.readFileSync('/home/johnc/.config/obsidian/obsidian.json', 'utf-8')
);

for (let vault in obsidianJson.vaults) {
  if (obsidianJson.vaults[vault].hasOwnProperty('open')) {
    delete obsidianJson.vaults[vault].open;
  }
  if (obsidianJson.vaults[vault].path == testVaultPath) {
    obsidianJson.vaults[vault].open = 'true';
  }
}

/**
 * Save the file
 */
fs.writeFileSync('/home/johnc/.config/obsidian/obsidian.json', JSON.stringify(obsidianJson));

/**
 * Open obsidian
 * TODO: Program should check differences between the files,
 * and write to the original.
 */

execSync('obsidian');
