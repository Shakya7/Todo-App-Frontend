import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import {v4 as uuid} from "uuid";
import {useSelector,useDispatch} from "react-redux";
import { fetchTodos } from '../../redux/features/todos/todoSlice';
import {SpinnerCircular} from "spinners-react";

function ModalTodo(props) {

  const profileID=useSelector((state)=>state.profile.id);
  const isFetchingTodos=useSelector((state)=>state.todo.isFetchingTodos);
  const dispatch=useDispatch();

  const [title,setTitle]=useState("");

  const [priority, setPriority]=useState("High");

  const [taskSaveMode, setTaskSaveMode]=useState(false);

  const [task, setTask]=useState({
    title:"",
    inProgress:true,
    id:""
  });

  const [tasks,setTasks]=useState([]);

  const [isFetching, setIsFetching]=useState(false);

  const changePriority=(e)=>{
    console.log(e.target.value);
    setPriority(e.target.value);
  }

  useEffect(()=>{
    
  },[tasks,title, isFetching])
  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-5 flex justify-center items-center'>
      <div className="w-4/5 lg:w-1/2 sm:h-auto bg-slate-500 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5">
        <div onClick={e=>props.closeModal(false)} className="self-end	cursor-pointer text-2xl">X</div>
        <div className="flex flex-col items-center sm:items-start font-nunito text-2xl">
          <h1>Todo title</h1>
          <input onChange={e=>setTitle(e.target.value)} className="rounded-sm w-full" type="text"/>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
          <label htmlFor="priority">Priority :</label>
          <select onChange={changePriority} className="rounded-sm px-5" name="priority" id="priority">
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex gap-2 justify-center items-center flex-col sm:flex-row sm:items-baseline">
          {!taskSaveMode?
          <button onClick={(e)=>setTaskSaveMode(true)} className="bg-blue-800 mt-4 px-2 py-1 text-white rounded-md">+ Add Tasks</button>:
          <button onClick={async(e)=>{
              if(task.title.trim()===""){
                return
              }
              else{
                setTaskSaveMode(false);
                console.log(task);
                setTasks([...tasks,task]);
                setTask({
                  title:"",
                  inProgress:true,
                  id:""
                })
              }
          }} className="bg-green-800 mt-4 px-3 py-1 text-white rounded-md">✓ Save Task</button>}
          {taskSaveMode?<div className="relative"><input className="rounded-sm py-1 px-3 w-full sm:w-auto" onChange={(e)=>{
            setTask({...task,title:e.target.value, id:uuid()})
            }} type="text"/><div onClick={()=>setTaskSaveMode(false)} className="absolute right-1 top-1 cursor-pointer">X</div></div>:""}
        </div>
        <div className={`mb-5 h-8em rounded-md border-2 border-dashed border-zinc-400 w-full overflow-y-scroll`}>
        {
          tasks.length!==0?
          tasks.map((t)=><div className="bg-zinc-600 mb-2" key={t.id}>{t.title}</div>):""
        }
        </div>
        <button onClick={async()=>{
          setIsFetching(true);
          console.log(tasks);
          console.log(priority);
          try{
            const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/createTodo`,{
              title,
              createDate:new Date(Date.now()),
              updatedDate:new Date(Date.now()),
              tasks,
              userID:profileID,
              priority
            });
            console.log(data.data);
            dispatch(fetchTodos(profileID));
            setIsFetching(false);
            if(!isFetchingTodos)
              props.closeModal(false);
          }catch(err){
            console.log(err.message);
            setIsFetching(false);
          }
        }} className="self-end bg-green-400 cursor-pointer font-nunito py-1 rounded-md px-2">{isFetching?<SpinnerCircular size={25}/>:"Create"}</button>
      </div>
    </div>
  )
}

export default ModalTodo