import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import {faBars, faUser, faBell, faComment, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Header() {
  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const navigation=useNavigate();
  return (
    <div className="bg-zinc-900 opacity-100 h-14 w-full mt-2 sticky top-0 left-0 flex justify-end items-center z-10">
      <div className="absolute top-4 left-4 md:hidden">
        <FontAwesomeIcon className="text-slate-400" icon={faBars}/>
      </div>
      <div className="hidden vsm:block xxl:basis-2/5 2xl:basis-3/5 mr-2.5 relative">
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
        {isLoggedIn?<div className="rounded-full w-4 h-4 flex bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faUser}/>
        </div>:<div onClick={()=>navigation("/login")} className="hidden vsm:flex rounded-md auto h-4 bg-stone-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">Login</div>}
      </div>
    </div>
  )
}

export default Header