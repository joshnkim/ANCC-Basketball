// reactServer.cjs
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3001;

// Serve static files from the React build inside ANC/dist
app.use(express.static(path.join(__dirname, 'ANC', 'dist')));

// Handle any requests that don't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ANC', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running: http://18.117.218.170:${PORT}...`);
});