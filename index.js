import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.json()); // Middleware for parsing JSON requests

// Serve React static files (from the dist folder)
app.use(express.static(path.join(__dirname, '/dist')));

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to your API!' });
});

app.post('/api/login', (req, res) => {
  const { username, password, studentId } = req.body;

  // Dummy authentication logic (replace with database logic)
  const validUsername = 'admin';  // Example username
  const validPassword = '1234';  // Example password
  const validStudentId = '2023001';  // Example student ID

  if (username !== validUsername) {
    return res.status(401).json({ success: false, error: 'Invalid username' });
  }

  if (password !== validPassword) {
    return res.status(401).json({ success: false, error: 'Invalid password' });
  }

  if (studentId !== validStudentId) {
    return res.status(401).json({ success: false, error: 'Invalid student ID' });
  }

  // If all fields are correct, log the user in
  res.json({ success: true, message: 'Login successful!' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));

});

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
