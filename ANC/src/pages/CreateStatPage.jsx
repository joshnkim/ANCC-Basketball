import { useState, useEffect } from "react";
import Table from "../components/Table";
import Footer from "../components/Footer";

const CreateStatsByTeamPage = ({ backendURL }) => {
  const [games, setGames] = useState([]);
  const [selectedGameID, setSelectedGameID] = useState(null);

  const [teams, setTeams] = useState([]);
  const [teamAID, setTeamAID] = useState(null);
  const [teamBID, setTeamBID] = useState(null);
  const [teamAStats, setTeamAStats] = useState([]);
  const [teamBStats, setTeamBStats] = useState([]);

  // Fetch all games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${backendURL}/games`);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, [backendURL]);

  // Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${backendURL}/teams`);
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, [backendURL]);

  // Fetch players for a team and initialize stats
  const fetchPlayersForTeam = async (teamID, setter) => {
    if (!teamID || !selectedGameID) return; // only fetch if game is selected
    try {
      const res = await fetch(`${backendURL}/teams/${teamID}`);
      const data = await res.json();
      const statsData = data.map((player) => ({
        GameID: selectedGameID,
        PlayerID: player.PlayerID,
        PlayerName: player.PlayerName,
        Number: player.Number,
        FTA: 0,
        FTM: 0,
        TwoPA: 0,
        TwoPM: 0,
        ThreePA: 0,
        ThreePM: 0,
        Rebounds: 0,
        Assists: 0,
        Steals: 0,
        Fouls: 0,
        Turnovers: 0,
      }));
      setter(statsData);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  // Refetch stats whenever team or game changes
  useEffect(() => { fetchPlayersForTeam(teamAID, setTeamAStats); }, [teamAID, selectedGameID]);
  useEffect(() => { fetchPlayersForTeam(teamBID, setTeamBStats); }, [teamBID, selectedGameID]);

  const updateStat = (team, playerID, stat, delta) => {
    const setter = team === "A" ? setTeamAStats : setTeamBStats;
    const stats = team === "A" ? teamAStats : teamBStats;
    setter(stats.map((p) =>
      p.PlayerID === playerID ? { ...p, [stat]: Math.max(0, p[stat] + delta) } : p
    ));
  };

  const handleSubmit = async () => {
    if (!selectedGameID) {
      alert("Please select a game first!");
      return;
    }
    try {
      await Promise.all([
        ...teamAStats.map((row) =>
          fetch(`${backendURL}/stats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(row),
          })
        ),
        ...teamBStats.map((row) =>
          fetch(`${backendURL}/stats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(row),
          })
        ),
      ]);
      alert("Stats submitted successfully!");
    } catch (err) {
      console.error("Error submitting stats:", err);
    }
  };

  const statColumns = [
    "Name",
    "Number",
    "FTA",
    "FTM",
    "TwoPA",
    "TwoPM",
    "ThreePA",
    "ThreePM",
    "Rebounds",
    "Assists",
    "Steals",
    "Fouls",
    "Turnovers",
  ];

  const cellRenderer = (team) => (row, col) => {
    if (col === "Name") return row.PlayerName;
    if (col === "Number") return row.Number ?? "-";
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <button type='button' className='tableButton' onClick={() => updateStat(team, row.PlayerID, col, -1)}>-</button>
        <span style={{ margin: "0 5px" }}>{row[col]}</span>
        <button type='button' className='tableButton1' onClick={() => updateStat(team, row.PlayerID, col, 1)}>+</button>
      </div>
    );
  };

  return (
  <>
    <div className="createForm">
      <h2 className="manageLabel">Create Stats by Team</h2>

      <form className="cuForm" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

        {/* Game Dropdown */}
        <div className="formRow">
          <label htmlFor="Game">Select Game:</label>
          <select
            id="Game"
            className="cuFormInput"
            value={selectedGameID || ""}
            onChange={(e) => setSelectedGameID(e.target.value)}
            required
          >
            <option value="">--Select Game--</option>
            {games.map((g) => (
              <option key={g.GameID} value={g.GameID}>
                {`${g.Date} - ${g.Category}`}
              </option>
            ))}
          </select>
        </div>

        <div className="formRow">
          <label htmlFor="TeamA">Team A:</label>
          <select
            id="TeamA"
            className="cuFormInput"
            value={teamAID || ""}
            onChange={(e) => setTeamAID(e.target.value)}
            required
          >
            <option value="">--Select Team A--</option>
            {teams.map((t) => (
              <option key={t.TeamID} value={t.TeamID}>{t["Team Name"]}</option>
            ))}
          </select>
        </div>

        <div className="formRow">
          <label htmlFor="TeamB">Team B:</label>
          <select
            id="TeamB"
            className="cuFormInput"
            value={teamBID || ""}
            onChange={(e) => setTeamBID(e.target.value)}
            required
          >
            <option value="">--Select Team B--</option>
            {teams.map((t) => (
              <option key={t.TeamID} value={t.TeamID}>{t["Team Name"]}</option>
            ))}
          </select>
        </div>

        {/* Stats Tables */}
        {teamAStats.length > 0 && (
          <>
            <h3 className="manageLabel">Team A Stats</h3>
            <Table columns={statColumns} data={teamAStats} cellRenderer={cellRenderer("A")} />
          </>
        )}

        {teamBStats.length > 0 && (
          <>
            <h3 className="manageLabel">Team B Stats</h3>
            <Table columns={statColumns} data={teamBStats} cellRenderer={cellRenderer("B")} />
          </>
        )}

        <input className="submit" type="submit" value="Submit All Stats" />
      </form>
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
};
export default CreateStatsByTeamPage;
