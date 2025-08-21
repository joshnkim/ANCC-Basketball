import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-content">
                <div className="button-container">
                    <div className="homebuttons">
                        <button id="ViewTeams" type="button" onClick={() => navigate('/teams')}>View Teams</button>
                        <button id="ViewPlayers" type="button" onClick={() => navigate('/players')}>View Players</button>
                        <button id="ViewGames" type="button" onClick={() => navigate('/games')}>View Games</button>
                        <button id="ViewStats" type="button" onClick={() => navigate('/stats')}>View Stats</button>
                    </div>
                </div>
            </div>
        </>
        
    )
}


export default HomePage;