/*
    SETUP
*/ 


// Express
const express = require('express');
const app = express(); 
const PORT = 3000; //separate from mysql port
const path = require('path'); 
const fs = require('fs'); 

const cors = require('cors');
app.use(cors( {credentials: true, origin: "*"}));
app.use(express.json());


// Database
const db = require('./db-connector');


/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/******************************************************** LOAD FILE *************************************************************/

// Load SQL DDL file for test connection to database via db-connector
// async function loadFile() {
//     try {
//         const DDLpath = path.join(__dirname, 'ANCDDL.sql');
//         const readDDL = fs.readFileSync(DDLpath, 'utf8');

//         await db.query(readDDL);
//         console.log('DDL script loaded successfully.');

//         const [rows] = await db.query('CALL hello_world();');
//         console.log('Procedure result:', rows[0][0].message);

//     } catch (err) {
//         console.error('Error loading file:', err);
//     }
// };

// Load SQL SP file to query the database ---------------------------------------------------------------------------------------
async function loadSP() {
    try {
        const SPpath = path.join(__dirname, 'ANCC_SP.sql');
        const readSP = fs.readFileSync(SPpath, 'utf8');

        await db.query(readSP);
        console.log('SP script loaded successfully.');

    } catch (err) {
        console.error('Error loading procedures:', err);
    }
};
// Works -----------------------------------------------------------------------------------------------------------------------

/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/******************************************************* GET ROUTES ************************************************************/

// Test ------------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Server is running');
});


// Get All Players 
app.get('/players', async (req, res) => {
    try {
        const sql = 'CALL sp_getTeams()'; 
        const [rows] = await db.query(sql)

        res.status(200).json(rows[0]);

    } catch (err) {
        console.error('Error getting teams:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
}); 
// Get All Teams Works  --------------------------------------------------------------------------------------------------------


// Get All Games ---------------------------------------------------------------------------------------------------------------

app.get('/games', async (req, res) => {
    try {
        const sql = 'CALL sp_getGames()'; 
        const [rows] = await db.query(sql)

        res.status(200).json(rows[0]);

    } catch (err) {
        console.error('Error getting games:', err); 
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Get All Games Works ---------------------------------------------------------------------------------------------------------


// Get All Stats ---------------------------------------------------------------------------------------------------------------
app.get('/stats', async (req, res) => {
    try {
        const sql = 'CALL sp_getStats()';
        const [rows] = await db.query(sql)

        res.status(200).json(rows[0]);

    } catch (err) {
        console.error('Error getting stats:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Get All Stats Works ---------------------------------------------------------------------------------------------------------


// Get Specific Game Stats -----------------------------------------------------------------------------------------------------

app.get('/stats/:gameID', async (req, res) => {
    try {
        const gameID = parseInt(req.params.gameID); 
        const sql = 'CALL sp_getGameStats(?)';
        const [rows] = await db.query(sql, [gameID])

        res.status(200).json(rows[0]);

    } catch (err) {
        console.error('Error getting specific game stats:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Get Specific Game Stats Works -----------------------------------------------------------------------------------------------


// Get Stats by Player ---------------------------------------------------------------------------------------------------------
app.get('/stats/player/:playerID', async (req, res) => {
    try {
        const playerID = parseInt(req.params.playerID); 
        const sql = 'CALL sp_getPlayerStats(?)';
        const [rows] = await db.query(sql, [playerID])

        res.status(200).json(rows[0]);

    } catch (err) {
        console.error('Error getting specific game stats:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Get Stats by Player Works ---------------------------------------------------------------------------------------------------

/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/
/******************************************************* POST ROUTES ***********************************************************/

// Create New Player -----------------------------------------------------------------------------------------------------------
app.post('/players', async (req, res) => {
    try {
        const {PlayerName, Gender, PlayerNo} = req.body; 

        // Validation
        if (!PlayerName || !Gender) {
            return res.status(400).json({Message: 'Missing required fields: Player Name or Gender'});
        }

        const sql = 'CALL sp_createPlayer(?, ?, ?)';
        await db.query(sql, [PlayerName, Gender, PlayerNo || null]);

        res.status(201).json({message: 'Player created successfully.'});

    } catch (err) {
        console.error('Error creating player:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Works -----------------------------------------------------------------------------------------------------------------------



// Create New Team -------------------------------------------------------------------------------------------------------------
app.post('/teams', async (req, res) => {
    try {
        const {TeamName, TeamYear} = req.body;

        // Validation
        if (!TeamName || !TeamYear) {
            return res.status(400).json({Message: 'Missing required fields: Team Name or Year'});
        }

        const sql = 'CALL sp_createTeam(?, ?)'; 
        await db.query(sql, [TeamName, TeamYear]);

        res.status(201).json({message: 'Team created successfully'});

    } catch (err) {
        console.error('Error creating player:', err);
        res.status(500).json({message: 'Internal server error.'});
    }
});
// Works -----------------------------------------------------------------------------------------------------------------------



// Create a New Game -----------------------------------------------------------------------------------------------------------
app.post('/games', async (req, res) => {
    try {
        const {GameDate, Category, GameNo, TeamA_ID, TeamB_ID, ScoreA, ScoreB, WinnerID} = req.body;

        // Validation
        if (!GameDate || !Category || !GameNo || !TeamA_ID || !TeamB_ID || !ScoreA || !ScoreB) {
            return res.status(400).json({Message: 'Missing required fields: Game Date, Category, Game Number, Team A ID, Team B ID, Score A or Score B'});
        }

        const sql = 'CALL sp_createGame(?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(sql, [GameDate, Category, GameNo, TeamA_ID, TeamB_ID, ScoreA, ScoreB, WinnerID || null]);

        res.status(201).json({message: 'Game created successfully'});

    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({message: 'Internal server error.'});
    };
});
// Works -----------------------------------------------------------------------------------------------------------------------


// Create a New Stat -----------------------------------------------------------------------------------------------------------
app.post('/stats', async (req, res) => {
    try { 
        const {GameID, PlayerID, FTA, FTM, TwoPA, TwoPM, ThreePA, ThreePM, Rebounds, Assists, Steals, Fouls, Turnovers} = req.body;

        // Validation
        if (!GameID || !PlayerID) {
            return res.status(400).json({Message: 'Missing required fields: Game ID or Player ID'})
        }

        const sql = 'CALL sp_createStat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(sql, [
            GameID, 
            PlayerID, 
            FTA || 0, 
            FTM || 0, 
            TwoPA || 0, 
            TwoPM || 0, 
            ThreePA || 0, 
            ThreePM || 0, 
            Rebounds || 0, 
            Assists || 0, 
            Steals || 0, 
            Fouls || 0, 
            Turnovers || 0,
        ]);

        res.status(201).json({message: 'Stat created successfully'});

    } catch (err) {
        console.error('Error creating stat:', err);
        res.status(500).json({message: 'Internal server error.'});
    };
});
// Works -----------------------------------------------------------------------------------------------------------------------



















/*
    LISTENER
*/

app.listen(PORT, async function() {
    console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`)

    // await loadFile();
    await loadSP();
});