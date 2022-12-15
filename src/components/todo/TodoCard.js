import { useSelector, useDispatch } from "react-redux";
import ModalTodoUpdate from "./ModalTodoUpdate";
import {useState} from "react";
import { useEffect } from "react";
import { loadDataIntoRedux } from "../../redux/features/updateTodos/updateTodoSlice";

function TodoCard(props) {
    const profileID=useSelector((state)=>state.profile.id);

    const dispatch=useDispatch();

    return (
        <div onClick={()=>{
            //console.log(props);
            dispatch(loadDataIntoRedux(props));
            return props.updateTodo(true);
            }} className="flex flex-col bg-zinc-600 p-5 items-start gap-2 w-48 h-auto rounded-md">
            <div className={`rounded-xl text-sm px-2 py-1 ${props.priority==="High"?"bg-red-400 text-red-900":"bg-green-400 text-green-900"}`}>{props.priority}</div>
            <div className="text-left text-white">{props.title}</div>
            <div className="w-full flex flex-col items-start ">
                <div className="w-full justify-between flex text-xs flex-col text-left xxxsm:flex-row">
                    <p className="text-gray-400">Progress</p>
                    <p className="text-gray-400">12/22</p>
                </div>
                <div className="w-full h-1 bg-blue-400 rounded-md">

                </div>
            </div>
        </div>
    )
}

export default TodoCard