import { loadUpdateNote } from "../../redux/features/note/noteSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function NoteCard(props) {
  const dispatch=useDispatch();
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div onClick={()=>{
        props.setShowUpdtModal(true);
        dispatch(loadUpdateNote(props))
        }} className={`flex flex-col ${theme?"bg-neutral-300":"bg-zinc-600"} p-5 items-start gap-2 w-full xxsm:w-48 h-auto rounded-md cursor-pointer`}>
        <div style={{color:props.color}} className={`text-left self-center text-todoTitle xxxsm:text-base  text-center xxxsm:self-auto`}>{props.title}</div>
        <div className="text-xs self-end">
        {
            `${new Date(props.udate).toLocaleDateString("en-US",{year: 'numeric', month: 'short',day: 'numeric'})}`
        }
        </div>
    </div>
  )
}

export default NoteCard