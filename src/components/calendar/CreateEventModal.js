import { faCheck, faXmark, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function CreateEventModal(props) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
        <div className="w-4/5 lg:w-1/2 sm:h-auto bg-neutral-700 rounded-md flex flex-col justify-center items-center sm:items-start p-4 relative gap-4 m-5">
            <FontAwesomeIcon onClick={()=>props.closeModal(false)} className="text-red-400 cursor-pointer absolute top-3 right-3" icon={faXmark}/>
            <h1 className="text-xl text-white font-nunito">Create Event</h1>
            <div className="bg-gray-500 h-px w-full"/>
            <div className="flex flex-col items-start w-full gap-2">
                <label className="text-white">Title</label>
                <input type="text" className="text-gray-400 w-full bg-zinc-800 rounded-md px-2 py-1 outline-none"/>
            </div>
            <div className="flex w-full gap-2 text-gray-400 flex-wrap">
                <div className="flex flex-col items-start gap-2">
                    <label className="text-white">Start Date</label>
                    <input style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md px-1.5 py-1" type="date"/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-white">End Date</label>
                    <input style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md px-1.5 py-1" type="date"/>
                </div>
                <div className="flex flex-col items-start grow gap-2">
                    <label className="text-white">Start Time</label>
                    <input style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md w-full px-1.5 py-1" type="time"/>
                </div>
                <div className="flex flex-col items-start grow gap-2">
                    <label className="text-white">End Time</label>
                    <input style={{colorScheme:"dark"}} className="bg-zinc-800 rounded-md w-full px-1.5 py-1" type="time"/>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <div className="flex w-4 h-4 justify-center items-center rounded-full bg-green-400">
                    <FontAwesomeIcon icon={faCheck}/>
                </div>
                <p className="text-xs text-zinc-400">This event will take place on July 14, 2022 from 1:30 PM to 4:30 PM</p>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
                <label className="text-white">Location</label>
                <input type="text" className="text-gray-400 w-full bg-zinc-800 rounded-md px-2 py-1 outline-none"/>
            </div>
            <div className="w-full border border-t-zinc-400 border-dashed"/>
            {/* <div className="flex flex-col items-start gap-2 w-full">
                <label>Upload attachments</label>
                <div className="bg-zinc-900 border border-dashed border-zinc-500 w-full h-20 p-2">
                    <div className="flex items-center gap-5">
                        <button className="bg-neutral-700 px-1.5 py-1 text-nunito text-white rounded-md border border-zinc-400">Select</button>
                        <div className="flex items-center text-zinc-500 gap-1">
                            <FontAwesomeIcon icon={faCloudArrowUp}/>
                            <p>Drop files here...</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <button className="bg-sky-600 py-1 w-full text-white rounded-md font-nunito">Create Event</button>
        </div>
    </div>
  )
}

export default CreateEventModal