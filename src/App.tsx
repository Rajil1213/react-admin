import React from 'react';
import logo from './logo.svg';
import Nav from './components/Nav'
import Menu from './components/Menu'
import './App.css';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Users from './pages/Users';

function App() {
  return (
      <div className="App">        
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <BrowserRouter>
                <Routes>                 
                  <Route path={'/'} element={<Dashboard />} />
                  <Route path={'/users'} element={<Users />} />
                </Routes>
              </BrowserRouter>
            </main>
          </div>
        </div>
      </div>
  );
}

export default App;
