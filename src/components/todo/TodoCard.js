import { useDispatch, useSelector } from "react-redux";
import { loadDataIntoRedux } from "../../redux/features/updateTodos/updateTodoSlice";
import {useEffect, useState} from "react";

function TodoCard(props) {

    const dispatch=useDispatch();

    const [completedTasks, setCompletedTasks]=useState(0);

    const theme=useSelector((state)=>state.settings.darkMode);

    function checkProgress(tasks){
        let completed=0;
        for(let i=0;i<tasks.length;i++){
            //console.log(tasks[i].inProgress);
            if(tasks[i].inProgress===false)
                completed=completed+1
        }
        return completed;
    }

    useEffect(()=>{
        setCompletedTasks(()=>checkProgress(props.tasks));
    },[props.tasks])


    return (
        <div onClick={()=>{
            
            //console.log(props);
            dispatch(loadDataIntoRedux(props));
            if(props.search){
                props.closeSearchModal(false);
            }
            return props.updateTodo(true);
            }} className={`flex flex-col ${!theme?"bg-zinc-600":"bg-neutral-300"} p-5 items-start gap-2 w-full xxsm:w-48 h-auto rounded-md cursor-pointer`}>
            <div className={`rounded-xl text-date xxxsm:text-sm px-2 py-1 self-end xxxsm:self-auto ${props.priority==="High"?"bg-red-400 text-red-900":"bg-green-400 text-green-900"}`}>{props.priority}</div>
            <div className={`text-left ${!theme?"text-white":"text-zinc-800"} self-center text-todoTitle xxxsm:text-base  text-center xxxsm:self-auto `}>{props.title}</div>
            <div className="text-left text-xs flex flex-col self-center xxxsm:self-auto">
                <div className="flex flex-col">
                    <p className="font-bold text-date xxxsm:text-xs text-gray-800">Created Date:</p>
                    <div className={`flex flex-col text-date xxxsm:text-xs xxxsm:flex-row gap-0 xxxsm:gap-3 items-center ${!theme?"text-gray-400":"text-stone-600"}`}>
                        <p>{new Date(props.cd).toLocaleDateString()}</p>
                        <p>{new Date(props.cd).toLocaleTimeString()}</p>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-date xxxsm:text-xs text-gray-800">Updated Date:</p>
                    <div className={`flex gap-0 xxxsm:gap-3 text-date xxxsm:text-xs flex-col xxxsm:flex-row  items-center ${!theme?"text-gray-400":"text-stone-600"}`}>
                        <p>{new Date(props.ud).toLocaleDateString()}</p>
                        <p>{new Date(props.ud).toLocaleTimeString()}</p>
                    </div>
                </div>

            </div>
            <div className="w-full flex flex-col items-start ">
                <div className="w-full justify-between flex text-xs flex-col text-date xxxsm:text-xs text-left xxxsm:flex-row">
                    <p className={`${!theme?"text-gray-400":"text-stone-600"}`}>Progress</p>
                    <p className={`${!theme?"text-gray-400":"text-stone-600"}`}>{props.tasks.length===0?"-":`${completedTasks}/${props.tasks.length}`}</p>
                </div>
                <div className="w-full h-1 bg-blue-400 rounded-md">

                </div>
            </div>
        </div>
    )
}

export default TodoCard