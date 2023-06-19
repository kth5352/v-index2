import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import VtuberTable from './TablePage/VtuberTable';
import CompanyTable from './TablePage/CompanyTable';
import MusicTable from './TablePage/MusicTable';
import ConfigTable from './TablePage/ConfigTable';

const App = () => {



  return (
    <Router>
      <div className="container">
        <h1>V-index</h1>
        <div className="top">
          <Link to="/vtuber" title="vtuber" className="button btnFade btnBlueGreen">
            Vtuber
          </Link>
          <Link to="/company" title="company" className="button btnFade btnLightBlue">
            회사
          </Link>
          <Link to="/music" title="music" className="button btnFade btnOrange">
            음악
          </Link>
          <Link to="/config" title="config" className="button btnFade btnPurple">
            데이터 편집
          </Link>
        </div>


        <div className="bottom">
          <Routes>
            <Route path="/vtuber" element={<VtuberTable />} />
            <Route path="/company" element={<CompanyTable />} />
            <Route path="/music" element={<MusicTable />} />
            <Route path="/config" element={<ConfigTable />} />
          </Routes>
        </div>
      </div>
    </Router >
  );
};

export default App;
