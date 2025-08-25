import { useState, useEffect } from "react";
import CreateGameForm from "../components/CreateGameForm";
import Footer from "../components/Footer";
import UpdateGameForm from "../components/UpdateGameForm";

function CreateGamePage ({backendURL}) {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        try {
            const response = await fetch(`${backendURL}/games`);
            const data = await response.json();
            setGames(data.games || data);

        } catch (error) {
            console.error("Error fetching games:", error);
        }
    }

    useEffect(() => {
        getGames();
    }, []);
    
    return (
        <>
            <div>
                <h1 className="h1_title">Manage Games</h1>

                <div className="createForm">
                    <CreateGameForm backendURL={backendURL} refreshData={getGames} />
                </div>

                <div className="createForm">
                    <UpdateGameForm games = {games} backendURL={backendURL} refreshData={getGames} />
                </div>

                
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default CreateGamePage;