import { faCheck, faXmark, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents, createEvent} from "../../redux/features/calendar/eventSlice";
import {SpinnerCircular} from "spinners-react";


function CreateEventModal(props) {

  const dispatch=useDispatch();

  const profileID=useSelector((state)=>state.profile.id);
  const isLoading=useSelector((state)=>state.event.isLoading);
  

  const [currentState,setCurrentState]=useState({
    title:"",
    start_date:"",
    end_date:"",
    start_time:"",
    end_time:"",
    link:"",
    profileID
  })
  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 xsm:min-w-fit sm:h-auto bg-neutral-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-4 m-5">
            <FontAwesomeIcon onClick={()=>props.closeModal(false)} className="text-red-400 cursor-pointer absolute top-3 right-3" icon={faXmark}/>
            <h1 className="text-updateTodoText xsm:text-xl text-white font-nunito">Create Event</h1>
            <div className="bg-gray-500 h-px w-full"/>
            <div className="flex flex-col items-start w-full gap-2 text-filter xsm:text-base">
                <label className="text-white">Title</label>
                <input type="text" onChange={(e)=>{
                    setCurrentState({
                        ...currentState,
                        title:e.target.value
                    })
                }} className="text-gray-400 w-full bg-zinc-800 rounded-md px-2 py-1 outline-none"/>
            </div>
            <div className="flex w-full gap-2 text-gray-400 flex-col msm:flex-row">
                <div className="flex gap-2 flex-col xxsm:flex-row">
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className="text-white">Start Date</label>
                        <input onChange={(e)=>{
                            console.log(e.target.value);
                            setCurrentState({
                                ...currentState,
                                start_date:e.target.value
                            })
                            }} style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md px-1.5 py-1" type="date"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className="text-white">End Date</label>
                        <input onChange={(e)=>{
                            
                            setCurrentState({
                                ...currentState,
                                end_date:e.target.value
                            });
                        }} 
                        style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md px-1.5 py-1" type="date"/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className="text-white">Start Time</label>
                        <input onInput={e=>{
                            //console.log(e.target.value)
                            setCurrentState({
                                ...currentState,
                                start_time:e.target.value
                            })
                        }} style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md w-full px-1.5 py-1" type="time"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className="text-white">End Time</label>
                        <input onInput={e=>{
                            console.log(e.target.value)
                            setCurrentState({
                                ...currentState,
                                end_time:e.target.value
                            })
                        }} style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md w-full px-1.5 py-1" type="time"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <div className="flex w-3 xsm:w-4 h-3 xsm:h-4 justify-center items-center rounded-full bg-green-400">
                    <FontAwesomeIcon className="text-filter xsm:text-base" icon={faCheck}/>
                </div>
                <p className="text-zinc-400 text-filter xsm:text-xs">{currentState.start_date===currentState.end_date?`This event will take place on ${currentState.start_date?new Date(currentState.start_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} 
                from ${currentState.start_time?currentState.start_time:"00:00"} to ${currentState.end_time?currentState.end_time:"00:00"}`:`This event will take place on ${currentState.start_date?new Date(currentState.start_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} 
                from ${currentState.start_time?currentState.start_time:"00:00"} until ${currentState.end_date?new Date(currentState.end_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} on ${currentState.end_time?currentState.end_time:"00:00"}`}</p>
            </div>
            <div className="flex flex-col items-start w-full gap-2 text-filter xsm:text-base">
                <label className="text-white">Link for joining</label>
                <input onChange={e=>{
                    setCurrentState({
                        ...currentState,
                        link:e.target.value
                    })
                }} type="text" className="text-gray-400 w-full bg-zinc-800 rounded-md px-2 py-1 outline-none"/>
            </div>
            <div className="w-full border border-t-zinc-400 border-dashed"/>
            {/* <div className="flex flex-col items-start gap-2 w-full">
                <label>Upload attachments</label>
                <div className="bg-zinc-900 border border-dashed border-zinc-500 w-full h-20 p-2">
                    <div className="flex items-center gap-5">
                        <button className="bg-neutral-700 px-1.5 py-1 text-nunito text-white rounded-md border border-zinc-400">Select</button>
                        <div className="flex items-center text-zinc-500 gap-1">
                            <FontAwesomeIcon icon={faCloudArrowUp}/>
                            <p>Drop files here...</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <button onClick={()=>{
                console.log(currentState);
                if(currentState.title==="" || currentState.start_date==="" || currentState.end_date==="" || currentState.start_time==="" || currentState.end_time==="" || currentState.link===""){



                    
                }else{
                    dispatch(createEvent(currentState));
                    if(!isLoading){
                        props.closeModal(false)
                    }
                }
            }} className="bg-sky-600 py-1 w-full text-white rounded-md font-nunito text-filter xsm:text-base">{isLoading?<div className="flex justify-center items-center gap-2"><p>Creating</p><SpinnerCircular size={20}/></div>:"Create Event"}</button>
        </div>
    </div>
  )
}

export default CreateEventModal;