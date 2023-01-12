import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NoteCard from "./NoteCard";
import { loadNotes } from "../../redux/features/note/noteSlice";
import ModalNote from "./ModalNote";
import ModalNoteUpdate from "./ModalNoteUpdate";
import SearchedNotesModal from "./SearchedNotesModal";
import { setSearchedNotes } from "../../redux/features/search/searchSlice";

function NoteLayout() {
  const navigation=useNavigate();
  const dispatch=useDispatch();

  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const profileID=useSelector((state)=>state.profile.id);

  const notes=useSelector((state)=>state.note.notes);

  const [searchTerm, setSearchTerm]=useState("");

  const [showCreateModal, setShowCreateModal]=useState(false);
  const [showUpdateModal, setShowUpdateModal]=useState(false);

  const theme=useSelector((state)=>state.settings.darkMode);

  const [showSearchedNotes, setShowSearchedNotes]=useState(false);

  function searchFunction(notes){
    if(searchTerm==="")
      return []
    let sA=notes.filter((note)=>{
      return note.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return sA
  }

  useEffect(()=>{
    dispatch(loadNotes(profileID))
  },[profileID])

  return (
    <div className="h-full xxsm:m-4 px-4 flex flex-col z-[-100]">
        <div className="flex justify-between items-center mt-3">
            <h2 className={`self-start font-nunito ${theme?"text-zinc-800":"text-white"} text-title xxxsm:text-4xl`}>Note</h2>
            <button onClick={()=>{
            isLoggedIn?setShowCreateModal((prev)=>!prev):navigation("/login");
            }} className="bg-blue-800 p-1.5 msm:px-3 msm:py-2 text-white text-filter msm:text-base rounded-full">+ Add Note</button>
        </div>
        <div className={`relative vsm:${isLoggedIn?"block":"hidden"} w-full mt-3 text-filter msm:text-base items-center`}>
          <input onChange={(e)=>setSearchTerm(e.target.value) } placeholder="Search for notes here" className={`rounded-md w-full px-7 xsm:px-10 py-2 ${theme?"bg-zinc-300 text-zinc-800":"bg-zinc-700 text-slate-200"} outline-none`} type={"text"}/>
          <FontAwesomeIcon onClick={()=>{
            dispatch(setSearchedNotes(searchFunction(notes)));
            setShowSearchedNotes(true);
          }} className={`absolute top-2.5 xsm:top-3 left-3 ${theme?"text-zinc-700":"text-slate-400"} hover:text-slate-100 cursor-pointer`} icon={faMagnifyingGlass}/>
        </div>
        <div className={`mt-5 mb-5 h-max rounded-md border-2 border-dashed ${theme?"border-zinc-800":"border-zinc-400"} flex justify-center xxsm:justify-start flex-wrap gap-2 p-2  ${!isLoggedIn?"justify-center items-center p-10 flex-col":""}`}>
        {!isLoggedIn?
            <>
                <FontAwesomeIcon className="text-5xl text-gray-500" icon={faSquarePlus}/>
                <div className="text-gray-500">NO NOTES YET</div>
            </>:
            <>
            {
                notes.length===0?
                <div className="flex w-full p-10 flex-col justify-center items-center self-center">
                  <FontAwesomeIcon className="text-5xl text-gray-500" icon={faSquarePlus}/>
                  <div className="text-gray-500">NO NOTES YET</div>
                </div>:(
                     notes.map((note)=><NoteCard key={note._id} color={note.color} noteContent={note.note} id={note._id} title={note.title} setShowUpdtModal={setShowUpdateModal} cdate={note.createdDate} udate={note.updatedDate}/>)
                )

            }
            </> 
        }
        </div>
        {showCreateModal?<ModalNote closeModal={setShowCreateModal}/>:""}
        {showUpdateModal?<ModalNoteUpdate closeModal={setShowUpdateModal}/>:""}
        {showSearchedNotes?<SearchedNotesModal search={"search"} updateNote={setShowUpdateModal} closeModal={setShowSearchedNotes}/>:""}
    </div>
  )
}

export default NoteLayout