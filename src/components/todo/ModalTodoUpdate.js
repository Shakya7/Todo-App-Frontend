import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { fetchTodos } from "../../redux/features/todos/todoSlice";
import { loadDataIntoRedux } from "../../redux/features/updateTodos/updateTodoSlice";
import {SpinnerCircular} from "spinners-react";

function ModalTodoUpdate(props) {

  const dispatch=useDispatch();

  const title=useSelector((state)=>state.updateTodo.title);
  const todoID=useSelector((state)=>state.updateTodo.id);
  const priority=useSelector((state)=>state.updateTodo.priority);
  const tasks=useSelector((state)=>state.updateTodo.tasks);
  const profileID=useSelector((state)=>state.profile.id);

  //loading state
  const [deleteloading, setDeleteLoading]=useState({
    state:false,
    id:""
  });
  const [saveloading, setSaveLoading]=useState(false);

  //Todo state
  const [pr, setPr]= useState(priority);
  const [updateTitle,setUpdateTitle]=useState(title);

  //Task state
  const [taskTitle, setTaskTitle]=useState("");
  const [addTask, setAddTask]=useState(false);

  function updateTaskTitle(currentVal){
    if(taskTitle===""){
      return;
    }
    else if(taskTitle.trim()===currentVal){
      return;
    }
    else{
      console.log("Okay now we can run updateDB operation");
    }
  }

  async function deleteTask(todoID, taskID){
    const obj={
      id:"",
      title:"",
      priority:"",
      tasks:[]
    };
    try{
      const todo=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/deleteTask/${todoID}`,{
        taskID
      });
      console.log(todo.data.todo);
      dispatch(fetchTodos(profileID));
      obj.id=todo.data.todo._id;
      obj.title=todo.data.todo.title;
      obj.priority=todo.data.todo.priority;
      obj.tasks=todo.data.todo.tasks;
      dispatch(loadDataIntoRedux(obj))
      setDeleteLoading({
        state:false,
        id:""
      });
      
    }catch(err){
      console.log(err.message);
    }
    
  }

  useEffect(()=>{

  },[tasks])

 


  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-5 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 sm:h-auto bg-slate-600 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5">
            <div onClick={()=>props.closeModal(false)} className="self-end cursor-pointer text-2xl">X</div>
            <div className="flex flex-col items-center sm:items-start font-nunito text-2xl">
                <h1 className="text-gray-900">Todo title</h1>
                <input className="rounded-sm w-full" defaultValue={updateTitle} type="text"/>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
              <label htmlFor="priority">Priority :</label>
              <select defaultValue={pr} onChange={(e)=>{
                setPr(e.target.value);
              }} className="rounded-sm px-5" name="priority" id="priority">
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="w-full bg-zinc-900 h-px"></div>
            <div className="flex flex-col items-start">
              <div className=" w-full flex justify-between mb-3 flex-col xxxsm:flex-row xxxsm:gap-5">
                <p className="text-xl text-gray-900">Tasks</p>
                <button onClick={()=>setAddTask(true)} className="bg-blue-800 px-2 py-0 text-white rounded-md">+Add task</button>
              </div>
              {addTask?<div className="flex justify-center items-center gap-3">
                <input className="w-full mb-4" type={"text"}/>
                <div className="flex gap-3">
                  <FontAwesomeIcon className="text-green-400 cursor-pointer" icon={faCheck}/>
                  <FontAwesomeIcon onClick={()=>setAddTask(false)} className="text-red-400 cursor-pointer" icon={faXmark}/>
                </div>
              </div>:""}
            
              {
                tasks.map((task)=>{
                  return <div key={task._id} className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center flex-col xxxsm:flex-row">
                      <div className="flex jutify-center items-center gap-2">
                        <input type={"checkbox"}/>
                        <input className="bg-transparent  w-full" type={"text"} onChange={(e)=>{
                        setTaskTitle(e.target.value);
                      }} defaultValue={task.title}/>
                      </div>
                      <div className="flex gap-5 mt-1 xxxsm:mt-0">
                        {!saveloading?<FontAwesomeIcon onClick={()=>updateTaskTitle(task.title)} className="text-green-400 cursor-pointer" icon={faCheck}/>:<SpinnerCircular size={13}/>}
                        {deleteloading.state && deleteloading.id===task._id?<SpinnerCircular size={13}/>:<FontAwesomeIcon onClick={()=>{
                          setDeleteLoading({
                            state:true,
                            id:task._id
                          });
                          deleteTask(todoID,task._id);
                        }} className="text-red-400 cursor-pointer" icon={faTrash}/>}
                      </div>
                    </div>
                  
                  </div>
                })
              }  
            </div>
            <button className="self-end bg-yellow-400 cursor-pointer font-nunito py-1 rounded-md px-2">
              Update
            </button>
        </div>
    </div>
  )
}

export default ModalTodoUpdate