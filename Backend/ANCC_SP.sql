-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- GET SP ----------------------------------------------------------------------------------------------------------------

-- Get all players -------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getPlayers;
CREATE PROCEDURE sp_getPlayers()
BEGIN
    SELECT 
        Players.PlayerID,
        Players.PlayerName AS 'Name',
        Players.Gender, 
        Players.PlayerNo AS 'Number',
        Teams.TeamName AS 'Team'
    FROM Players
    LEFT JOIN PlayerTeams ON PlayerTeams.PlayerID = Players.PlayerID 
    LEFT JOIN Teams ON Teams.TeamID = PlayerTeams.TeamID
    ORDER BY Players.PlayerName;

END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Get all team specific players -----------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getPlayersByTeam;
CREATE PROCEDURE sp_getPlayersByTeam(
    IN teamIDInput INT
)
BEGIN
    SELECT 
        p.PlayerID,
        p.PlayerName,
        p.PlayerNo AS 'Number'
    FROM Players p
    INNER JOIN PlayerTeams pt ON pt.PlayerID = p.PlayerID
    WHERE pt.TeamID = teamIDInput
    ORDER BY p.PlayerName;
END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Get all games ----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getGames;
CREATE PROCEDURE sp_getGames()
BEGIN
    SELECT 
        Games.GameID, 
        DATE_FORMAT(Games.GameDate, '%Y-%m-%d') AS 'Date',
        TeamA.TeamName AS 'Team A', 
        TeamB.TeamName AS 'Team B', 
        Games.Category, 
        TeamWinner.TeamName AS Winner
    FROM Games
    LEFT JOIN Teams TeamA on Games.TeamA_ID = TeamA.TeamID
    LEFT JOIN Teams TeamB on Games.TeamB_ID = TeamB.TeamID 
    LEFT JOIN Teams TeamWinner on Games.WinnerID = TeamWinner.TeamID;

END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Get all stats ---------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getStats;
CREATE PROCEDURE sp_getStats()
BEGIN
    SELECT 
        Stats.StatID, 
        Stats.GameID, 
        DATE_FORMAT(Games.GameDate, '%Y-%m-%d') AS 'Date',
        Players.PlayerName AS 'Name', 
        Stats.FTA AS 'Free Throws',
        Stats.FTM AS 'Free Throws Made', 
        Stats.TwoPA AS '2 Pointers', 
        Stats.TwoPM AS '2 Pointers Made', 
        Stats.ThreePA AS'3 Pointers',
        Stats.ThreePM AS '3 Pointers Made',  
        Stats.Rebounds, 
        Stats.Assists,
        Stats.Steals, 
        Stats.Fouls, 
        Stats.Turnovers
    FROM Stats
    LEFT JOIN Players ON Stats.PlayerID = Players.PlayerID
    LEFT JOIN Games ON Stats.GameID = Games.GameID
    ORDER BY Players.PlayerName;

END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Get game stats --------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getGameStats;
CREATE PROCEDURE sp_getGameStats(
    IN gameIDinput INT
)
BEGIN 
    SELECT 
        Stats.StatID, 
        Stats.GameID, 
        DATE_FORMAT(Games.GameDate, '%Y-%m-%d') AS 'Date',
        Players.PlayerName AS 'Name', 
        Players.PlayerNo AS 'Number',
        Stats.FTA AS 'Free Throws',
        Stats.FTM AS 'Free Throws Made', 
        Stats.TwoPA AS '2 Pointers', 
        Stats.TwoPM AS '2 Pointers Made', 
        Stats.ThreePA AS'3 Pointers',
        Stats.ThreePM AS '3 Pointers Made',  
        Stats.Rebounds, 
        Stats.Assists,
        Stats.Steals, 
        Stats.Fouls, 
        Stats.Turnovers
    FROM Stats
    LEFT JOIN Players ON Stats.PlayerID = Players.PlayerID
    LEFT JOIN Games ON Stats.GameID = Games.GameID
    WHERE Stats.GameID = gameIDinput
    ORDER BY Stats.GameID, Players.PlayerName;
END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Get stats by player ---------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getPlayerStats;
CREATE PROCEDURE sp_getPlayerStats(
    IN playerIDinput INT
)
BEGIN
    SELECT 
        Players.PlayerID, 
        Players.PlayerName, 
        Players.PlayerNo,
        COUNT(Stats.GameID) AS '# Games Played', 
        (SUM(Stats.FTM) / SUM(Stats.FTA)) AS 'FT%',
        ((SUM(Stats.TwoPM) + SUM(Stats.ThreePM)) / (SUM(Stats.TwoPA) + SUM(Stats.ThreePA))) AS 'FG%',
        (SUM(Stats.ThreePM) / SUM(Stats.ThreePA)) AS '3P%',
        SUM(Stats.Rebounds) AS 'REB',
        SUM(Stats.Assists) AS 'AST',
        SUM(Stats.Steals) AS 'STL',
        SUM(Stats.Fouls) AS 'PF',
        SUM(Stats.Turnovers) AS 'TO',
        (SUM(Stats.FTM) + SUM(Stats.TwoPM) + SUM(Stats.ThreePA)) AS 'Total Pts'
        
        FROM Stats 
    LEFT JOIN Players ON Stats.PlayerID = Players.PlayerID
    WHERE Stats.PlayerID = playerIDinput
    GROUP BY Stats.PlayerID;
END;
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- POST SP ---------------------------------------------------------------------------------------------------------------

-- Create a player -------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_createPlayer; 
CREATE PROCEDURE sp_createPlayer(
    IN nameInput VARCHAR(55),
    IN genderInput ENUM('Male', 'Female'),
    IN playerNumInput INT
)
BEGIN
    INSERT INTO Players (PlayerName, Gender, PlayerNo)
    VALUES
        (nameInput, genderInput, playerNumInput);
END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Create a team ---------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_createTeam;
CREATE PROCEDURE sp_createTeam(
    IN teamNameInput VARCHAR(55),
    IN yearInput YEAR
)
BEGIN
    INSERT INTO Teams (TeamName, TeamYear)
    VALUES
        (teamNameInput, yearInput);
END;
-- -----------------------------------------------------------------------------------------------------------------------

-- Create a game ---------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_createGame; 
CREATE PROCEDURE sp_createGame(
    IN dateInput DATE,
    IN categoryInput ENUM('Regular', 'Semi Finals', 'Finals'),
    IN gameNumInput ENUM('1', '2'),
    IN teamAIDInput INT,
    IN teamBIDInput INT, 
    IN scoreAInput INT,
    IN scoreBInput INT, 
    IN winnerIDInput INT
)
BEGIN
    INSERT INTO Games (
        GameDate, 
        Category, 
        GameNo, 
        TeamA_ID, 
        TeamB_ID, 
        ScoreA, 
        ScoreB, 
        WinnerID
        )
    VALUES 
        (
            dateInput,
            categoryInput,
            gameNumInput,
            teamAIDInput,
            teamBIDInput,
            scoreAInput,
            scoreBInput,
            winnerIDInput
        );
END;
-- -----------------------------------------------------------------------------------------------------------------------


-- Create a stat ---------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_createStat;
CREATE PROCEDURE sp_createStat(
    IN gameIDInput INT,
    IN playerIDInput INT, 
    IN FTAInput INT,
    IN FTMInput INT,
    IN TwoPAInput INT,
    IN TwoPMInput INT,
    IN ThreePAInput INT,
    IN ThreePMInput INT,
    IN reboundInput INT,
    IN assistInput INT,
    IN stealInput INT,
    IN foulInput INT,
    IN turnoverInput INT
)
BEGIN 
    INSERT INTO Stats (
        GameID,
        PlayerID,
        FTA,
        FTM,
        TwoPA,
        TwoPM,
        ThreePA,
        ThreePM,
        Rebounds,
        Assists,
        Steals,
        Fouls,
        Turnovers
    )
    VALUES 
        (
            gameIDInput,
            playerIDInput,
            FTAInput,
            FTMInput,
            TwoPAInput,
            TwoPMInput,
            ThreePAInput,
            ThreePMInput,
            reboundInput,
            assistInput,
            stealInput,
            foulInput,
            turnoverInput
        );
END;

-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- PATCH SP --------------------------------------------------------------------------------------------------------------

-- Update a Game
DROP PROCEDURE IF EXISTS sp_updateGame;
CREATE PROCEDURE sp_updateGame(
    IN gameIDInput INT,
    IN dateInput DATE,
    IN categoryInput ENUM('Regular', 'Semi Finals', 'Finals'),
    IN gameNumInput ENUM('1', '2'),
    IN teamAIDInput INT,
    IN teamBIDInput INT, 
    IN scoreAInput INT,
    IN scoreBInput INT, 
    IN winnerIDInput INT
)
BEGIN 
    UPDATE Games
    SET 
        GameDate = dateInput,       
        Category = categoryInput,
        GameNo = gameNumInput,
        TeamA_ID = teamAIDInput,
        TeamB_ID = teamBIDInput,
        ScoreA = scoreAInput,
        ScoreB = scoreBInput,
        WinnerID = winnerIDInput
    WHERE GameID = gameIDInput;
END;

        

