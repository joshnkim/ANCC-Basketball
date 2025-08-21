-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- GET SP ----------------------------------------------------------------------------------------------------------------

-- Get all teams ----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getTeams;
CREATE PROCEDURE sp_getTeams()
BEGIN
    SELECT 
        Players.PlayerID,
        Players.PlayerName,
        Players.Gender, 
        Players.PlayerNo,
        Teams.TeamName
    FROM Players
    LEFT JOIN PlayerTeams ON PlayerTeams.PlayerID = Players.PlayerID 
    LEFT JOIN Teams ON Teams.TeamID = PlayerTeams.TeamID;

END;
-- -----------------------------------------------------------------------------------------------------------------------





-- Get all games ----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_getGames;
CREATE PROCEDURE sp_getGames()
BEGIN
    SELECT 
        Games.GameID, 
        Games.GameDate AS 'Date',
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
        Games.GameDate AS 'Date',
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
    ORDER BY Stats.GameID, Players.PlayerName;

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
        Games.GameDate AS 'Date',
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
        Stats.StatID, 
        Stats.GameID, 
        Games.GameDate AS 'Date',
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
    WHERE Stats.PlayerID = playerIDinput
    ORDER BY Stats.GameID, Players.PlayerName;
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
