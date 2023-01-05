import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNote } from "../../redux/features/note/noteSlice";


function ModalNote(props) {
  const dispatch=useDispatch();

  const isLoading=useSelector((state)=>state.note.isLoading);
  const profileID=useSelector((state)=>state.profile.id);

  const [currentState,setCurrentState]=useState({
    title:"",
    color:"#3F3F46",
    note:"",
    profileID
  })

  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 xsm:min-w-fit h-5/6 bg-zinc-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-4 m-5">
            <FontAwesomeIcon onClick={()=>props.closeModal(false)} className="text-red-400 cursor-pointer self-end" icon={faXmark}/>
            <div className="flex flex-col items-center sm:items-start text-date xsm:text-xl">
                <label>Title</label>
                <input type="text" onChange={e=>setCurrentState({
                    ...currentState,
                    title:e.target.value
                })} className="rounded-sm py-1 px-1.5 bg-zinc-800 text-white outline-none w-full"/>
            </div>
            <div className="flex flex-col xsm:flex-row items-start justify-center items-center text-updateTodoText xsm:text-base gap-0 xsm:gap-2 w-10/12">
                <label>Colour</label>
                <input onChange={(e)=>setCurrentState({
                    ...currentState,
                    color:e.target.value
                })} className="w-full xsm:w-[30px] xsm:h-[20px]" defaultValue={"#51E1ED"} type="color" />
            </div>
            <textarea onChange={(e)=>{
                    setCurrentState({
                        ...currentState,
                        note:e.target.value
                    })
                }} style={{resize:"none"}} className="note-sec w-full h-full rounded-sm outline-none overflow-y-scroll px-1.5 bg-zinc-800 text-white text-filter xsm:text-base" placeholder="Enter the notes here"/>
            <button onClick={()=>{
                try{
                    if(currentState.title==="" || currentState.note===""){



                    
                    }else{
                        console.log(currentState);
                        dispatch(createNote(currentState));
                        if(!isLoading){
                            props.closeModal(false)
                        }
                    }
                    //dispatch(loadEvents(currentEventState.profileID));
                }catch(err){
                    console.log(err.message);
                }
            }} className="bg-sky-600 py-1 w-full text-white rounded-md font-nunito text-filter xsm:text-base">{isLoading?<div className="flex justify-center items-center gap-2"><p>Creating</p><SpinnerCircular size={20}/></div>:"Create Note"}</button>
        </div>
    </div>
  )
}

export default ModalNote