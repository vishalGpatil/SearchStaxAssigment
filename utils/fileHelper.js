const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, obj) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try { return JSON.parse(fs.readFileSync(filePath)); } catch (e) { return null; }
}

function writeFile(filePath, bufferOrString) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, bufferOrString);
}

function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath);
}

module.exports = { writeJson, readJson, writeFile, readFile };
