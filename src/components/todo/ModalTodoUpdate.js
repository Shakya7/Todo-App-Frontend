import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { fetchTodos, deleteTodo } from "../../redux/features/todos/todoSlice";
import { loadDataIntoRedux, updateTitleAndPriority, addTasks } from "../../redux/features/updateTodos/updateTodoSlice";
import {SpinnerCircular} from "spinners-react";
import {v4 as uuid} from "uuid";
import { setInProgress, setCompleted } from "../../redux/features/filter/filterTodosSlice";
import { loadInProgressTodos, loadCompletedTodos } from "../../redux/features/todos/todoSlice";
import {useNavigate} from "react-router-dom";

function ModalTodoUpdate(props) {

  const dispatch=useDispatch();
  const navigation=useNavigate();

  const title=useSelector((state)=>state.updateTodo.title);
  const todoID=useSelector((state)=>state.updateTodo.id);
  const priority=useSelector((state)=>state.updateTodo.priority);
  const tasks=useSelector((state)=>state.updateTodo.tasks);
  const profileID=useSelector((state)=>state.profile.id);
  const todos=useSelector((state)=>state.todo.todos);

  const theme=useSelector((state)=>state.settings.darkMode);

  const filter=useSelector((state)=>state.filterTodo.filter);

  const [error,setError]=useState("");

  //loading state
  const [deleteloading, setDeleteLoading]=useState({
    state:false,
    id:""
  });
  const [saveloading, setSaveLoading]=useState({
    state:false,
    id:""
  });

  const [updateLoading, setUpdateLoading]=useState(false);
  const [isCreatingNewTask, setIsCreatingNewTask]=useState(false);

  //Todo state
  const [pr, setPr]= useState(priority);
  const [updateTitle,setUpdateTitle]=useState(title);

  //Task state
  const [taskTitle, setTaskTitle]=useState("");
  const [addTask, setAddTask]=useState(false);
  const [newTaskTitle,setNewTaskTitle]=useState("");


  async function updateTodo(currTitleTodo, currPriority, todoID){
    const obj={
      title:"",
      priority:"",
    };
    if(updateTitle.trim()===currTitleTodo && pr===currPriority){
      setUpdateLoading(false);
      return
    }
    else{
      try{
        const todo=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/updateTodo/${todoID}`,{
          title:updateTitle,
          priority:pr,
          updatedDate:new Date(Date.now())
        });

        dispatch(fetchTodos(profileID));
        obj.title=todo.data.todo.title;
        obj.priority=todo.data.todo.priority;
        dispatch(updateTitleAndPriority(obj));
      }catch(err){
        console.log(err.message);
      }finally{
        navigation("/")
        setUpdateLoading(false);
      }
    }
  }


  async function updateTaskTitle(currentVal, todoID, taskID){
    const obj={
      id:"",
      title:"",
      priority:"",
      tasks:[]
    };
    if(taskTitle===""){
      setSaveLoading({
        state:false,
        id:""
      })
      return;
    }
    else if(taskTitle.trim()===currentVal){
      setSaveLoading({
        state:false,
        id:""
      })
      return;
    }
    else{
      try{
        const todo=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/updateTask/${todoID}`,{
          taskID,
          newTitle:taskTitle
        })
        dispatch(fetchTodos(profileID));
        obj.id=todo.data.todo._id;
        obj.title=todo.data.todo.title;
        obj.priority=todo.data.todo.priority;
        obj.tasks=todo.data.todo.tasks;
        dispatch(loadDataIntoRedux(obj));
        setSaveLoading({
          state:false,
          id:""
        })
      }catch(err){
        console.log(err.message);
      }
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

  async function createTask(todoID){
    try{
      const todo=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/createTask/${todoID}`,{
        title:newTaskTitle,
        inProgress:true,
        id:uuid()
      })
      //console.log(todo.data.todo)
      dispatch(fetchTodos(profileID));
      dispatch(addTasks(todo.data.todo));
      if(filter==="inProgress"){
        const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getInProgressTodos/${profileID}`);
        //console.log(filterTodos.data.filteredTodos);
        dispatch(setInProgress());
        dispatch(loadInProgressTodos(filterTodos.data.filteredTodos));
      }
      else if(filter==="completed"){
        const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getCompletedTodos/${profileID}`);
        dispatch(setCompleted());
        dispatch(loadCompletedTodos(filterTodos.data.filteredTodos));
      }
    }catch(err){
      console.log(err.message);
    }finally{
      setIsCreatingNewTask(false);
      setAddTask(false);
    }
  }

  async function updateTaskCheckbox(todoID, uuid){
    const obj={
      id:"",
      title:"",
      priority:"",
      tasks:[]
    };
    try{
      const todo=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/updateTaskCheckbox/${todoID}`,{
        taskID:uuid
      })

      obj.id=todo.data.todo._id;
      obj.title=todo.data.todo.title;
      obj.priority=todo.data.todo.priority;
      obj.tasks=todo.data.todo.tasks;
      dispatch(fetchTodos(profileID));
      dispatch(loadDataIntoRedux(obj));
      if(filter==="inProgress"){
        const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getInProgressTodos/${profileID}`);
        //console.log(filterTodos.data.filteredTodos);
        dispatch(setInProgress());
        dispatch(loadInProgressTodos(filterTodos.data.filteredTodos));
      }
      else if(filter==="completed"){
        const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getCompletedTodos/${profileID}`);
        dispatch(setCompleted());
        dispatch(loadCompletedTodos(filterTodos.data.filteredTodos));
      }
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
   
  },[tasks, title, priority, todos])


  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className={`w-4/5 lg:w-1/2 sm:h-auto ${!theme?"bg-neutral-700":"bg-neutral-300"} border border-gray-500 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5`}>
            <div onClick={()=>props.closeModal(false)} className={`self-end cursor-pointer text-updateTodoText xxsm:text-2xl ${!theme?"text-white":"text-zinc-800"}`}>X</div>
            <div className="flex flex-col items-center sm:items-start font-nunito text-2xl">
                <h1 className={`${theme?"text-zinc-800":"text-white"} text-todoTitle xsm:text-4xl`}>Todo title</h1>
                <input className={`${theme?"bg-zinc-600 text-white":"bg-white text-zinc-800"} rounded-sm w-full text-date  xsm:text-xl px-1`} defaultValue={updateTitle} onChange={(e)=>setUpdateTitle(e.target.value)} type="text"/>
            </div>
            <div className="flex flex-col gap-1 text-filter xsm:text-base sm:flex-row sm:gap-5">
              <label className={`${!theme?"text-slate-300":"text-zinc-800"}`} htmlFor="priority">Priority :</label>
              <select defaultValue={pr} onChange={(e)=>{
                setPr(e.target.value);
              }} className={`${!theme?"bg-neutral-300":"bg-neutral-400"} rounded-sm px-5`} name="priority" id="priority">
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="w-full bg-zinc-900 h-px"></div>
            <div className="flex flex-col items-start">
              <div className="w-full flex justify-between mb-3 flex-col xxxsm:flex-row xxxsm:gap-5 text-updateTodoText xxxsm:text-base">
                <p className={`text-date xsm:text-xl  ${theme?"text-zinc-800":"text-white"}`}>Tasks</p>
                <button onClick={()=>setAddTask(true)} className="bg-blue-800 px-2 py-0 text-white text-addTask xxsm:text-sm rounded-md">+Add task</button>
              </div>
              {addTask?<div className="flex justify-center items-baseline gap-3">
                <input className="w-full mb-4" onChange={(e)=>{
                  setNewTaskTitle(e.target.value);
                }} type={"text"}/>
                <div className="flex gap-3">
                  {isCreatingNewTask?<SpinnerCircular size={13}/>:<FontAwesomeIcon onClick={()=>{
                    setIsCreatingNewTask(true);
                    createTask(todoID)
                    }} className="text-green-400 cursor-pointer" icon={faCheck}/>}
                  <FontAwesomeIcon onClick={()=>setAddTask(false)} className="text-red-400 cursor-pointer" icon={faXmark}/>
                </div>
              </div>:""}
            
              {
                tasks.map((task)=>{
                  return <div key={task._id} className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center flex-col xxxsm:flex-row">
                      <div className="flex jutify-center items-center gap-2">
                        <input className="" onChange={()=>updateTaskCheckbox(todoID,task.id)} checked={task.inProgress?false:true} type={"checkbox"}/>
                        <input className={`bg-transparent text-updateTodoText xxsm:text-base ${!theme?"text-slate-300":"text-stone-600"} outline-none w-full mr-2`} type={"text"} onChange={(e)=>{
                        setTaskTitle(e.target.value);
                        }} defaultValue={task.title}/>
                      </div>
                      <div className="flex gap-5 mt-1 xxxsm:mt-0">
                        {saveloading.state && saveloading.id===task._id?<SpinnerCircular size={13}/>:<FontAwesomeIcon onClick={()=>{
                          setSaveLoading({
                            state:true,
                            id:task._id
                          })
                          updateTaskTitle(task.title, todoID,task.id);
                          }} className={`${!theme?"text-green-400":"text-green-600"} cursor-pointer text-updateTodoText xxsm:text-base`} icon={faCheck}/>}
                        {deleteloading.state && deleteloading.id===task._id?<SpinnerCircular size={13}/>:<FontAwesomeIcon onClick={()=>{
                          setDeleteLoading({
                            state:true,
                            id:task._id
                          });
                          deleteTask(todoID,task._id);
                        }} className="text-red-400 cursor-pointer text-updateTodoText xxsm:text-base" icon={faTrash}/>}
                      </div>
                    </div>
                  
                  </div>
                })
              }  
            </div>
            <p className={`text-filter xxsm:text-base ${theme?"text-red-600":"text-red-400"}`}>{error}</p>
            {updateLoading?<SpinnerCircular size={20} className="self-end"/>:
            <div className="flex gap-1 self-end">
              <button onClick={()=>{
                if(updateTitle===""){
                  setError("Please enter a title");
                  console.log("Hello")
                  return;
                }
                setUpdateLoading(true);
                updateTodo(title,priority,todoID);
                //navigation("/")
              }} className="bg-yellow-400 cursor-pointer text-filter msm:text-base font-nunito py-1 rounded-md px-2">
                Update
              </button>
              <button onClick={()=>{
                    try{
                        let obj={
                            todoID:todoID,
                            profileID:profileID
                        }
                        dispatch(deleteTodo(obj));
                    }catch(err){
                        console.log(err.message)
                    }finally{
                        props.closeModal(false);
                    }
                }} className="py-1 px-1 bg-stone-900 rounded-md"><FontAwesomeIcon color="#B4161B" icon={faTrash}/></button>
            </div>
            }
        </div>
    </div>
  )
}

export default ModalTodoUpdate