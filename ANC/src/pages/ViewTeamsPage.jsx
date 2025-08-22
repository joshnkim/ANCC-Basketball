import { useState, useEffect } from 'react'
import Table from '../components/Table';
import Footer from '../components/Footer';


const ViewTeamsPage = ({backendURL}) => {
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

    const columns = ['TeamID', 'Team Name']

    return (
        <>
            <div>
                <h1 className="h1_title">View All Teams</h1>

                <Table className='Table'
                    columns={columns}
                    data={teams}
            />
            </div>

            <div>
                <Footer/>
            </div>
            
        </>
        

        
    )
        
    
}

export default ViewTeamsPage;


