const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Brak danych' });

  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (checkError) {
    console.error('Supabase check error:', checkError);
    return res.status(500).json({ error: 'Błąd bazy danych' });
  }

  if (existingUser) return res.status(400).json({ error: 'Użytkownik istnieje' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultData = { 
    notes: [], 
    schedule: { 0:[], 1:[], 2:[], 3:[], 4:[] }, 
    calEvents: {}, 
    xp: 0, 
    level: 1, 
    quizzesSolved: 0, 
    accuracySum: 0 
  };

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword, data: defaultData }])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: error.message || 'Błąd rejestracji' });
  }

  const token = jwt.sign({ id: data.id, username: data.username }, JWT_SECRET);
  res.json({ token, user: { username: data.username }, userData: data.data });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error: loginError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (loginError || !user) return res.status(400).json({ error: 'Błędne dane' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Błędne dane' });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token, user: { username: user.username }, userData: user.data });
});

app.get('/api/user-data', authenticateToken, async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('data')
    .eq('id', req.user.id)
    .single();

  if (error || !user) return res.status(404).json({ message: 'Nie znaleziono danych' });
  res.json(user.data);
});

app.post('/api/user-data', authenticateToken, async (req, res) => {
  const { error } = await supabase
    .from('users')
    .update({ data: req.body })
    .eq('id', req.user.id);

  if (error) return res.status(500).json({ message: 'Błąd zapisu' });
  res.json({ message: 'Zapisano' });
});

app.post('/api/quiz', authenticateToken, async (req, res) => {
  const { noteContent } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ message: 'Brak klucza API Gemini' });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Stwórz quiz składający się z 10 pytań jednokrotnego wyboru (A, B, C, D) na podstawie poniższego tekstu. Zwróć WYŁĄCZNIE czysty JSON w postaci tablicy obiektów o strukturze: [{"question": "pytanie", "options": ["A", "B", "C", "D"], "answer": 0}]. Oto tekst: ${noteContent}`
          }]
        }]
      })
    });

    const data = await response.json();
    console.error("Szczegóły od Google:", JSON.stringify(data, null, 2)); 
    
    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
      throw new Error('Niepoprawna odpowiedź z API Gemini');
    }
    const rawText = data.candidates[0].content.parts[0].text;
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const quiz = JSON.parse(cleanedText);
    res.json({ questions: quiz });
  } catch (err) {
    console.error('Quiz generation error:', err);
    res.status(500).json({ message: 'Błąd generowania quizu' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
