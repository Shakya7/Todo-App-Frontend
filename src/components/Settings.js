import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/features/settings/settingSlice";

function Settings() {
    const theme=useSelector((state)=>state.settings.darkMode);
    const dispatch=useDispatch();

    return (
        <div className="h-full px-4">
            <div className="flex justify-between items-center mt-3">
                <h2 className={`self-start font-nunito ${!theme?"text-white":"text-zinc-800"} text-title xxxsm:text-4xl`}>Settings</h2>
            </div>
            <div className="flex mt-16 ml-5 gap-10 justify-start items-center">
                <p className={`${!theme?"text-white":"text-zinc-800"} text-addTask vsm:text-base`}>Dark Mode</p>
                <div onClick={()=>{
                    dispatch(changeTheme())
                }} className={`${theme?"bg-zinc-700":"bg-zinc-200"} ease-in-out duration-500 w-6 xxsm:w-12 h-3 xxsm:h-5 mr-4 rounded-full flex items-center ${theme?"justify-start":"justify-end"} p-1 cursor-pointer`}>
                    <div className={`${theme?"bg-zinc-200":"bg-zinc-700"} w-2 h-2 xxsm:w-4 xxsm:h-4 rounded-full`}></div>
                </div>
            </div>
        </div>
    )
}

export default Settings