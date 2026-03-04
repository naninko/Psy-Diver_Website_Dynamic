import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dir, '.env') });

const app = express();
const DATA_FILE = join(__dir, 'data', 'content.json');

app.use(cors());
app.use(express.json());

// --- Helpers ---

function readData() {
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId() {
  return Date.now().toString();
}

// Store hashed password in memory (loaded from .env on start)
let adminPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'psydiver2024', 10);

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    req.admin = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// --- Auth ---

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password || !bcrypt.compareSync(password, adminPasswordHash)) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

app.post('/api/auth/change-password', verifyToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !bcrypt.compareSync(currentPassword, adminPasswordHash)) {
    return res.status(401).json({ error: 'Current password is wrong' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  adminPasswordHash = bcrypt.hashSync(newPassword, 10);
  res.json({ message: 'Password changed successfully' });
});

// --- News ---

app.get('/api/news', (req, res) => {
  const data = readData();
  res.json(data.news.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

app.post('/api/news', verifyToken, (req, res) => {
  const { date, category, titleDe, titleEn, excerptDe, excerptEn, contentDe, contentEn } = req.body;
  if (!titleDe || !titleEn) {
    return res.status(400).json({ error: 'titleDe and titleEn are required' });
  }
  const data = readData();
  const item = {
    id: generateId(),
    date: date || new Date().toISOString().split('T')[0],
    category: category || 'projectUpdate',
    titleDe, titleEn,
    excerptDe: excerptDe || '',
    excerptEn: excerptEn || '',
    contentDe: contentDe || '',
    contentEn: contentEn || ''
  };
  data.news.push(item);
  writeData(data);
  res.status(201).json(item);
});

app.delete('/api/news/:id', verifyToken, (req, res) => {
  const data = readData();
  const before = data.news.length;
  data.news = data.news.filter(n => n.id !== req.params.id);
  if (data.news.length === before) {
    return res.status(404).json({ error: 'News item not found' });
  }
  writeData(data);
  res.json({ message: 'Deleted' });
});

// --- Custom Pages ---

app.get('/api/pages', (req, res) => {
  const data = readData();
  res.json(data.customPages);
});

app.get('/api/pages/:slug', (req, res) => {
  const data = readData();
  const page = data.customPages.find(p => p.slug === req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

app.post('/api/pages', verifyToken, (req, res) => {
  const { slug, navGroup, titleDe, titleEn, contentDe, contentEn } = req.body;
  if (!slug || !titleDe || !titleEn) {
    return res.status(400).json({ error: 'slug, titleDe, and titleEn are required' });
  }
  const data = readData();
  if (data.customPages.find(p => p.slug === slug)) {
    return res.status(400).json({ error: 'A page with this slug already exists' });
  }
  const page = {
    id: generateId(),
    slug,
    navGroup: navGroup || 'about',
    titleDe, titleEn,
    contentDe: contentDe || '',
    contentEn: contentEn || ''
  };
  data.customPages.push(page);
  writeData(data);
  res.status(201).json(page);
});

app.delete('/api/pages/:id', verifyToken, (req, res) => {
  const data = readData();
  const before = data.customPages.length;
  data.customPages = data.customPages.filter(p => p.id !== req.params.id);
  if (data.customPages.length === before) {
    return res.status(404).json({ error: 'Page not found' });
  }
  writeData(data);
  res.json({ message: 'Deleted' });
});

// --- Start ---

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`PSY-DIVER backend running on http://localhost:${PORT}`));
