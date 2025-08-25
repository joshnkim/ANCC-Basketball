import { useState,useEffect } from "react";
import Table from "../components/Table";
import Footer from "../components/Footer";

function ViewStatsByGamePage({backendURL}) {
    const [games, setGames] = useState([]);
    const [selectedGameID, setSelectedGameID] = useState(null);
    const [stats, setStats] = useState([]);


    useEffect(() => {
        console.log(stats);
    }, [stats]);


    // Fetch all games for dropdown 
    useEffect(() => {
        const getGames = async () => {
            try {
                const response = await fetch(`${backendURL}/games`);
                const data = await response.json();
                setGames(data.games || data);

            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        getGames();
    }, [backendURL])

    // Fetch stats whenever a game is selected
    useEffect(() => {
        if (!selectedGameID) return;
        const getStats = async() => {
            try {
                const response = await fetch(`${backendURL}/stats/${selectedGameID}`);
                const data = await response.json();
                setStats(data.stats || data);

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        getStats();
    }, [selectedGameID, backendURL])

    const columns = ['StatID', 'GameID', 'Date', 'Name', 'Free Throws', 'Free Throws Made', '2 Pointers', '2 Pointers Made', '3 Pointers', '3 Pointers Made', 'Rebounds', 'Assists', 'Steals', 'Fouls', 'Turnovers']

    return ( 
        <>
            <div>
                <h1 className="h1_title">View Stats By Game:</h1>

                <div className="formRow">
                    <h3 className="manageLabel">Select a game:</h3>
                    <select 
                        id="gameSelect"
                        value={selectedGameID || ''}
                        onChange={(e) => setSelectedGameID(e.target.value)}
                        className="cuFormInput"
                        >
                            <option value="">--Select Game--</option>
                            {games.map((g) => (
                                <option key={g.GameID} value={g.GameID}>
                                    {g.Date}
                                </option>
                            ))}
                        </select>
                </div>

                {stats.length > 0 && (
                    <div style={{ marginTop: "50px" }}>
                           <Table className="Table"
                                columns={columns}
                                data={stats}
                    />
                    </div>
                )}
             
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default ViewStatsByGamePage;