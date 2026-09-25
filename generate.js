const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const filesData = [];

function walk(dir, categoryPrefix = '') {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === 'app.js' || file === 'app.css' || file === 'index.html' || file.endsWith('.png') || file.endsWith('.jpg') || file === 'generate.js') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, categoryPrefix ? `${categoryPrefix}/${file}` : file);
    } else {
      const content = fs.readFileSync(filePath, 'utf-8');
      const category = categoryPrefix || 'personal.js';
      filesData.push({
        id: "file_" + Buffer.from(filePath).toString('base64').replace(/[^a-zA-Z0-9]/g, ''),
        name: categoryPrefix ? `${categoryPrefix}/${file}` : file,
        category: category,
        tags: ["#" + file.split('.').pop()],
        description: `File ${file} in ${category}`,
        content: content
      });
    }
  }
}

walk(rootDir);
fs.writeFileSync(path.join(rootDir, 'filesData.json'), JSON.stringify(filesData, null, 2));
console.log('filesData.json generated with ' + filesData.length + ' files.');
