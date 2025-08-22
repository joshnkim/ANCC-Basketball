import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateGameForm = ({ backendURL, refreshData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Date: '',
    TeamAID: '',
    TeamBID: '',
    Category: '',
    Winner: '',
    ScoreA: 0,
    ScoreB: 0,
    GameNumber: 1
  });

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['ScoreA', 'ScoreB', 'GameNumber', 'TeamAID', 'TeamBID'].includes(name)
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent selecting the same team for both sides
    if (formData.TeamAID && formData.TeamAID === formData.TeamBID) {
      return window.alert("Team A and Team B cannot be the same.");
    }

    const teamAName = teams.find(t => t.TeamID === parseInt(formData.TeamAID))?.['Team Name'] || '';
    const teamBName = teams.find(t => t.TeamID === parseInt(formData.TeamBID))?.['Team Name'] || '';

    try {
      const response = await fetch(`${backendURL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            GameDate: formData.Date,
            Category: formData.Category,
            GameNo: formData.GameNumber,
            TeamA_ID: parseInt(formData.TeamAID),
            TeamB_ID: parseInt(formData.TeamBID),
            ScoreA: formData.ScoreA,
            ScoreB: formData.ScoreB,
            WinnerID: formData.Winner ? parseInt(formData.Winner) : null
          })
      });

      if (response.ok) {
        setFormData({
          Date: '',
          TeamAID: '',
          TeamBID: '',
          Category: '',
          Winner: '',
          ScoreA: 0,
          ScoreB: 0,
          GameNumber: formData.GameNumber + 1
        });
        window.alert(`Game for Team ${teamAName} and Team ${teamBName} created successfully!`);
        refreshData();
        navigate('/');
      } else {
        console.error('Failed to create game.');
      }
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <>
      <h2 className="manageLabel">Create a Game</h2>
      <form className="cuForm" onSubmit={handleSubmit}>

        <div className="formRow">
          <label htmlFor="Date">Date:</label>
          <input
            type="date"
            name="Date"
            className="cuFormInput"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formRow">
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

        <div className="formRow">
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
          <label htmlFor="Category">Category:</label>
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

        <div className="formRow">
          <label htmlFor="ScoreA">Team A Score:</label>
          <input
            type="number"
            name="ScoreA"
            className="cuFormInput"
            value={formData.ScoreA}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="formRow">
          <label htmlFor="ScoreB">Team B Score:</label>
          <input
            type="number"
            name="ScoreB"
            className="cuFormInput"
            value={formData.ScoreB}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="formRow">
          <label htmlFor="Winner">Winner:</label>
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

        <input className="submit" type="submit" value="Create Game" />
      </form>
    </>
  );
};

export default CreateGameForm;
