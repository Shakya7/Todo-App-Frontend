

function ModalTodoUpdate(props) {
   console.log(props); 
  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-5 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 sm:h-auto bg-slate-500 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-2 m-5">
            <div onClick={()=>props.closeModal(false)} className="self-end cursor-pointer text-2xl">X</div>
            <div className="flex flex-col items-center sm:items-start font-nunito text-2xl">
                <h1>Todo title</h1>
                <input className="rounded-sm w-full" value={props.title} type="text"/>
            </div>
        </div>
    </div>
  )
}

export default ModalTodoUpdate