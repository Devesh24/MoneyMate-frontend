import './App.css';
import Start from './pages/Start';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import { Route, Routes } from "react-router-dom"
import StatsMain from './pages/StatsMain';
import CatMain from './pages/CatMain';

function App() {
  return (
      <div className="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Main />} />
          <Route path="/stats" element={<StatsMain />} />
          <Route path="/categories" element={<CatMain />} />
        </Routes>
      </div>
  );
}

export default App;
