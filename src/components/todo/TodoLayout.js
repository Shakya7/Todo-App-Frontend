import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter, faSquarePlus, faExclamationCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect, useLayoutEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalTodo from "./ModalTodo";
import TodoCard from "./TodoCard";
import { fetchTodos } from "../../redux/features/todos/todoSlice";
import ModalTodoUpdate from "./ModalTodoUpdate";
import { loadInProgressTodos, loadCompletedTodos } from "../../redux/features/todos/todoSlice";
import { setAll, setInProgress, setCompleted, filterTodosOnLowPr, filterTodosOnHighPr, filterTodosOn5Ageing, resetFilter, sortByUpdatedDateOldest, sortByUpdatedDateLatest, sortByCreatedDateOldest, sortByCreatedDateLatest, resetSort } from "../../redux/features/filter/filterTodosSlice";
import axios from "axios";


function TodoLayout() {
  const sortRef=useRef(null);
  const filterRef=useRef(null);

  const navigation=useNavigate();

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
  const secondary_filter=useSelector((state)=>state.filterTodo.second_filter);
  const sort=useSelector((state)=>state.filterTodo.sort);
  const second_filterTodos=useSelector((state)=>state.filterTodo.filteredTodos);
  const sortedTodos=useSelector((state)=>state.filterTodo.sortedTodos);

  const closeSortMenus = (e)=>{
    if(sortRef.current && dropdwnSort && !sortRef.current.contains(e.target)){
      setDropdwnSort(false);
    }
  }
  const closeFilterMenus=(e)=>{
    if(filterRef.current && dropdwnFilter && !filterRef.current.contains(e.target)){
      setDropdwnFilter(false);
    }
  }
  

  useEffect(()=>{
    dispatch(setAll());
    dispatch(fetchTodos(profileID));
    
  },[]);

  useEffect(()=>{
    if(secondary_filter){
      if(sort==="updated-date-oldest")
        dispatch(sortByUpdatedDateOldest(second_filterTodos));
      else if(sort==="updated-date-latest")
        dispatch(sortByUpdatedDateLatest(second_filterTodos));
      else if(sort==="created-date-oldest")
        dispatch(sortByCreatedDateOldest(second_filterTodos));
      else if(sort==="created-date-latest")
        dispatch(sortByCreatedDateLatest(second_filterTodos));
    }
    else{
      if(filter==="all"){
        if(sort==="updated-date-oldest")
          dispatch(sortByUpdatedDateOldest(todos));
        else if(sort==="updated-date-latest")
          dispatch(sortByUpdatedDateLatest(todos));
        else if(sort==="created-date-oldest")
          dispatch(sortByCreatedDateOldest(todos));
        else if(sort==="created-date-latest")
          dispatch(sortByCreatedDateLatest(todos));
      }else{
        if(sort==="updated-date-oldest")
          dispatch(sortByUpdatedDateOldest(filterTodos));
        else if(sort==="updated-date-latest")
          dispatch(sortByUpdatedDateLatest(filterTodos));
        else if(sort==="created-date-oldest")
          dispatch(sortByCreatedDateOldest(filterTodos));
        else if(sort==="created-date-latest")
          dispatch(sortByCreatedDateLatest(filterTodos));
      }
      
    }

  },[filterTodos, second_filterTodos, secondary_filter]);

  // useEffect(()=>{
  //   if(filter==="all"){

  //   }else {
  //    //dispatch(setInProgress(todos));
  //   }
  // },[todos])


  // useEffect(()=>{
    
  // },[filter, filterTodos, todos]);

  document.addEventListener('mousedown',closeSortMenus);
  document.addEventListener('mousedown',closeFilterMenus);


  return (
    <div className="h-full xxsm:m-4 px-4 flex flex-col z-[-100]">
      <div className="flex justify-between items-center mt-3">
        <h2 className="self-start font-nunito text-white text-title xxxsm:text-4xl">Todo</h2>
        <button onClick={()=>{
          isLoggedIn?setShowModal((prev)=>!prev):navigation("/login");
        }} className="bg-blue-800 p-1.5 msm:px-3 msm:py-2 text-white text-filter msm:text-base rounded-md">+ Add Todo</button>
      </div>
      <div className="flex justify-between gap-1 xxsm:gap-0 items-start xxsm:items-center mt-3 flex-col xxsm:flex-row">
        <div className="w-auto flex justify-along items-center">
          <span onClick={()=>{
            dispatch(setAll());
            setSelected("all");
            if(secondary_filter==="low-priority"){
              dispatch(filterTodosOnLowPr(todos));
            }
            else if(secondary_filter==="high-priority")
              dispatch(filterTodosOnHighPr(todos));
            else if(secondary_filter==="ageing >= 5")
              dispatch(filterTodosOn5Ageing(todos));
            else if(secondary_filter===""){
              if(sort==="updated-date-oldest")
                dispatch(sortByUpdatedDateOldest(todos));
              else if(sort==="updated-date-latest")
                dispatch(sortByUpdatedDateLatest(todos));
              else if(sort==="created-date-oldest")
                dispatch(sortByCreatedDateOldest(todos));
              else if(sort==="created-date-latest")
                dispatch(sortByCreatedDateLatest(todos));
            }

          }} className={`text-filter px-4 msm:text-base msm:px-0 msm:w-28 py-1 text-white hover:bg-orange-400 rounded-sm cursor-pointer ${selected==="all"?"bg-orange-400":""}`}>All</span>
          <span onClick={async()=>{
            dispatch(setInProgress());
            setSelected("progress");
            try{
              const _filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getInProgressTodos/${profileID}`)
              //console.log(filterTodos.data.filteredTodos);
              dispatch(loadInProgressTodos(_filterTodos.data.filteredTodos));
              if(secondary_filter==="low-priority")
                dispatch(filterTodosOnLowPr(_filterTodos.data.filteredTodos));
              else if(secondary_filter==="high-priority")
                dispatch(filterTodosOnHighPr(_filterTodos.data.filteredTodos));
              else if(secondary_filter==="ageing >= 5")
                dispatch(filterTodosOn5Ageing(_filterTodos.data.filteredTodos));
            }catch(err){
              console.log(err.message);
            }
            
          }} className={`text-filter msm:text-base msm:w-28 px-1.5 msm:px-0 py-1 text-white hover:bg-purple-600 rounded-sm cursor-pointer ${selected==="progress"?"bg-purple-600":""}`}>In Progress</span>
          <span onClick={async()=>{
            dispatch(setCompleted());
            setSelected("completed");
            try{
              const _filterTodos=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getCompletedTodos/${profileID}`)
              //console.log(filterTodos.data.filteredTodos);
              dispatch(loadCompletedTodos(_filterTodos.data.filteredTodos));
              if(secondary_filter==="low-priority")
                dispatch(filterTodosOnLowPr(_filterTodos.data.filteredTodos));
              else if(secondary_filter==="high-priority")
                dispatch(filterTodosOnHighPr(_filterTodos.data.filteredTodos));
              else if(secondary_filter==="ageing >= 5")
                dispatch(filterTodosOn5Ageing(_filterTodos.data.filteredTodos));
            }catch(err){
              console.log(err.message);
            }
          }} className={`text-filter msm:text-base msm:w-28 px-1.5 msm:px-0 py-1 text-white hover:bg-sky-700 rounded-sm cursor-pointer ${selected==="completed"?"bg-sky-700":""}`}>Completed</span>
        </div>
        <div className="flex gap-0.5 msm:gap-2 text-white relative">
          <button onClick={()=>{
            setDropdwnFilter(false);
            if(dropdwnSort)
              setDropdwnSort(false);
            else  
              setDropdwnSort(true);
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
          {dropdwnSort && <div ref={sortRef} className="bg-zinc-700 border border-zinc-900 absolute top-8 left-0 xsm:top-10 flex flex-col justify-center text-left rounded-sm text-filter msm:text-base">
             <p onClick={()=>{
              if(filter==="all"){
                if(secondary_filter==="low-priority")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="high-priority")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="ageing >= 5")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="")
                  dispatch(sortByUpdatedDateLatest(todos))
              }
              else{
                if(secondary_filter==="low-priority")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="high-priority")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="ageing >= 5")
                  dispatch(sortByUpdatedDateLatest(second_filterTodos));
                else if(secondary_filter==="")
                  dispatch(sortByUpdatedDateLatest(filterTodos));
              }
              setDropdwnSort(false);
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Updated Date Latest</p>
             <p onClick={
              ()=>{
                if(filter==="all"){
                  if(secondary_filter==="low-priority")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByUpdatedDateOldest(todos))
                }
                else{
                  if(secondary_filter==="low-priority")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByUpdatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByUpdatedDateOldest(filterTodos));
                }
                setDropdwnSort(false)
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Updated Date Oldest</p>
             <p onClick={()=>{
                if(filter==="all"){
                  if(secondary_filter==="low-priority")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByCreatedDateLatest(todos))
                }
                else{
                  if(secondary_filter==="low-priority")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByCreatedDateLatest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByCreatedDateLatest(filterTodos));
                }
                setDropdwnSort(false)
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Created Date Latest</p>
             <p onClick={()=>{
                if(filter==="all"){
                  if(secondary_filter==="low-priority")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByCreatedDateOldest(todos))
                }
                else{
                  if(secondary_filter==="low-priority")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="high-priority")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="ageing >= 5")
                    dispatch(sortByCreatedDateOldest(second_filterTodos));
                  else if(secondary_filter==="")
                    dispatch(sortByCreatedDateOldest(filterTodos));
                }
                setDropdwnSort(false);
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Created Date Oldest</p>
          </div>}
          {dropdwnFilter && <div ref={filterRef} className="bg-zinc-700 border border-zinc-900 absolute top-8 right-0 xsm:top-10 flex flex-col justify-center text-right rounded-sm text-filter msm:text-base">
             <p onClick={()=>{
              if(filter==="all")
                dispatch(filterTodosOnLowPr(todos));
              else
                dispatch(filterTodosOnLowPr(filterTodos))
              setDropdwnFilter(false)
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Low priority</p>
             <p onClick={()=>{
              if(filter==="all")
                dispatch(filterTodosOnHighPr(todos));
              else
                dispatch(filterTodosOnHighPr(filterTodos))
              setDropdwnFilter(false)
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">High priority</p>
             <p onClick={()=>{
              if(filter==="all")
                dispatch(filterTodosOn5Ageing(todos));
              else
                dispatch(filterTodosOn5Ageing(filterTodos))
              setDropdwnFilter(false)
              }} className="px-3 py-2 cursor-pointer hover:bg-zinc-800">Ageing &#62;&#61; 5days</p>
          </div>}
        </div>
      </div>
      <div className="mt-3 border h-auto border-dashed flex flex-col items-start rounded-sm">
        <div className="p-2 flex items-center">
          <p className="font-bold text-white bg-zinc-500 text-filter msm:text-base rounded-full px-2 py-1 flex items-center gap-1">
            <FontAwesomeIcon className="text-zinc-300" icon={faExclamationCircle}/>
            FILTER
          </p>
          {secondary_filter?<p className={`ml-2 text-filter msm:text-base flex gap-2 items-center text-white px-2 py-1 ${secondary_filter==="low-priority"?"bg-green-600":secondary_filter==="high-priority"?"bg-red-600":secondary_filter==="ageing >= 5"?"bg-yellow-600":""} rounded-md`}>
            {secondary_filter}
            <FontAwesomeIcon onClick={()=>dispatch(resetFilter())} className="cursor-pointer" icon={faXmark}/>
          </p>:""}
        </div>
        <div className="w-full h-px border-dashed bg-zinc-400"/>
        <div className="p-2 flex items-center">
          <p className="font-bold text-white bg-zinc-500 text-filter msm:text-base rounded-full px-2 py-1 flex items-center gap-1">
            <FontAwesomeIcon className="text-zinc-300" icon={faExclamationCircle}/>
            SORT
          </p>
          {sort?<p className="ml-2 text-filter msm:text-base flex gap-2 items-center bg-blue-700 rounded-md text-white px-2 py-1">
            {sort}
            <FontAwesomeIcon onClick={()=>dispatch(resetSort())} className="cursor-pointer" icon={faXmark}/>
          </p>:""}
        </div>
      </div>
      <div className={`mt-5 mb-5 h-max rounded-md border-2 border-dashed border-zinc-400 flex justify-center xxsm:justify-start flex-wrap gap-2 p-2  ${!isLoggedIn?"justify-center items-center p-10 flex-col":""}`}>
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
          filter==="all"?(
            secondary_filter?(
              second_filterTodos.length!==0?(
              sort?
              sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
              second_filterTodos.map((todo)=>{
                return <TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
              })):
              <div className="flex w-full p-10 flex-col justify-center items-center self-center">
                <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
                <div className="text-gray-500">No Todos here</div>
              </div>
            )
            :(sort?
              sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
              todos.map((todo)=>{
              return <TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
              }))
          ):
          filter==="inProgress"?(
          filterTodos.length===0?
          <div className="flex w-full p-10 flex-col justify-center items-center self-center">
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
            <div className="text-gray-500">No Todos here</div>
          </div>:
          (secondary_filter?(
            second_filterTodos.length!==0?(
            sort?
            sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
            second_filterTodos.map((todo)=>{
              return <TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
            })):
            <div className="flex w-full p-10 flex-col justify-center items-center self-center">
              <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
              <div className="text-gray-500">No Todos here</div>
            </div>
            )
          :(sort?
            sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
            filterTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>)))):
          filter==="completed"?(
          filterTodos.length===0?
          <div className="flex w-full p-10 flex-col justify-center items-center self-center">
            <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
            <div className="text-gray-500">No Todos here</div>
          </div>:
          (secondary_filter?(
            second_filterTodos.length!==0?(
            sort?
            sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
            second_filterTodos.map((todo)=>{
              return <TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
            })):
            <div className="flex w-full p-10 flex-col justify-center items-center self-center">
              <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
              <div className="text-gray-500">No Todos here</div>
            </div>
            )
          :(
            sort?
            sortedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>):
            filterTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>)))):
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