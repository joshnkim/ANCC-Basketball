import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ViewPlayersPage from './pages/ViewPlayersPage'
import ViewGamesPage from './pages/ViewGamesPage'
import ViewStatsPage from './pages/ViewStatsPage'
import ViewTeamsPage from './pages/ViewTeamsPage'
import './App.css'

function App() {


  return (
    <>
      <Router>
        <div className='app'>
          <Header />
          <div className='content'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/players' element={<ViewPlayersPage />} />
              <Route path='/games' element={<ViewGamesPage />} />
              <Route path='/stats' element={<ViewStatsPage />} />
              <Route path='/teams' element={<ViewTeamsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
