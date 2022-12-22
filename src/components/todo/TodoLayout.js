import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter, faSquarePlus, faExclamationTriangle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect, useLayoutEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalTodo from "./ModalTodo";
import TodoCard from "./TodoCard";
import { fetchTodos } from "../../redux/features/todos/todoSlice";
import ModalTodoUpdate from "./ModalTodoUpdate";
import { loadInProgressTodos, loadCompletedTodos } from "../../redux/features/todos/todoSlice";
import { setAll, setInProgress, setCompleted } from "../../redux/features/filter/filterTodos";
import axios from "axios";


function TodoLayout() {
  const sortRef=useRef(null);
  const filterRef=useRef(null);

  const [selected, setSelected]=useState("all");
  const [showModal, setShowModal]=useState(false);

  const [showTodo, setShowTodo]=useState(false);

  const [dropdwnSort, setDropdwnSort]=useState(false);
  const [dropdwnFilter, setDropdwnFilter]=useState(false);

  const dispatch=useDispatch();

  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const profileID=useSelector((state)=>state.profile.id);
  const todos=useSelector((state)=>state.todo.todos);
  const filterTodos=useSelector((state)=>state.todo.filteredTodos);

  const filter=useSelector((state)=>state.filterTodo.filter);

  const closeSortMenus = (e)=>{
    if(sortRef.current && dropdwnSort && !sortRef.current.contains(e.target)){
      setDropdwnSort(false)
    }
  }
  const closeFilterMenus=(e)=>{
    if(filterRef.current && dropdwnFilter && !filterRef.current.contains(e.target)){
      setDropdwnFilter(false)
    }
  }


  useEffect(()=>{
    dispatch(setAll());
    dispatch(fetchTodos(profileID));
  },[]);

  useLayoutEffect(()=>{

  },[filterTodos])

  // useEffect(()=>{
    
  // },[filter, filterTodos, todos]);
  document.addEventListener('mousedown',closeSortMenus);
  document.addEventListener('mousedown',closeFilterMenus);

  return (
    <div className="h-full xxsm:m-4 px-4 flex flex-col">
      <div className="flex justify-between items-center mt-3">
        <h2 className="self-start font-nunito text-white text-title xxxsm:text-4xl">Todo</h2>
        <button onClick={()=>{
          setShowModal((prev)=>!prev);
        }} className="bg-blue-800 p-1.5 msm:px-3 msm:py-2 text-white text-filter msm:text-base rounded-md">+ Add Todo</button>
      </div>
      <div className="flex justify-between gap-1 xxsm:gap-0 items-start xxsm:items-center mt-3 flex-col xxsm:flex-row">
        <div className="w-auto flex justify-along items-center">
          <span onClick={()=>{
            dispatch(setAll());
            setSelected("all")
          }} className={`text-filter px-4 msm:text-base msm:px-0 msm:w-28 py-1 text-white hover:bg-orange-400 rounded-sm cursor-pointer ${selected==="all"?"bg-orange-400":""}`}>All</span>
          <span onClick={async()=>{
            dispatch(setInProgress());
            setSelected("progress");
            try{
              const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getInProgressTodos/${profileID}`)
              //console.log(filterTodos.data.filteredTodos);
              dispatch(loadInProgressTodos(filterTodos.data.filteredTodos));
            }catch(err){
              console.log(err.message);
            }
            
          }} className={`text-filter msm:text-base msm:w-28 px-1.5 msm:px-0 py-1 text-white hover:bg-purple-600 rounded-sm cursor-pointer ${selected==="progress"?"bg-purple-600":""}`}>In Progress</span>
          <span onClick={async()=>{
            dispatch(setCompleted());
            setSelected("completed");
            try{
              const filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getCompletedTodos/${profileID}`)
              //console.log(filterTodos.data.filteredTodos);
              dispatch(loadCompletedTodos(filterTodos.data.filteredTodos));
            }catch(err){
              console.log(err.message);
            }
          }} className={`text-filter msm:text-base msm:w-28 px-1.5 msm:px-0 py-1 text-white hover:bg-sky-700 rounded-sm cursor-pointer ${selected==="completed"?"bg-sky-700":""}`}>Completed</span>
        </div>
        <div className="flex gap-0.5 msm:gap-2 text-white relative">
          <button onClick={()=>{
            setDropdwnFilter(false);
            if(dropdwnSort===false)
              setDropdwnSort(true);
            else
              setDropdwnSort(false);
            }} ref={sortRef} className="text-filter msm:text-base msm:w-20 bg-zinc-600 px-2 py-1 rounded-md flex gap-1 justify-center items-center">
            <FontAwesomeIcon className="text-filter msm:text-xl" icon={faSort}/>
            Sort
          </button>
          <button onClick={()=>{
            setDropdwnSort(false);
            if(dropdwnFilter===false)
              setDropdwnFilter(true);
            else
              setDropdwnFilter(false);
            }} ref={filterRef} className="text-filter msm:text-base msm:w-20 bg-zinc-600 px-2 py-1 rounded-md flex gap-1 justify-center items-center">
            <FontAwesomeIcon icon={faFilter}/>
            Filter
          </button>
          {dropdwnSort && <div className="bg-zinc-700 absolute top-8 left-0 xsm:top-10 flex flex-col justify-center text-left rounded-sm">
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">By Date</p>
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Low to High</p>
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">High to Low</p>
          </div>}
          {dropdwnFilter && <div className="bg-zinc-700 absolute top-8 right-0 xsm:top-10 flex flex-col justify-center text-right rounded-sm">
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Low priority</p>
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">High priority</p>
             <p className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Ageing Todos</p>
          </div>}
        </div>
      </div>
      <div className="p-5 mt-3 border h-auto border-dashed">

      </div>
      <div className={`mt-5 mb-5 h-max rounded-md border-2 border-dashed  border-zinc-400 flex items-start flex-wrap gap-2 p-2  ${!isLoggedIn?"justify-center items-center p-10 flex-col":""}`}>
      {!isLoggedIn?
        <>
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faSquarePlus}/>
            <div className="text-gray-500">NO TODOS YET</div>
        </>:
        <>
        {
          todos.length===0?
          <div className="flex w-full p-10 flex-col justify-center items-center self-center">
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faSquarePlus}/>
            <div className="text-gray-500">NO TODOS YET</div>
          </div>:
          filter==="all"?
          todos.map((todo)=>{
            return <TodoCard key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
          }):
          filter==="inProgress"?(
          filterTodos.length===0?
          <div className="flex w-full p-10 flex-col justify-center items-center self-center">
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
            <div className="text-gray-500">No Todos here</div>
          </div>:
          filterTodos.map((todo)=><TodoCard key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>)):
          filter==="completed"?(
          filterTodos.length===0?
          <div className="flex w-full p-10 flex-col justify-center items-center self-center">
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
            <div className="text-gray-500">No Todos here</div>
          </div>:
          filterTodos.map((todo)=><TodoCard key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>)):
          ""
        }
        </>
      }
      </div>
      {showModal?<ModalTodo closeModal={setShowModal}/>:""}
      {showTodo?<ModalTodoUpdate closeModal={setShowTodo}/>:""}
    </div>
  )
}

export default TodoLayout