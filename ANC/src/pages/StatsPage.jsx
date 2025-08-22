import { useNavigate } from 'react-router-dom';


function StatsPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-content">
                <div className="button-container">
                    <div className="homebuttons">
                        <button id="ViewAllStats" type="button" onClick={() => navigate('/all_stats')}>View All Stats</button>
                        <button id="ViewStatsByPlayer" type="button" onClick={() => navigate('/player_stats')}>View Player Stats</button>
                        <button id="ViewStatsByGame" type="button" onClick={() => navigate('/games')}>View Stats By Game</button>
                    </div>
                </div>
            </div>
        </>
        
    )
}


export default StatsPage;