import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import VtuberTable from './TablePage/VtuberTable';
import CompanyTable from './TablePage/CompanyTable';
import MusicTable from './TablePage/MusicTable';



const App = () => {
  return (
    <Router>
      <div>
        <h1>V-index</h1>
        <div class="container">
          <Link to="/vtuber" title="vtuber" class="button btnFade btnBlueGreen">Vtuber</Link>
          <Link to="/company" title="company" class="button btnFade btnLightBlue">Company</Link>
          <Link to="/music" title="music" class="button btnFade btnOrange">Music</Link>

          <div class="clear"></div>
        </div>

        <div>
          <Routes>
            <Route path="/vtuber" element={<VtuberTable />} />
            <Route path="/company" element={<CompanyTable />} />
            <Route path="/music" element={<MusicTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
