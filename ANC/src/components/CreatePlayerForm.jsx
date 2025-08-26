import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePlayerForm = ({ backendURL, refreshData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    PlayerName: '',
    Gender: '',
    PlayerNo: '',
  });

  const [formData1, setFormData1] = useState({
    TeamID: '',
    PlayerID: '',
    PTYear: ''
  })

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${backendURL}/players`);
        const data = await response.json();
        setPlayers(data.players || data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, [backendURL]);

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

    const playerData = {
        PlayerName: formData.PlayerName,
        Gender: formData.Gender,
        PlayerNo: formData.PlayerNo ? formData.PlayerNo : null
    }



    try {
      const response = await fetch(`${backendURL}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerData)
      });

      if (response.ok) {
        const player = await response.json();

        const playerTeamData = {
            TeamID: parseInt(formData1.TeamID),
            PlayerID: player.PlayerID,
            PTYear: parseInt(formData1.PTYear)
        };

        const response1 = await fetch(`${backendURL}/playerteams`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(playerTeamData)
    
          });

          if (response1.ok) {
            setFormData({ PlayerName: '', Gender: '', PlayerNo: '' });
            setFormData1({ TeamID: '', PlayerID: '', PTYear: '' });
    
            window.alert(`Player ${player.PlayerName} created and added to team successfully!`);
            refreshData();
            navigate('/');
          } else {
            console.error('Failed to add player to team.');
            window.alert('Player created but failed to add to team.');
          }
        
      } else {
        console.error('Failed to create player and add to team.');
      }
    } catch (error) {
      console.error('Error creating player and adding to team:', error);
    }
  };

  return (
    <>
      <h2 className="manageLabel">Create a Player</h2>
      <form className="cuForm" onSubmit={handleSubmit}>

        <div className="formRow">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="PlayerName"
            className="cuFormInput"
            value={formData.PlayerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formRow">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            name="Gender"
            className="cuFormInput"
            value={formData.Gender}
            onChange={handleChange}
            required
          />
        </div>


        <div className="formRow">
          <label htmlFor="playerno">Jersey Number:</label>
          <input
            type="text"
            name="PlayerNo"
            className="cuFormInput"
            value={formData.PlayerNo}
            onChange={handleChange}
          />
        </div>


        <div className="formRow">
          <label htmlFor="TeamID">Team:</label>
          <select
            name="TeamID"
            className="cuFormInput"
            value={formData1.TeamID}
            onChange={(e) => setFormData1(prev => ({ ...prev, TeamID: e.target.value }))}
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
            <label htmlFor="PTYear">Year:</label>
            <input
                type="number"
                name="PTYear"
                className="cuFormInput"
                value={formData1.PTYear}
                onChange={(e) => setFormData1(prev => ({ ...prev, PTYear: e.target.value }))}
                required
            />
        </div>

        <input className="submit" type="submit" value="Create Player" />
      </form>
    </>
  );
};

export default CreatePlayerForm;
