import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const UpdateGameForm = ({ games, backendURL, refreshData }) => {
    const navigate = useNavigate();
    const [selectedID, setSelectedID] = useState('');
    const [formData, setFormData] = useState({
        Date: '',
        TeamAID: '',
        TeamBID: '',
        Category: '',
        Winner: '',
        ScoreA: 0,
        ScoreB: 0,
        GameNumber: ''
    });

    const handleSelect = (e) => {
        const gameID = e.target.value;
        setSelectedID(gameID);

        const selectedGame = games.find(g => g.GameID.toString() === gameID);
        if (selectedGame) {
            setFormData({
                Date: selectedGame.Date || '',
                TeamAID: selectedGame.TeamAID || '',
                TeamBID: selectedGame.TeamBID || '',
                Category: selectedGame.Category || '',
                Winner: selectedGame.Winner || '',
                ScoreA: selectedGame.ScoreA || 0,
                ScoreB: selectedGame.ScoreB || 0,
                GameNumber: selectedGame.GameNumber || 1

            });
        }
    };
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
          try {
            const response = await fetch(`${backendURL}/teams`);
            const data = await response.json();
            setTeams(data.teams || data);
          } catch (error) {
            console.error('Error fetching teams:', error);
          }
        };
        fetchTeams();
      }, [backendURL]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const game = games.find(game => game.GameID === parseInt(selectedID)) 
        const TeamAName = teams.find(t => t.TeamID === parseInt(formData.TeamAID))?.['Team Name'] || '';
        const TeamBName = teams.find(t => t.TeamID === parseInt(formData.TeamBID))?.['Team Name'] || '';

        try {
            console.log('Updating game:', selectedID, formData);
            
            const response = await fetch(`${backendURL}/games/${selectedID}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, Date: Date(formData.Date), TeamAID: Number(formData.TeamAID), TeamBID: Number(formData.TeamBID), Category: formData.Category, ScoreA: Number(formData.ScoreA), ScoreB: Number(formData.ScoreB), GameNumber: Number(formData.ScoreB) })
            });
    
            if (response.ok) {
                setSelectedID('');
                setFormData({ Date: '', TeamAID: '', TeamBID: '', Category: '', Winner: '', ScoreA: 0, ScoreB: 0, GameNumber: 1 });
                window.alert(`Game for ${TeamAName} and ${TeamBName} has been updated successfully!`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to update game');
            }
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };
    return (
        <>
            <h2 className='manageLabel'>Update a Game</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label htmlFor="update_game_select">Select Game:</label>
                    <select className='cuFormInput' id="update_game_select" value={selectedID} onChange={handleSelect}>
                        <option value="">--Select Game--</option>
                        {games.map((g) => (
                            <option key={g.GameID} value={g.GameID}>
                                {`${g.Date} - ${g.Category}`}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedID && (
                    <>
                    <div className='formRow'>
                        <label htmlFor="update_date">Date:</label>
                        <input className='cuFormInput'
                            type="date"
                            id="Date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="TeamAID">Team A:</label>
                            <select
                                name="TeamAID"
                                className="cuFormInput"
                                value={formData.TeamAID}
                                onChange={handleChange}
                                required
                            >
                            <option value="">Select Team A</option>
                            {teams.map(team => (
                            <option key={team.TeamID} value={team.TeamID}>
                                {team['Team Name']}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className='formRow'>
                        <label htmlFor="TeamBID">Team B:</label>
                            <select
                                name="TeamBID"
                                className="cuFormInput"
                                value={formData.TeamBID}
                                onChange={handleChange}
                                required
                            >
                            <option value="">Select Team B</option>
                            {teams.map(team => (
                            <option key={team.TeamID} value={team.TeamID}>
                                {team['Team Name']}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="formRow">
                        <label htmlFor="Update_Category">Category:</label>
                        <select
                            name="Category"
                            className="cuFormInput"
                            value={formData.Category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Regular">Regular</option>
                            <option value="Semi Finals">Semi Finals</option>
                            <option value="Finals">Finals</option>
                        </select>
                    </div>
                    
                    <div className='formRow'>
                        <label htmlFor="ScoreA">Team A Score:</label>
                        <input className='cuFormInput'
                            type="number"
                            id="ScoreA"
                            name="ScoreA"
                            value={formData.ScoreA}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="ScoreB">Team B Score:</label>
                        <input className='cuFormInput'
                            type="number"
                            id="ScoreB"
                            name="ScoreB"
                            value={formData.ScoreB}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
            
                    <div className="formRow">
                        <label htmlFor="UpdateWinner">Winner:</label>
                            <select
                                name="Winner"
                                className="cuFormInput"
                                value={formData.Winner}
                                onChange={handleChange}
                            >
                                <option value="">Select Winner (optional)</option>
                                {formData.TeamAID && (
                                <option value={formData.TeamAID}>
                                    {teams.find(t => t.TeamID === parseInt(formData.TeamAID))?.['Team Name']}
                                </option>
                                )}
                                {formData.TeamBID && (
                                <option value={formData.TeamBID}>
                                    {teams.find(t => t.TeamID === parseInt(formData.TeamBID))?.['Team Name']}
                                </option>
                                )}
                            </select>
                    </div>

                    <div className="formRow">
                        <label htmlFor="GameNumber">Game Number:</label>
                        <input
                            type="number"
                            name="GameNumber"
                            className="cuFormInput"
                            value={formData.GameNumber}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                <input className="submit" type="submit" value="Update Game" />

                    </>
                )}
            </form>
        </>
    );
};

export default UpdateGameForm;