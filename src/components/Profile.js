import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {  updateName, updateEmail, updateMobile } from "../redux/features/profile/profileSlice";
import {SpinnerCircular} from "spinners-react";


function Profile() {
  //getting the redux profile feature state
  const name=useSelector((state)=>state.profile.name);
  const email=useSelector((state)=>state.profile.email);
  const mobile=useSelector((state)=>state.profile.mobile);
  const isNameUpdating=useSelector((state)=>state.profile.isNameUpdating);
  const isEmailUpdating=useSelector((state)=>state.profile.isEmailUpdating);
  const isNumberUpdating=useSelector((state)=>state.profile.isMobileUpdating);

  const [profileDetails,setProfileDetails]=useState({
    name_edit:false,
    email_edit:false,
    mobile_edit:false,
    name,
    email,
    mobile:String(mobile)
  });

  

  const [updateEmailOverlay, setUpdateEmailOverlay] = useState(false);
  const [passwordForEmail,setPasswordForEmail]=useState("");

  const [updateMobileOverlay, setUpdateMobileOverlay]=useState(false);
  const [passwordForMobile,setPasswordForMobile]=useState("");

  const dispatch=useDispatch();
  useEffect(()=>{
    
  },[profileDetails, name, email, mobile, isNameUpdating, isEmailUpdating, isNumberUpdating, updateEmailOverlay, updateMobileOverlay])

  return (
    <div className="h-full">
        <div className="h-full">
            <div className="flex pt-44 pl-10 items-center justify-center md:pt-20 md:justify-start ">
                <div className="rounded-full w-60 h-60 mr-8 flex items-center justify-center bg-gradient-to-r from-gray-500 to-slate-500">
                    <FontAwesomeIcon className="text-5xl" icon={faUser}/>
                </div>
                <div className="hidden md:block">
                    <p className="text-left text-xs text-white">Hello,</p>
                    <p className="text-5xl text-white">{name?(name.split(" ")[0]):"User_name"}</p>
                </div>
            </div>
            <div className="md:hidden">
                <p className="text-5xl text-white mt-3">{name?name:"User_name"}</p>
            </div>
            <div className="vsm:pl-10 mt-20 flex gap-5 flex-col items-center md:items-start">
                <div className="text-left"><span className="mr-20 text-white">Name</span> {profileDetails.name_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        name_edit:!profileDetails.name_edit
                    })
                }} className="cursor-pointer text-red-700">Cancel</span>:<span onClick={
                    ()=>{
                        setProfileDetails({
                            ...profileDetails,
                            name_edit:!profileDetails.name_edit
                        })
                    }
                } className="text-yellow-500 cursor-pointer">Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            name:e.target.value
                        })
                    }} defaultValue={profileDetails.name} disabled={profileDetails.name_edit?false:true} className="w-auto vsm:w-80 outline-none rounded-md p-2" type="text"/>
                    {profileDetails.name_edit?<button onClick={()=>{
                        dispatch(updateName(profileDetails));
                        setProfileDetails({
                            ...profileDetails,
                            name_edit:false
                        })
                    }} className="bg-blue-700 px-2 py-1 ml-10 rounded-md text-white">SAVE</button>:""}
                    {isNameUpdating?<SpinnerCircular/>:""}
                </div>
            </div>
            <div className="vsm:pl-10 mt-5 flex gap-5 flex-col items-center md:items-start">
                <div className="text-left"><span className="mr-20 text-white">Email address</span> {profileDetails.email_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        email_edit:!profileDetails.email_edit
                    })
                }} className="cursor-pointer text-red-700">Cancel</span>:<span onClick={()=>{
                    setUpdateEmailOverlay(false);
                    setProfileDetails({
                        ...profileDetails,
                        email_edit:!profileDetails.email_edit
                    })
                }} className="text-yellow-500 cursor-pointer">Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            email:e.target.value
                        })
                    }} defaultValue={profileDetails.email} disabled={profileDetails.email_edit?false:true} className=" w-auto vsm:w-80 outline-none rounded-md p-2" type="email"/>
                    {profileDetails.email_edit?<button onClick={()=>{
                        setUpdateEmailOverlay(true);
                        setProfileDetails({
                            ...profileDetails,
                            email_edit:false
                        })
                    }} className="bg-blue-700 px-2 py-1 ml-10 rounded-md text-white">Save</button>:""}
                    
                </div>
                {updateEmailOverlay?
                <div className="flex flex-col justify-center items-center md:items-start p-2 rounded-md">
                    <p className="text-yellow-200">**Please enter password to update the email address**</p>
                    <input onChange={(e)=>{
                        setPasswordForEmail(e.target.value);
                    }} className="mx-4 vsm:mx-0 w-auto vsm:w-80 outline-none rounded-md p-2" type="password"/>
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            console.log(passwordForEmail);
                            dispatch(updateEmail([passwordForEmail,profileDetails.email]));
                            setUpdateEmailOverlay(false);
                        }} className="bg-blue-700 px-2 py-1 rounded-md text-white">Update</button>
                        <button onClick={()=>setUpdateEmailOverlay(false)} className="bg-red-700 px-2 py-1 rounded-md text-white">Cancel</button>
                    </div>
                </div>:""}
                {isEmailUpdating?<SpinnerCircular/>:""}
            </div>
            <div className="vsm:pl-10 mt-5 flex gap-5 flex-col pb-20 items-center md:items-start">
                <div className="text-left"><span className="mr-20 text-white">Mobile Number</span> {profileDetails.mobile_edit?<span onClick={()=>{
                    setProfileDetails({
                        ...profileDetails,
                        mobile_edit:!profileDetails.mobile_edit
                    })
                }} className="cursor-pointer text-red-700">Cancel</span>:<span onClick={()=>{
                    setUpdateMobileOverlay(false);
                    setProfileDetails({
                        ...profileDetails,
                        mobile_edit:!profileDetails.mobile_edit
                    })
                }} className="text-yellow-500 cursor-pointer">Edit</span>}</div>
                <div>
                    <input onChange={(e)=>{
                        setProfileDetails({
                            ...profileDetails,
                            mobile:e.target.value
                        })
                    }} defaultValue={mobile} disabled={profileDetails.mobile_edit?false:true} className="w-auto vsm:w-80 outline-none rounded-md p-2" type="text"/>
                    {profileDetails.mobile_edit?<button onClick={()=>{
                        setUpdateMobileOverlay(true);
                        setProfileDetails({
                            ...profileDetails,
                            mobile_edit:false
                        })
                    }} className="bg-blue-700 px-2 py-1 ml-10 rounded-md text-white">Save</button>:""}
                </div>
                {updateMobileOverlay?
                <div className="flex flex-col justify-center items-center md:items-start p-2 rounded-md">
                    <p className="text-yellow-200">**Please enter password to update the mobile**</p>
                    <input onChange={(e)=>{
                        setPasswordForMobile(e.target.value);
                    }} className="mx-4 vsm:mx-0 w-auto vsm:w-80 outline-none rounded-md p-2" type="password"/>
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            console.log(passwordForMobile);
                            dispatch(updateMobile([passwordForMobile,profileDetails.mobile]));
                            setUpdateMobileOverlay(false);
                        }} className="bg-blue-700 px-2 py-1 rounded-md text-white">Update</button>
                        <button onClick={()=>setUpdateMobileOverlay(false)} className="bg-red-700 px-2 py-1 rounded-md text-white">Cancel</button>
                    </div>
                </div>:""}
                {isNumberUpdating?<SpinnerCircular/>:""}
            </div>
        </div>
    </div>
  )
}

export default Profile