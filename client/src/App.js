import './App.css';

import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import ProfileClient from './pages/ProfileClient';
import ProfileProfessional from './pages/ProfileProfessional';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:idClient" element={<ProfileClient />} />
      <Route exact path="/:idProfessional" element={<ProfileProfessional />} />
      {/* <Route exact path="/" element={<Home />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/" element={<Home />} /> */}
      
    </Routes>
  );
}

export default App;

