import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import NoteCard from "./NoteCard";

function SearchedNotesModal(props) {

    const searchedNotes=useSelector((state)=>state.search.notes);
    const theme=useSelector((state)=>state.settings.darkMode);
  
  
    return (
      <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className={`w-11/12 h-full ${theme?"bg-neutral-300":"bg-zinc-700"} border border-gray-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5`}>
          <div className="flex justify-between items-center w-full">
            <p className={`${!theme?"text-white":"text-zinc-800"} self-start text-updateTodoText xxxsm:text-base`}>Searched Notes</p>
            <div onClick={e=>props.closeModal(false)} className={`self-end cursor-pointer text-updateTodoText xxsm:text-2xl ${!theme?"text-white":"text-zinc-800"}`}>X</div>
          </div>
          <div className={`${!theme?"text-white":"text-zinc-800"} self-start text-updateTodoText xxxsm:text-base`}>{`Results : ${searchedNotes.length}`}</div>
          <div className={`mt-2 mb-2 max-h-full rounded-md border-2 border-dashed ${theme?"border-zinc-800":"border-zinc-400"} overflow-y-scroll overflow-x-hidden flex flex-wrap p-2 gap-2 w-full`}>
          
            {
              searchedNotes.length?
              searchedNotes.map((note)=><NoteCard key={note._id} color={note.color} noteContent={note.note} id={note._id} title={note.title} closeSearchModal={props.closeModal} setShowUpdtModal={props.setShowUpdateModal} cdate={note.createdDate} udate={note.updatedDate}/>):
              <div className="flex w-full p-10 flex-col justify-center items-center self-center">
                <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
                <div className="text-gray-500">No Notes here</div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
  
  export default SearchedNotesModal