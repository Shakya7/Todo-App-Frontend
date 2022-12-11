
import './App.css';
import MyCalendar from './components/Calendar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeLayout from './components/home/HomeLayout';
import HomePage from './components/home/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TodoLayout from './components/todo/TodoLayout';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/calendar" element={<MyCalendar/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/todo" element={<TodoLayout/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
