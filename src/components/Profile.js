import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {  updateName, updateEmail, updateMobile } from "../redux/features/profile/profileSlice";
import {SpinnerCircular} from "spinners-react";
import { setUpdateEmailOverlay, setUpdateMobileOverlay } from "../redux/features/profile/profileSlice";


function Profile() {
  //getting the redux profile feature state
  const name=useSelector((state)=>state.profile.name);
  const email=useSelector((state)=>state.profile.email);
  const mobile=useSelector((state)=>state.profile.mobile);
  const isNameUpdating=useSelector((state)=>state.profile.isNameUpdating);
  const isEmailUpdating=useSelector((state)=>state.profile.isEmailUpdating);
  const isNumberUpdating=useSelector((state)=>state.profile.isMobileUpdating);
  const theme=useSelector((state)=>state.settings.darkMode);

  const error=useSelector((state)=>state.profile.error);

  const [profileDetails,setProfileDetails]=useState({
    name_edit:false,
    email_edit:false,
    mobile_edit:false,
    name:String(name),
    email:String(email),
    mobile:String(mobile)
  });

  

  //const [updateEmailOverlay, setUpdateEmailOverlay] = useState(false);
  const updateEmailOverlay=useSelector((state)=>state.profile.updateEmailOverlay);
  const updateMobileOverlay=useSelector((state)=>state.profile.updateMobileOverlay);

  const [passwordForEmail,setPasswordForEmail]=useState("");

  const [passwordForMobile,setPasswordForMobile]=useState("");

  const dispatch=useDispatch();
  useEffect(()=>{
    
  },[profileDetails])

  return (
    <div className="h-full">
        <div className="h-full px-4">
            <div className="flex justify-center md:justify-start  items-center mt-3">
                <h2 className={`self-start font-nunito ${!theme?"text-white":"text-zinc-800"} text-title xxxsm:text-4xl`}>Profile</h2>
            </div>
            <div className="flex pt-44 pl-10 items-center justify-center md:pt-20 md:justify-start ">
                <div className={`rounded-md apex-xsm:rounded-full w-24 h-20 apex-xsm:w-[65vw] apex-xsm:h-[65vw]  xxsm:w-60 xxsm:h-60 mr-8 flex items-center justify-center  ${theme?"bg-zinc-300":"bg-gray-400"}`}>
                    <FontAwesomeIcon className="text-xs apex-xsm:text-[14vw] xxsm:text-5xl" icon={faUser}/>
                </div>
                <div className="hidden md:block">
                    <p className={`text-left text-xs ${theme?"text-zinc-800":"text-white"}`}>Hello,</p>
                    <p className={`text-5xl ${theme?"text-zinc-800":"text-white"}`}>{name?(name.split(" ")[0]):"User_name"}</p>
                </div>
            </div>
            <div className="md:hidden">
                <p className={`text-[10vw] xxsm:text-5xl ${theme?"text-zinc-800":"text-white"} mt-3`}>{name?name:"User_name"}</p>
            </div>
            <div className="vsm:pl-10 mt-20 flex gap-5 flex-col items-center md:items-start">
                <div className="text-left"><span className={`mr-20 ${theme?"text-zinc-800":"text-white"} text-[5vw] xxsm:text-base`}>Name</span> {profileDetails.name_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        name_edit:!profileDetails.name_edit
                    })
                }} className="cursor-pointer text-red-700 text-[5vw] xxsm:text-base">Cancel</span>:<span onClick={
                    ()=>{
                        setProfileDetails({
                            ...profileDetails,
                            name_edit:!profileDetails.name_edit
                        })
                    }
                } className={`${theme?"text-green-500":"text-yellow-500"} cursor-pointer text-[5vw] xxsm:text-base`}>Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            name:e.target.value
                        })
                    }} defaultValue={name} disabled={profileDetails.name_edit?false:true} className={`w-full xxsm:w-auto ${!theme?"bg-zinc-100":"bg-zinc-400"} vsm:w-80 outline-none rounded-md p-2 text-[5vw] xxsm:text-base`} type="text"/>
                    {profileDetails.name_edit?<button onClick={()=>{
                        dispatch(updateName(profileDetails));
                        setProfileDetails({
                            ...profileDetails,
                            name_edit:false
                        })
                    }} className="bg-blue-700 px-2 py-1 ml-10 rounded-md text-[5vw] xxsm:text-base text-white">SAVE</button>:""}
                    {isNameUpdating?<SpinnerCircular/>:""}
                </div>
            </div>
            <div className="vsm:pl-10 mt-5 flex gap-5 flex-col items-center md:items-start">
                <div className="text-left"><span className={`mr-20 ${theme?"text-zinc-800":"text-white"} text-[5vw] xxsm:text-base`}>Email address</span> {profileDetails.email_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        email_edit:!profileDetails.email_edit
                    })
                }} className="cursor-pointer text-red-700 text-[5vw] xxsm:text-base">Cancel</span>:<span onClick={()=>{
                    dispatch(setUpdateEmailOverlay(false));
                    setProfileDetails({
                        ...profileDetails,
                        email_edit:!profileDetails.email_edit
                    })
                }} className={`${theme?"text-green-500":"text-yellow-500"} text-[5vw] xxsm:text-base cursor-pointer`}>Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            email:e.target.value
                        })
                    }} defaultValue={email} disabled={profileDetails.email_edit?false:true} className={`w-full xxsm:w-auto ${!theme?"bg-zinc-100":"bg-zinc-400"} vsm:w-80 outline-none rounded-md p-2 text-[5vw] xxsm:text-base`} type="email"/>
                    {profileDetails.email_edit?<button onClick={()=>{
                        dispatch(setUpdateEmailOverlay(true));
                        setProfileDetails({
                            ...profileDetails,
                            email_edit:false
                        })
                    }} className="text-[5vw] xxsm:text-base bg-blue-700 px-2 py-1 ml-10 rounded-md text-white">Save</button>:""}
                    
                </div>
                {updateEmailOverlay?
                <div className="flex flex-col justify-center items-center md:items-start p-2 rounded-md">
                    <p className={`${theme?"text-orange-500":"text-yellow-200"} text-[5vw] xxsm:text-base`}>**Please enter password to update the email address**</p>
                    <input onChange={(e)=>{
                        setPasswordForEmail(e.target.value);
                    }} className={`mx-4 vsm:mx-0 w-full xxsm:w-auto vsm:w-80 ${!theme?"bg-zinc-100":"bg-zinc-400"} outline-none rounded-md p-2 text-[5vw] xxsm:text-base`} type="password"/>
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            //console.log(passwordForEmail);
                            dispatch(updateEmail([passwordForEmail,profileDetails.email]));
                        }} className="bg-blue-700 px-2 py-1 rounded-md text-white text-[5vw] xxsm:text-base">Update</button>
                        <button onClick={()=>dispatch(setUpdateEmailOverlay(false))} className="bg-red-700 px-2 py-1 rounded-md text-white text-[5vw] xxsm:text-base">Cancel</button>
                    </div>
                    {error.updateEmail?<div className="text-red-600 text-[5vw] xxsm:text-base">{error.updateEmail}</div>:""}
                </div>:""}
                {isEmailUpdating?<SpinnerCircular/>:""}
            </div>
            <div className="vsm:pl-10 mt-5 flex gap-5 flex-col pb-20 items-center md:items-start">
                <div className="text-left"><span className={`mr-20 ${theme?"text-zinc-800":"text-white"} text-[5vw] xxsm:text-base`}>Mobile Number</span> {profileDetails.mobile_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        mobile_edit:!profileDetails.mobile_edit
                    })
                }} className="cursor-pointer text-red-700 text-[5vw] xxsm:text-base">Cancel</span>:<span onClick={()=>{
                    dispatch(setUpdateMobileOverlay(false));
                    setProfileDetails({
                        ...profileDetails,
                        mobile_edit:!profileDetails.mobile_edit
                    })
                }} className={`${theme?"text-green-500":"text-yellow-500"} cursor-pointer text-[5vw] xxsm:text-base`}>Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            mobile:e.target.value
                        })
                    }} defaultValue={mobile} disabled={profileDetails.mobile_edit?false:true} className={`w-full xxsm:w-auto vsm:w-80 ${!theme?"bg-zinc-100":"bg-zinc-400"} outline-none rounded-md p-2 w-full text-[5vw] xxsm:text-base`} type="text"/>
                    {profileDetails.mobile_edit?
                    <button onClick={()=>{
                        dispatch(setUpdateMobileOverlay(true));
                        setProfileDetails({
                            ...profileDetails,
                            mobile_edit:false
                        })
                    }} className="bg-blue-700 px-2 py-1 ml-10 rounded-md text-white text-[5vw] xxsm:text-base">Save</button>:""}
                    {profileDetails.mobile_edit?<p className={`italic ${!theme?"text-white":"text-zinc-800"} text-[5vw] xxsm:text-xs text-center custom-1:text-left`}>While updating this, please remove +91</p>:""}
                </div>
                {updateMobileOverlay?
                <div className="flex flex-col justify-center items-center md:items-start p-2 rounded-md">
                    <p className={`${theme?"text-orange-500":"text-yellow-200"} text-[5vw] xxsm:text-base`}>**Please enter password to update the mobile**</p>
                    <input onChange={(e)=>{
                        setPasswordForMobile(e.target.value);
                    }} className={`mx-4 vsm:mx-0 w-full xxsm:w-auto ${!theme?"bg-zinc-100":"bg-zinc-400"} vsm:w-80 outline-none rounded-md p-2 text-[5vw] xxsm:text-base`} type="password"/>
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            dispatch(updateMobile([passwordForMobile,profileDetails.mobile]));
                        }} className="bg-blue-700 px-2 py-1 rounded-md text-white text-[5vw] xxsm:text-base">Update</button>
                        <button onClick={()=>dispatch(setUpdateMobileOverlay(false))} className="bg-red-700 px-2 py-1 rounded-md text-white text-[5vw] xxsm:text-base">Cancel</button>
                    </div>
                    {error.updateMobile?<div className="text-red-600 text-[5vw] xxsm:text-base">{error.updateMobile}</div>:""}
                </div>:""}
                {isNumberUpdating?<SpinnerCircular/>:""}
            </div>
        </div>
    </div>
  )
}

export default Profile