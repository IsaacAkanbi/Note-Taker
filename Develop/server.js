const express = require('express');
const path = require('path');
const PORT = 3000;
const {v4 : uuidv4} = require('uuid');
// Create an Express Web App Instance
const app = express();

// Middleware (parsing incoming data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup static files
app.use(express.static('public'));

// Application Routes
app.get('/test', function(req, res) {
    res.send("Testing Landing route");
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './notes.html'))
});

app.get('/api/notes', function(req, res) {

    // Get / Retrieve the data from db.json (read the data from the file - fs module)

        // - Save data in an OBJECT 

    // Return that data (in JSON format) to the VIEW (frontend)
   

});

app.post('/api/notes', (req, res) => { 
    const newNote = req.body;
    const noteId = uuidv4();
    newNote.id = noteId;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notes), err => {
      if (err) throw err; // Checking for errors
      console.log("Done writing"); // Success
    });
    res.json(newNote);
  });

// Start our server
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});