import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ViewPlayersPage from './pages/ViewPlayersPage'
import ViewGamesPage from './pages/ViewGamesPage'
import ViewStatsPage from './pages/ViewStatsPage'
import ViewTeamsPage from './pages/ViewTeamsPage'
import './App.css'


const backendPort = 3000;
const backendURL = `http://localhost:${backendPort}`;
//const backendURL = `http://18.117.218.170:${backendPort}`;
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
            <Route path='/stats' element={<ViewStatsPage backendURL={backendURL} />} />
            <Route path='/teams' element={<ViewTeamsPage backendURL={backendURL} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
