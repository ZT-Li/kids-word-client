import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, ProblemListPage } from './Pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path='/problems' element={<ProblemListPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
