import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import {faBars, faUser, faBell, faComment, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import logo from "../images/logo.png";
import {faHome, faCalendarDays, faListCheck, faNoteSticky, faGear, faXmark} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../redux/features/login/loginSlice";
import {SpinnerCircular} from "spinners-react";
import { resetData } from "../redux/features/profile/profileSlice";
import { resetTodosData } from "../redux/features/todos/todoSlice";
import { resetFilterSortTodos } from "../redux/features/filter/filterTodosSlice";

function Header() {

  const dispatch=useDispatch();

  const profileDrpdwnRef=useRef(null);

  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const navigation=useNavigate();
  const [show, setShow]=useState(false);
  const [profileDrpDwn, setProfileDrpDwn]=useState(false);

  const isLoading=useSelector((state)=>state.login.isLoading);

  const closeProfileMenus = (e)=>{
    if(profileDrpdwnRef.current && profileDrpDwn && !profileDrpdwnRef.current.contains(e.target)){
      setProfileDrpDwn(false);
    }
  }
  document.addEventListener('mousedown',closeProfileMenus);
  return (
    <div className="bg-zinc-900 opacity-100 h-14 w-full sticky top-0 left-0 flex justify-end items-center z-10">

      {/*TAB, MOBILE SIDEBAR COMPONENT*/}
      <div className={`absolute transition-all duration-500 ease-in-out z-10 top-0 ${show?"left-0":"left-[-100vw]"} w-3/6 xxsm:w-2/6 h-screen bg-zinc-800  md:hidden`}>
          <FontAwesomeIcon onClick={()=>setShow(false)} className="text-xl absolute top-4 left-4 text-slate-400" icon={faXmark}/>
          <div className="mt-14 h-full">
            <div className="flex flex-col items-start text-filter vsm:text-base">
              <div className="h-1/6 gap-x-3 flex justify-start xxsm:justify-center items-center px-4">
                <img className="w-1/6 vsm:w-10" src={logo} alt="logo"/>
                <span className="font-fascinate text-gray-200 text-addTask vsm:text-xl">TraceBit</span>
              </div>
              <div onClick={()=>{
                setShow(false);
                navigation("/");
                }} className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12">
                  <FontAwesomeIcon className="text-filter vsm:text-xl" icon={faHome}/>
                </div>
                <p>Dashboard</p>
              </div>
              <div onClick={()=>{
                setShow(false);
                if(isLoggedIn)
                  navigation("/profile");
                else  
                  navigation("/login");
                }} className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12"><FontAwesomeIcon className="text-filter vsm:text-xl" icon={faUser}/></div>
                <p>Profile</p>
              </div>
              <div onClick={()=>{
                setShow(false);
                navigation("/todo")}} className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12"><FontAwesomeIcon className="text-filter vsm:text-xl" icon={faListCheck}/></div>
                <p>Todo List</p>
              </div>
              <div onClick={()=>{
                setShow(false);
                navigation("/calendar")}} className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12"><FontAwesomeIcon className="text-filter vsm:text-xl" icon={faCalendarDays}/></div>
                <p>Calendar</p>
              </div>
              <div onClick={()=>{
                setShow(false);
                navigation("/note")}} className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12"><FontAwesomeIcon className="text-filter vsm:text-xl" icon={faNoteSticky}/></div>
                <p>Notes</p>
              </div>
              <div className="flex gap-x-3 w-full justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
                <div className="vsm:w-12"><FontAwesomeIcon className="text-filter vsm:text-xl" icon={faGear}/></div>
                <p>Settings</p>
              </div>
          </div>
        </div>
      </div>
      {!show && <div onClick={()=>setShow(true)} className="absolute top-4 z-100 left-4 md:hidden">
        <FontAwesomeIcon className="text-slate-400" icon={faBars}/>
      </div>}
      
      <div className="hidden relative vsm:block xxl:basis-2/5 2xl:basis-3/5 mr-2.5">
          <input placeholder="Search something here" className="rounded-md w-full px-3.5 py-2 bg-zinc-700 text-slate-200 outline-none " type={"text"}/>
          <FontAwesomeIcon className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 cursor-pointer" icon={faMagnifyingGlass}/>
      </div>
      <div className="flex gap-x-3 mr-2.5">
        <div className="hidden vsm:flex rounded-full w-4 h-4 bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faBell}/>
        </div>
        <div className="hidden vsm:flex rounded-full w-4 h-4 bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faComment}/>
        </div>
        {isLoggedIn?<div onClick={()=>setProfileDrpDwn(true)} className="rounded-full w-4 h-4 flex bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer relative">
          <FontAwesomeIcon icon={faUser}/>
        </div>:<div onClick={()=>navigation("/login")} className="hidden vsm:flex rounded-md auto h-4 bg-stone-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">Login</div>}
      </div>
      {profileDrpDwn &&
        <div ref={profileDrpdwnRef} className="absolute bg-zinc-700 border text-white border-zinc-900 top-14 right-1 flex flex-col justify-center text-right rounded-sm text-filter msm:text-base">
          <p onClick={()=>{
            navigation("/profile");
            setProfileDrpDwn(false);
            }} className="px-4 py-2 cursor-pointer hover:bg-zinc-800 justify-end">Profile</p>
          <p onClick={()=>{
            setProfileDrpDwn(false);
            }} className="px-4 py-2 cursor-pointer hover:bg-zinc-800 justify-end">Settings</p>
          <p onClick={()=>{
            dispatch(logout());
            dispatch(resetData());
            dispatch(resetTodosData());
            dispatch(resetFilterSortTodos());
            setProfileDrpDwn(false);
            navigation("/");
            }} className="px-4 py-2 cursor-pointer hover:bg-zinc-800 text-red-500 flex justify-end">{isLoading?<SpinnerCircular size={20}/>:"Logout"}</p>
        </div>
      }
    </div>
  )
}

export default Header