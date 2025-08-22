import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-content">
                <div className="button-container">
                    <div className="homebuttons">
                        <button id="ViewPlayers" type="button" onClick={() => navigate('/players')}>View Players</button>
                        <button id="ViewTeams" type="button" onClick={() => navigate('/teams')}>View Teams</button>
                        <button id="ViewGames" type="button" onClick={() => navigate('/games')}>View Games</button>
                        <button id="ViewStats" type="button" onClick={() => navigate('/stats')}>View Stats</button>
                        <button id="CreatePlayer" type="button" onClick={() => navigate('/create_player')}>Create a Player</button>
                        <button id="CreateTeam" type="button" onClick={() => navigate('/create_team')}>Create a Team</button>
                        <button id="CreateGame" type="button" onClick={() => navigate('/create_game')}>Manage Games</button>
                        <button id="CreateStats" type="button" onClick={() => navigate('/create_stat')}>Create Stats</button>
                        
                    </div>
                </div>
            </div>
        </>
        
    )
}


export default HomePage;