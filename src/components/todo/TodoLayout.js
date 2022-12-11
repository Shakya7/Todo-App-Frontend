import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";

function TodoLayout() {
  return (
    <div className="h-full m-4 px-4 flex flex-col">
      <div className="flex justify-between items-center mt-3">
        <h2 className="self-start font-nunito text-4xl text-white ">Todo</h2>
        <button className="bg-blue-800 px-3 py-2 text-white rounded-md">+ Add Todo</button>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex justify-along items-center">
          <span className="w-28 py-1 text-white hover:bg-orange-400 rounded-sm cursor-pointer">All</span>
          <span className="w-28 py-1 text-white hover:bg-purple-600 rounded-sm cursor-pointer">In Progress</span>
          <span className="w-28 py-1 text-white hover:bg-sky-700 rounded-sm cursor-pointer">Completed</span>
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
      <div className="mt-5 mb-5 h-4/5 rounded-md border border-dashed border-zinc-400">
        <div>Hello</div>
      </div>
      
    </div>
  )
}

export default TodoLayout