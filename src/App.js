
import './App.css';
import MyCalendar from './components/calendar/Calendar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeLayout from './components/home/HomeLayout';
import HomePage from './components/home/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TodoLayout from './components/todo/TodoLayout';
import NoteLayout from './components/note/NoteLayout';
import Settings from './components/Settings';
import _500ServerError from './components/error-UI/_500ServerError';
import PageNotFound from './components/error-UI/PageNotFound';
import ForgotpassPage from './components/ForgotpassPage';
import { ResetPass } from './components/ResetPassword';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/calendar" element={<MyCalendar/>}/>
          <Route path="/note" element={<NoteLayout/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/todo" element={<TodoLayout/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotpass" element={<ForgotpassPage/>}/>
        <Route path="/resetPassword/:token" element={<ResetPass/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<_500ServerError/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
