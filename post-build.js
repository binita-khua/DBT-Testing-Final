import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateImportPaths(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      updateImportPaths(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.js')) {
      console.log(`Processing ${fullPath}`);
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/from\s+(['"])(.*?)(\1)/g, (match, quote, importPath) => {
        if (!importPath.startsWith('.') || importPath.endsWith('.js')) {
          return match;
        }
        console.log(`Updating import ${importPath} to ${importPath}.js`);
        return `from ${quote}${importPath}.js${quote}`;
      });
      
      content = content.replace(/import\((['"])(.*?)(\1)\)/g, (match, quote, importPath) => {
        if (!importPath.startsWith('.') || importPath.endsWith('.js')) {
          return match; 
        }
        console.log(`Updating dynamic import ${importPath} to ${importPath}.js`);
        return `import(${quote}${importPath}.js${quote})`;
      });

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

const distPath = path.join(__dirname, 'dist');
updateImportPaths(distPath);
