import { useState, useEffect } from "react";
import CreatePlayerForm from "../components/CreatePlayerForm";
import Footer from "../components/Footer";


function CreatePlayerPage ({backendURL}) {
    const [players, setPlayers] = useState([]);

    const getPlayers = async () => {
        try {
            const response = await fetch(`${backendURL}/players`);
            const data = await response.json();
            setPlayers(data.players || data);

        } catch (error) {
            console.error("Error fetching players:", error);
        }
    }

    useEffect(() => {
        getPlayers();
    }, []);
    
    return (
        <>
            <div>
                <h1 className="h1_title">Create a Player</h1>

                <div className="createForm">
                    <CreatePlayerForm backendURL={backendURL} refreshData={getPlayers} />
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default CreatePlayerPage;