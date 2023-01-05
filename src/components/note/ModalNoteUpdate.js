import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";
import { updateNote, deleteNote } from "../../redux/features/note/noteSlice";



function ModalNoteUpdate(props) {

  const dispatch=useDispatch();

  const title=useSelector((state)=>state.note.updateNote.title);
  const cdate=useSelector((state)=>state.note.updateNote.cDate);
  const udate=useSelector((state)=>state.note.updateNote.uDate);
  const note=useSelector((state)=>state.note.updateNote.note);
  const color=useSelector((state)=>state.note.updateNote.color);
  const noteID=useSelector((state)=>state.note.updateNote.id);

  const isLoading=useSelector((state)=>state.note.isLoading);

  const profileID=useSelector((state)=>state.profile.id);


  const [currentState, setCurrentState]=useState({
    title,
    cdate,
    udate,
    note,
    color,
    noteID,
    profileID
  })

  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 xsm:min-w-fit h-5/6 bg-zinc-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-4 m-5">
            <FontAwesomeIcon onClick={()=>props.closeModal(false)} className="text-red-400 cursor-pointer self-end" icon={faXmark}/>
            <input onChange={(e)=>{
                setCurrentState({
                    ...currentState,
                    title:e.target.value
                })
            }} type="text" className="text-center sm:text-left text-date xsm:text-xl bg-transparent outline-none text-white font-nunito" defaultValue={title}/>
            <div className="text-filter xxxsm:text-xs text-gray-400 flex flex-col">
                <p>{`Updated Date: ${new Date(udate).toLocaleDateString("en-US",{year: 'numeric', month: 'short',day: 'numeric'})}`}</p>
                <p>{`Created Date: ${new Date(cdate).toLocaleDateString("en-US",{year: 'numeric', month: 'short',day: 'numeric'})}`}</p>
            </div>
            <div className="flex justify-center items-center sm:justify-start text-updateTodoText xsm:text-base gap-0 xsm:gap-2 w-10/12">
                <input onChange={(e)=>setCurrentState({
                        ...currentState,
                        color:e.target.value
                    })} className="w-3/5 xsm:w-[30px] xsm:h-[20px]" defaultValue={color} type="color" />
                </div>
            <textarea onChange={(e)=>{
                setCurrentState({
                    ...currentState,
                    note:e.target.value
                })
            }} defaultValue={note} style={{resize:"none"}} className="note-sec w-full h-full bg-transparent outline-none overflow-y-scroll text-white text-filter xsm:text-base"/>
            <div className="flex w-full gap-1">
                <button onClick={()=>{
                    try{
                        dispatch(updateNote(currentState));
                        //dispatch(loadEvents(currentEventState.profileID));
                    }catch(err){
                        console.log(err.message);
                    }
                }} className="bg-green-600 py-1 w-full text-white rounded-md font-nunito text-filter xsm:text-base">{isLoading?<div className="flex justify-center items-center gap-2"><p>Updating</p><SpinnerCircular size={20}/></div>:"Update Note"}</button>
                <button onClick={()=>{
                    try{
                        let obj={
                            noteID:currentState.noteID,
                            profileID:currentState.profileID
                        }
                        dispatch(deleteNote(obj));
                    }catch(err){
                        console.log(err.message)
                    }finally{
                        props.closeModal(false);
                    }
                }} className="py-1 px-1 bg-stone-900 rounded-md"><FontAwesomeIcon color="#B4161B" icon={faTrash}/></button>
            </div>
        </div>
    </div>
  )
}

export default ModalNoteUpdate