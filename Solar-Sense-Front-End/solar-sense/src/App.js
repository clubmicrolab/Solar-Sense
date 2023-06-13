import logo from './logo.svg';
import './App.css';

import {Routes, Route, Link} from 'react-router-dom'
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/quizzes-list" element={<MainPage/>}/>
          <Route path="/register" element={<MainPage/>}/>
          <Route path="/quiz" element={<MainPage/>}/>
        </Routes>
        </div>
    </div>
  );
}

export default App;
