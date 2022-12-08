
import './App.css';
import MyCalendar from './components/Calendar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeLayout from './components/HomeLayout';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/calendar" element={<MyCalendar/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
