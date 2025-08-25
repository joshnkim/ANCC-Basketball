import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

function HomePage({ backendURL }) {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [user, setUser] = useState(null); 


  const handleNavigation = (path) => {
    if (!user) {
      setRedirectPath(path);
      setShowLogin(true); 
    } else {
      navigate(path);
    }
  };

  
  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username, Password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Successful!');
        setUser({ Username });   
        setShowLogin(false);
        setUsername('');
        setPassword('');
        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      } else {
        alert(` ${data.error}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <div className="page-content">
        <div className="button-container">
          <div className="homebuttons">
            <button onClick={() => navigate('/players')}>View Players</button>
            <button onClick={() => navigate('/teams')}>View Teams</button>
            <button onClick={() => navigate('/games')}>View Games</button>
            <button onClick={() => navigate('/stats')}>View Stats</button>
            <button onClick={() => handleNavigation('/create_player')}>Create a Player</button>
            <button onClick={() => handleNavigation('/create_team')}>Create a Team</button>
            <button onClick={() => handleNavigation('/create_game')}>Manage Games</button>
            <button onClick={() => handleNavigation('/create_stat')}>Create Stats</button>
          </div>
        </div>
      </div>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="manageLabel">Login Required</h2>
            <div className="forminput">
                <input className="cuFormInput1"
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input className="cuFormInput1"
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="modal-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowLogin(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
