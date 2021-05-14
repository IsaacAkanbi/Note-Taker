const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
// Create an Express Web App Instance
const app = express();

// Middleware (parsing incoming data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup static files
app.use(express.static('public'));

// Application Routes
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];
    return res.json(db);
});

app.post('/api/notes', (req, res) => { 
    const notesArr = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];
    const newNote = req.body;
    const noteId = uuidv4();
    newNote.id = noteId;
    console.log(newNote);
    notesArr.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), err => {
      if (err) throw err;
      console.log("Done writing"); 
    });
    return res.json(newNotesArr);
  });

// Start our server
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});