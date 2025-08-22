import { useState, useEffect } from "react";
import Table from '../components/Table'
import Footer from "../components/Footer";

function ViewGamesPage ({backendURL}) {

    const [games, setGames] = useState([[]])
    const getGames = async () => {
        try{
            const response = await fetch(`${backendURL}/games`);
            const data = await response.json();
            setGames(data.games || data);

        } catch (error) {
            console.error('Error fetching players:', error); 
        }
    }

    useEffect(() => {
        getGames();
    }, [])

    const columns = ['GameID', 'Date', 'Team A', 'Team A Score', 'Team B', 'Team B Score', 'Category', 'Winner']


    return (
        <>
            <div>
                <h1 className="h1_title">View All Games</h1>

                <Table className='Table'
                    columns={columns}
                    data={games}
            />
            </div>

            <div>
                <Footer/>
            </div>
            
        </>
        

        
    )
}

export default ViewGamesPage;