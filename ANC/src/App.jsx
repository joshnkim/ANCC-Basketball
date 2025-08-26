import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ViewPlayersPage from './pages/ViewPlayersPage'
import ViewGamesPage from './pages/ViewGamesPage'
import StatsPage from './pages/StatsPage'
import ViewStatsPage from './pages/ViewStatsPage'
import ViewPlayerStatsPage from './pages/ViewPlayerStatsPage'
import ViewStatsByGamePage from './pages/ViewStatsByGamePage'
import ViewTeamsPage from './pages/ViewTeamsPage'
import CreatePlayerPage from './pages/CreatePlayerPage'
import CreateTeamPage from './pages/CreateTeamPage'
import CreateStatPage from './pages/CreateStatPage'
import CreateGamePage from './pages/CreateGamePage'
import './App.css'


const backendPort = 3000;
const backendURL = `https://backend-production-a6a83.up.railway.app`;
// const backendURL = `http://18.117.218.170:${backendPort}`;
function App() {


  return (
    <>
      <Router>
        <div className='app'>
          <Header />
          <div className='content'>
            <Routes>
            <Route path='/' element={<HomePage backendURL={backendURL} />} />
            <Route path='/players' element={<ViewPlayersPage backendURL={backendURL} />} />
            <Route path='/games' element={<ViewGamesPage backendURL={backendURL} />} />
            <Route path='/stats' element={<StatsPage backendURL={backendURL} />} />
            <Route path='/all_stats' element={<ViewStatsPage backendURL={backendURL} />} />
            <Route path='/player_stats' element={<ViewPlayerStatsPage backendURL={backendURL} />} />
            <Route path='/game_stats' element={<ViewStatsByGamePage backendURL={backendURL} />} />
            <Route path='/teams' element={<ViewTeamsPage backendURL={backendURL} />} />
            <Route path='/create_player' element={<CreatePlayerPage backendURL={backendURL} />} />
            <Route path='/create_team' element={<CreateTeamPage backendURL={backendURL} />} />
            <Route path='/create_game' element={<CreateGamePage backendURL={backendURL} />} />
            <Route path='/create_stat' element={<CreateStatPage backendURL={backendURL} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
