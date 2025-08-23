import { useState, useEffect } from "react";
import Table from "../components/Table";
import Footer from "../components/Footer";
import Select from "react-select";

function ViewPlayerStatsPage({ backendURL }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerID, setSelectedPlayerID] = useState(null);
  const [stats, setStats] = useState([]);

  // Fetch all players
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

  // Fetch stats when a player is selected
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

  const columns = [
    "Name", "Number", "# Games Played", "FT%", "FG%", "3P%",
    "REB", "AST", "STL", "PF", "TO", "Total Pts"
  ];

  const cellRenderer = (row, col) => {
    if (col === "Name") return row.PlayerName;
    if (col === "Number") return row.PlayerNo ?? "-";
    return row[col] ?? 0;
  };

  // Convert players to react-select options
  const playerOptions = players.map(p => ({
    value: p.PlayerID,
    label: p.Name
  }));

  // Find currently selected option
  const selectedOption = playerOptions.find(p => p.value === selectedPlayerID) || null;

  return (
    <>
      <div>
        <h1 className="h1_title">View Stats By Player</h1>

        {/* Searchable Player Dropdown */}
        <div className="formRow">
          <h3 className="manageLabel">Select a player:</h3>
          <Select
            options={playerOptions}
            value={selectedOption}
            onChange={option => setSelectedPlayerID(option ? option.value : null)}
            isClearable
            placeholder="Search and select a player..."
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "rgba(143, 194, 255, 0.386)",
                border: "none",
                borderRadius: 3,
                padding: "5px 10px",
                width: 300,
                color: "black",
                minHeight: "40px",
              }),
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 99999, // ensures dropdown is above sticky table header
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "rgba(26, 129, 255, 0.7)" : "#fff",
                color: state.isFocused ? "white" : "black",
                cursor: "pointer",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "black",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "black",
              }),
            }}
            menuPortalTarget={document.body} // render dropdown outside container
            menuPosition="fixed"
          />
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
