import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import TodoCard from "./TodoCard";


function SearchedTodosModal(props) {

  const searchedTodos=useSelector((state)=>state.search.todos);
  const theme=useSelector((state)=>state.settings.darkMode);


  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
      <div className={`w-11/12 h-full ${theme?"bg-neutral-300":"bg-zinc-700"} border border-gray-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5`}>
        <div className={`${!theme?"text-white":"text-zinc-800"} flex justify-between items-center w-full`}>
          <p className={`self-start text-updateTodoText xxxsm:text-base`}>Searched Todos</p>
          <div onClick={e=>props.closeModal(false)} className="self-end	cursor-pointer text-updateTodoText xxsm:text-2xl">X</div>
        </div>
        <div className={`${!theme?"text-white":"text-zinc-800"} self-start text-updateTodoText xxxsm:text-base`}>{`Results : ${searchedTodos.length}`}</div>
        <div className={`mt-2 mb-2 max-h-full rounded-md border-2 border-dashed ${theme?"border-zinc-800":"border-zinc-400"} overflow-y-scroll overflow-x-hidden flex flex-wrap p-2 gap-2 w-full`}>
        
          {
            searchedTodos.length?
            searchedTodos.map((todo)=><TodoCard cd={todo.createDate} ud={todo.updatedDate} key={todo._id} id={todo._id} title={todo.title} priority={todo.priority} tasks={todo.tasks} closeSearchModal={props.closeModal} search={"search"}  updateTodo={props.updateTodo}/>):
            <div className="flex w-full p-10 flex-col justify-center items-center self-center">
              <FontAwesomeIcon className="text-5xl text-gray-500" icon={faExclamationCircle}/>
              <div className="text-gray-500">No Todos here</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchedTodosModal