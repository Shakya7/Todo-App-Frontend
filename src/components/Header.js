import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import {faBars, faUser, faBell, faComment, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"


function Header() {
  return (
    <div className="bg-transparent h-14 w-full mt-2 absolute flex justify-end items-center">
      <div className="absolute top-4 left-4 md:hidden">
        <FontAwesomeIcon className="text-slate-400" icon={faBars}/>
      </div>
      <div className="xxl:basis-2/5 2xl:basis-3/5 mr-2.5 relative">
          <input placeholder="Search something here" className="rounded-md w-full px-3.5 py-2 bg-zinc-700 text-slate-200 outline-none " type={"text"}/>
          <FontAwesomeIcon className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 cursor-pointer" icon={faMagnifyingGlass}/>
      </div>
      <div className="flex gap-x-3 mr-2.5">
        <div className="rounded-full w-4 h-4 flex bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faBell}/>
        </div>
        <div className="rounded-full w-4 h-4 flex bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faComment}/>
        </div>
        <div className="rounded-full w-4 h-4 flex bg-zinc-700 justify-center items-center p-5 text-slate-400 hover:text-slate-100 cursor-pointer">
          <FontAwesomeIcon icon={faUser}/>
        </div>
      </div>
    </div>
  )
}

export default Header