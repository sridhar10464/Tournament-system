import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateTournament from './pages/CreateTournament';
import RegisterTournament from './pages/RegisterTournament';
import ScheduleTournament from './pages/ScheduleTournament';
import { EnterMatchResult, ViewMatchResult } from './pages/ViewResult';
import TournamentList from './pages/TournamentList.js';
import CreateTournament1 from './pages/CreateTournament1';
import ParticipantCRUD from './pages/Participant';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        <Header />
        <div style={{ minHeight: 'calc(100vh - 220px)' }}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/create" element={<CreateTournament1 />} />
            {/* <Route path="/create" element={<CreateTournament />} /> */}
            <Route path="/register" element={<RegisterTournament />} />
            <Route path="/schedule" element={<ScheduleTournament />} />
            <Route path="/result" element={(
              <>
                <ViewMatchResult />
                <EnterMatchResult />
              </>
            )} />
            <Route path="/tournaments-list" element={<TournamentList />} />
            
            <Route path="/participant" element={<ParticipantCRUD />} />
            
            
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;