import { useState, useEffect } from "react";
import Table from '../components/Table'
import Footer from "../components/Footer";

function ViewPlayersPage ({backendURL}) {

    const [players, setPlayers] = useState([[]])
    const getPlayers = async () => {
        try{
            const response = await fetch(`${backendURL}/players`);
            const data = await response.json();
            setPlayers(data.players || data);

        } catch (error) {
            console.error('Error fetching players:', error); 
        }
    }

    useEffect(() => {
        getPlayers();
    }, [])

    const columns = ['PlayerID', 'Name', 'Gender', 'Number', 'Team']


    return (
        <>
            <div>
                <h1 className="h1_title">View All Players and Teams</h1>

                <Table className='Table'
                    columns={columns}
                    data={players}
            />
            </div>

            <div>
                <Footer/>
            </div>
            
        </>
        

        
    )
}

export default ViewPlayersPage;