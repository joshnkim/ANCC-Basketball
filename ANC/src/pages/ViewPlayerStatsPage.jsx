import { useState, useEffect } from "react";
import Table from "../components/Table";
import Footer from "../components/Footer";

function ViewPlayerStatsPage({ backendURL }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerID, setSelectedPlayerID] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    console.log(stats);
  }, [stats]);
  
  // Fetch all players for dropdown
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(`${backendURL}/players`);
        const data = await response.json();
        setPlayers(data.players || data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    getPlayers();
  }, [backendURL]);

  // Fetch stats whenever a player is selected
  useEffect(() => {
    if (!selectedPlayerID) return;
    const getStats = async () => {
      try {
        const response = await fetch(`${backendURL}/stats/player/${selectedPlayerID}`);
        const data = await response.json();
        setStats(data.stats || data);
      } catch (error) {
        console.error("Error fetching stats for player:", error);
      }
    };
    getStats();
  }, [selectedPlayerID, backendURL]);

  const columns = ['Name', 'Number', '# Games Played', 'FT%', 'FG%', '3P%', 'REB', 'AST', 'STL', 'PF', 'TO', 'Total Pts'];

  // Cell renderer to handle null numbers and ensure Name/Number show up
  const cellRenderer = (row, col) => {
    if (col === "Name") return row.PlayerName;
    if (col === "Number") return row.PlayerNo ?? "-";
    return row[col] ?? 0;
  };

  return (
    <>
      <div>
        <h1 className="h1_title">View Stats By Player</h1>

        {/* Player Dropdown */}
        <div className="formRow">
          <h3 className="manageLabel">Select a player:</h3>
          <select
            id="playerSelect"
            value={selectedPlayerID || ""}
            onChange={(e) => setSelectedPlayerID(e.target.value)}
            className="cuFormInput"
          >
            <option value="">--Select Player--</option>
            {players.map((p) => (
              <option key={p.PlayerID} value={p.PlayerID}>
                {p.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Table */}
        {stats.length > 0 && (
            <div style={{ marginTop: "50px" }}>
                <Table columns={columns} data={stats} cellRenderer={cellRenderer} />
            </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ViewPlayerStatsPage;
