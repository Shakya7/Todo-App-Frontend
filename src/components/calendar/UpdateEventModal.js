import { faCheck, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, deleteEvent } from "../../redux/features/calendar/eventSlice";
//import { loadEvents } from "../../redux/features/calendar/eventSlice";
import {SpinnerCircular} from "spinners-react";


function UpdateEventModal(props) {

  const title=useSelector((state)=>state.event.updateEvent.title);
  const startDate=useSelector((state)=>state.event.updateEvent.start_date);
  const startTime=useSelector((state)=>state.event.updateEvent.start_time);
  const endDate=useSelector((state)=>state.event.updateEvent.end_date);
  const endTime=useSelector((state)=>state.event.updateEvent.end_time);
  const link=useSelector((state)=>state.event.updateEvent.link);
  const eventID=useSelector((state)=>state.event.updateEvent.id);
  const isLoading=useSelector((state)=>state.event.isLoading);

  const profileID=useSelector((state)=>state.profile.id);

  const theme=useSelector((state)=>state.settings.darkMode);

  const dispatch=useDispatch();

  const [currentEventState,setCurrentEventState]=useState({
    title,
    start_date:startDate,
    end_date:endDate,
    start_time:startTime,
    end_time:endTime,
    link:link,
    eventID,
    profileID
  });

  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className={`w-4/5 lg:w-1/2 xsm:min-w-fit sm:h-auto ${theme?"bg-neutral-300":"bg-neutral-700"} rounded-md flex flex-col border border-gray-500 justify-center items-center sm:items-start p-4 relative gap-4 m-5`}>
            <FontAwesomeIcon onClick={()=>props.closeModal(false)} className="text-red-400 cursor-pointer absolute top-3 right-3" icon={faXmark}/>
            <h1 className={`text-updateTodoText xsm:text-xl ${theme?"text-zinc-800":"text-white"} font-nunito`}>Update Event</h1>
            <div className="bg-gray-500 h-px w-full"/>
            <div className="flex flex-col items-start w-full gap-2 text-filter xsm:text-base">
                <label className={`${theme?"text-zinc-800":"text-white"}`}>Title</label>
                <input defaultValue={currentEventState.title} onChange={(e)=>setCurrentEventState({
                    ...currentEventState,
                    title:e.target.value
                })} type="text" className={`${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} w-full rounded-md px-2 py-1 outline-none`}/>
            </div>
            <div className="flex w-full gap-2 text-gray-400 flex-col msm:flex-row">
                <div className="flex gap-2 flex-col xxsm:flex-row">
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className={`${theme?"text-zinc-800":"text-white"}`}>Start Date</label>
                        <input onChange={e=>{
                            setCurrentEventState({
                                ...currentEventState,
                                start_date:e.target.value
                            })
                        }} defaultValue={currentEventState.start_date} style={{colorScheme:`${theme?"bright":"dark"}`}} className={`${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} rounded-md px-1.5 py-1`} type="date"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className={`${theme?"text-zinc-800":"text-white"}`}>End Date</label>
                        <input onChange={e=>{
                            setCurrentEventState({
                                ...currentEventState,
                                end_date:e.target.value
                            })
                        }} defaultValue={currentEventState.end_date} style={{colorScheme:`${theme?"bright":"dark"}`}} className={`${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} rounded-md px-1.5 py-1`} type="date"/>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className={`${theme?"text-zinc-800":"text-white"}`}>Start Time</label>
                        <input onInput={e=>setCurrentEventState({
                            ...currentEventState,
                            start_time:e.target.value
                        }) } defaultValue={currentEventState.start_time} style={{colorScheme:`${theme?"bright":"dark"}`}} className={`${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} rounded-md w-full px-1.5 py-1`} type="time"/>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-filter xsm:text-base">
                        <label className={`${theme?"text-zinc-800":"text-white"}`}>End Time</label>
                        <input onInput={e=>setCurrentEventState({
                            ...currentEventState,
                            end_time:e.target.value
                        }) } defaultValue={currentEventState.end_time} style={{colorScheme:`${theme?"bright":"dark"}`}} className={`${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} rounded-md w-full px-1.5 py-1`} type="time"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <div className="flex w-3 xsm:w-4 h-3 xsm:h-4 justify-center items-center rounded-full bg-green-400">
                    <FontAwesomeIcon className="text-filter xsm:text-base" icon={faCheck}/>
                </div>
                <p className={`${theme?"text-zinc-600":"text-zinc-400"} text-filter xsm:text-xs`}>{currentEventState.start_date===currentEventState.end_date?`This event will take place on ${currentEventState.start_date?new Date(currentEventState.start_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} 
                from ${currentEventState.start_time?currentEventState.start_time:"00:00"} to ${currentEventState.end_time?currentEventState.end_time:"00:00"}`:`This event will take place on ${currentEventState.start_date?new Date(currentEventState.start_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} 
                from ${currentEventState.start_time?currentEventState.start_time:"00:00"} until ${currentEventState.end_date?new Date(currentEventState.end_date).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day:"numeric" }):"00-00-0000"} on ${currentEventState.end_time?currentEventState.end_time:"00:00"}`}</p>
            </div>
            <div className="flex flex-col items-start w-full gap-2 text-filter xsm:text-base">
                <label className={`${theme?"text-zinc-800":"text-white"}`}>Link for joining</label>
                <input onChange={e=>setCurrentEventState({
                    ...currentEventState,
                    link:e.target.value
                })} defaultValue={currentEventState.link} type="text" className={`w-full ${theme?"bg-zinc-400 text-zinc-800":"bg-zinc-800 text-gray-400"} rounded-md px-2 py-1 outline-none`}/>
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
            <div className="flex w-full gap-1">
                <button onClick={()=>{
                    try{
                        dispatch(updateEvent(currentEventState))
                        //dispatch(loadEvents(currentEventState.profileID));
                    }catch(err){
                        console.log(err.message);
                    }
                }} className="bg-green-600 py-1 w-full text-white rounded-md font-nunito text-filter xsm:text-base">{isLoading?<div className="flex justify-center items-center gap-2"><p>Updating</p><SpinnerCircular size={20}/></div>:"Update Event"}</button>
                <button onClick={()=>{
                    try{
                        let obj={
                            eventID:currentEventState.eventID,
                            profileID:currentEventState.profileID
                        }
                        dispatch(deleteEvent(obj));
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

export default UpdateEventModal;