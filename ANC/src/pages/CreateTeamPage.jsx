import { useState, useEffect } from "react";
import CreateTeamForm from "../components/CreateTeamForm";
import Footer from "../components/Footer";


function CreateTeamPage ({backendURL}) {
    const [teams, setTeams] = useState([]);

    const getTeams = async () => {
        try {
            const response = await fetch(`${backendURL}/teams`);
            const data = await response.json();
            setTeams(data.teams || data);

        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }

    useEffect(() => {
        getTeams();
    }, []);
    
    return (
        <>
            <div>
                <h1 className="h1_title">Create a Team</h1>

                <div className="createForm">
                    <CreateTeamForm backendURL={backendURL} refreshData={getTeams} />
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default CreateTeamPage;