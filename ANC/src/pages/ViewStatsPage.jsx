import { useState, useEffect } from "react";
import Table from '../components/Table'
import Footer from "../components/Footer";

function ViewStatsPage ({backendURL}) {

    const [stats, setStats] = useState([[]])
    const getStats = async () => {
        try{
            const response = await fetch(`${backendURL}/stats`);
            const data = await response.json();
            setStats(data.stats || data);

        } catch (error) {
            console.error('Error fetching stats:', error); 
        }
    }

    useEffect(() => {
        getStats();
    }, [])

    const columns = ['StatID', 'GameID', 'Date', 'Name', 'Free Throws', 'Free Throws Made', '2 Pointers', '2 Pointers Made', '3 Pointers', '3 Pointers Made', 'Rebounds', 'Assists', 'Steals', 'Fouls', 'Turnovers']


    return (
        <>
            <div>
                <h1 className="h1_title">View All Stats</h1>

                <Table className='Table'
                    columns={columns}
                    data={stats}
            />
            </div>

            <div>
                <Footer/>
            </div>
            
        </>
        

        
    )
}

export default ViewStatsPage;