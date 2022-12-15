import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalTodo from "./ModalTodo";
import TodoCard from "./TodoCard";
import { fetchTodos } from "../../redux/features/todos/todoSlice";
import ModalTodoUpdate from "./ModalTodoUpdate";



function TodoLayout() {
  const [selected, setSelected]=useState("all");
  const [showModal, setShowModal]=useState(false);

  const [showTodo, setShowTodo]=useState(false);
  const dispatch=useDispatch();

  const isLoggedIn=useSelector((state)=>state.login.isLogged);
  const profileID=useSelector((state)=>state.profile.id);
  const todos=useSelector((state)=>state.todo.todos);

  useEffect(()=>{
    dispatch(fetchTodos(profileID));
  },[])

  return (
    <div className="h-full m-4 px-4 flex flex-col">
      <div className="flex justify-between items-center mt-3">
        <h2 className="self-start font-nunito text-4xl text-white ">Todo</h2>
        <button onClick={()=>{
          setShowModal((prev)=>!prev);
        }} className="bg-blue-800 px-3 py-2 text-white rounded-md">+ Add Todo</button>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex justify-along items-center">
          <span onClick={()=>{
            setSelected("all")
          }} className={`w-28 py-1 text-white hover:bg-orange-400 rounded-sm cursor-pointer ${selected==="all"?"bg-orange-400":""}`}>All</span>
          <span onClick={()=>{
            setSelected("progress")
          }} className={`w-28 py-1 text-white hover:bg-purple-600 rounded-sm cursor-pointer ${selected==="progress"?"bg-purple-600":""}`}>In Progress</span>
          <span onClick={()=>{
            setSelected("completed")
          }} className={`w-28 py-1 text-white hover:bg-sky-700 rounded-sm cursor-pointer ${selected==="completed"?"bg-sky-700":""}`}>Completed</span>
        </div>
        <div className="flex gap-2 text-white">
          <button className="w-20 bg-zinc-600 px-2 py-1 rounded-md flex gap-1 justify-center items-center">
            <FontAwesomeIcon className="text-xl" icon={faSort}/>
            Sort
          </button>
          <button className="w-20 bg-zinc-600 px-2 py-1 rounded-md flex gap-1 justify-center items-center">
            <FontAwesomeIcon icon={faFilter}/>
            Filter
          </button>
        </div>
      </div>
      <div className={`mt-5 mb-5 h-max rounded-md border-2 border-dashed border-zinc-400 flex items-start flex-wrap gap-2 p-2  ${!isLoggedIn?"justify-center items-center p-10 flex-col":""}`}>
        {!isLoggedIn?<>
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
          todos.map((todo)=>{
            return <TodoCard key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} updateTodo={setShowTodo}/>
          })
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