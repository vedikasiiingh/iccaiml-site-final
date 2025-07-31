const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const DB_PATH = './data/db.json';
const path = require('path');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getImageUrl(url) {
  if (url.startsWith('http')) return url;
  return url.startsWith('assets/') ? url : 'assets/' + url;
}

const app = express();
const PORT =  process.env.PORT || 3001;  

const corsOptions = {
  origin: 'https://iccaiml-site-frontend.onrender.com',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
  res.send({ status: 'Backend running' });
});

// --- Speakers ---
app.get('/api/speakers', (req, res) => {
  const db = readDB();
  res.json(db.speakers);
});
app.post('/api/speakers', (req, res) => {
  const db = readDB();
  const speaker = req.body;
  speaker.id = Date.now();
  db.speakers.push(speaker);
  writeDB(db);
  res.status(201).json(speaker);
});
app.delete('/api/speakers/:id', (req, res) => {
  const db = readDB();
  db.speakers = db.speakers.filter(s => s.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// --- Schedule ---
app.get('/api/schedule', (req, res) => {
  const db = readDB();
  res.json(db.schedule);
});
app.post('/api/schedule', (req, res) => {
  const db = readDB();
  const item = req.body;
  item.id = Date.now();
  db.schedule.push(item);
  writeDB(db);
  res.status(201).json(item);
});
app.delete('/api/schedule/:id', (req, res) => {
  const db = readDB();
  db.schedule = db.schedule.filter(i => i.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// --- Gallery ---
app.get('/api/gallery', (req, res) => {
  const db = readDB();
  res.json(db.gallery);
});
app.post('/api/gallery', (req, res) => {
  const db = readDB();
  const img = req.body;
  img.id = Date.now();
  db.gallery.push(img);
  writeDB(db);
  res.status(201).json(img);
});
app.delete('/api/gallery/:id', (req, res) => {
  const db = readDB();
  db.gallery = db.gallery.filter(i => i.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// --- Registration ---
app.get('/api/registrations', (req, res) => {
  const db = readDB();
  res.json(db.registrations);
});
app.post('/api/registrations', (req, res) => {
  const db = readDB();
  const reg = req.body;
  reg.id = Date.now();
  db.registrations.push(reg);
  writeDB(db);
  res.status(201).json(reg);
});

// --- Contact ---
app.get('/api/contacts', (req, res) => {
  const db = readDB();
  res.json(db.contacts);
});
app.post('/api/contacts', (req, res) => {
  const db = readDB();
  const msg = req.body;
  msg.id = Date.now();
  db.contacts.push(msg);
  writeDB(db);
  res.status(201).json(msg);
});

app.listen(PORT, () => {
  console.log(`Backend server running on ${PORT}`);
}); 