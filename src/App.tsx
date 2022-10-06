import './App.css';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Users from './pages/Users';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
      <div className="App">        
        <BrowserRouter>        
          <Routes>                 
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/users'} element={<Users />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
