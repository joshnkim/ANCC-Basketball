import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeamForm = ({ backendURL, refreshData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TeamName: '',
    TeamYear: ''
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
        TeamName: formData.TeamName,
        TeamYear: parseInt(formData.TeamYear)
    }

    try {
      const response = await fetch(`${backendURL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData)
      });

      if (response.ok) {
        setFormData({
          TeamName: '',
          TeamYear: ''
        });
        window.alert(`Team ${formData.TeamName} has been created successfully!`);
        refreshData();
        navigate('/');
      } else {
        console.error('Failed to create team.');
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <>
      <h2 className="manageLabel">Create a Team</h2>
      <form className="cuForm" onSubmit={handleSubmit}>

        <div className="formRow">
          <label htmlFor="TeamName">Team Name:</label>
          <input
            type="text"
            name="TeamName"
            className="cuFormInput"
            value={formData.TeamName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formRow">
          <label htmlFor="TeamYear">Year:</label>
          <input
            type="text"
            name="TeamYear"
            className="cuFormInput"
            value={formData.TeamYear}
            onChange={handleChange}
            required
          />
        </div>


  

        <input className="submit" type="submit" value="Create Team" />
      </form>
    </>
  );
};

export default CreateTeamForm;
