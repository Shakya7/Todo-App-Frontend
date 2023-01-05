import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import {faHome, faCalendarDays, faListCheck, faNoteSticky, faGear, faUser} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const navigation=useNavigate();
  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  return (
    <>
      <div className="hidden md:block max-h-full basis-1/5 bg-zinc-800">
        <div className="h-1/6 flex justify-center items-center">
          <img className="w-14" src={logo} alt="logo"/>
          <span className="font-fascinate text-gray-200 md:text-xl lg:text-3xl">TraceBit</span>
        </div>
        <div className="flex flex-col">
          <div onClick={()=>navigation("/")} className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12">
              <FontAwesomeIcon className="text-xl" icon={faHome}/>
            </div>
            <p>Dashboard</p>
          </div>
          <div onClick={()=>isLoggedIn?navigation("/profile"):navigation("/login")} className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12"><FontAwesomeIcon className="text-xl" icon={faUser}/></div>
            <p>Profile</p>
          </div>
          <div onClick={()=>navigation("/todo")} className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12"><FontAwesomeIcon className="text-xl" icon={faListCheck}/></div>
            <p>Todo List</p>
          </div>
          <div onClick={()=>navigation("/calendar")} className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12"><FontAwesomeIcon className="text-xl" icon={faCalendarDays}/></div>
            <p>Calendar</p>
          </div>
          <div onClick={()=>navigation("/note")} className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12"><FontAwesomeIcon className="text-xl" icon={faNoteSticky}/></div>
            <p>Notes</p>
          </div>
          <div className="flex gap-x-3 justify-start items-center p-4 ease-in-out duration-500 cursor-pointer text-gray-400 2xl:p-5 hover:bg-stone-900 hover:text-slate-100">
            <div className="w-12"><FontAwesomeIcon className="text-xl" icon={faGear}/></div>
            <p>Settings</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Sidebar