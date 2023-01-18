import {useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useLayoutEffect,useState } from "react";
import unauth_err from "../images/unauthorized_error_page.png";
import lock_img from "../images/lock_img.svg";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/features/profile/profileSlice";
import { SpinnerCircular } from "spinners-react";

export function ResetPass(){
    const dispatch=useDispatch();
    const navigation=useNavigate();
    const {token}=useParams();
    const [showResetPForm,setShowResultPForm]=useState(false);
    const [resetPOptions,setResetPOptions]=useState({
        newPassword:"",
        confirmNewPassword:""
    })
    const [showError,setShowError]=useState(false);

    const isLoading=useSelector((state)=>state.profile.resetPassword.isLoading);
    const success=useSelector((state)=>state.profile.resetPassword.success);
    const error=useSelector((state)=>state.profile.resetPassword.error);
    //console.log(token);
    const checkToken=()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/checkResetToken`,{
            passwordResetToken:token
        },{withCredentials:true}).then(res=>setShowResultPForm(true)).catch(err=>setShowResultPForm(false));
        console.log(showError);
    }
    useLayoutEffect(()=>{
        checkToken();
    },[showResetPForm,showError])
    return(
        <div className="w-full h-auto">
            {
            showResetPForm?
            <div className="flex flex-col justify-center items-center gap-5 p-16">
                <div onClick={()=>navigation("/")} className="flex justify-center items-center gap-1">
                    <img className="w-1/5 xxsm:w-20" src={logo} alt="logo"/>
                    <p className={`font-fascinate text-title xxsm:text-5xl`}>TraceBit</p>
                </div>
                <img className="w-[9%] h-[9%]" src={lock_img}/>
                <h1 className="text-updateTodoText xxsm:text-base">Password Reset</h1>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="font-bold text-updateTodoText xxsm:text-base">New Password</p>
                    <input placeholder="New password" type="password" className="bg-gray-300 py-2 px-3 rounded-md w-11/12 vsm:w-full text-updateTodoText xxsm:text-base outline-none" onChange={e=>setResetPOptions({...resetPOptions,newPassword:e.target.value})}/>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="font-bold text-updateTodoText xxsm:text-base">Confirm New Password</p>
                    <input placeholder="Confirm new password" type="password" className="bg-gray-300 py-2 px-3 rounded-md w-11/12 vsm:w-full text-updateTodoText xxsm:text-base outline-none" onChange={e=>setResetPOptions({...resetPOptions,confirmNewPassword:e.target.value})}/>
                </div>
                {showError && <p className="text-red-500 text-updateTodoText xxsm:text-base">Password change not successful. Make sure you are entering the same passwords in both fields.</p>}
                {!isLoading?<div onClick={async e=>{
                    if(resetPOptions.newPassword===resetPOptions.confirmNewPassword){
                        setShowError(false);
                        // const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/resetPassword/${token}`,{
                        //     password:resetPOptions.newPassword,
                        //     confirmPassword:resetPOptions.confirmNewPassword
                        // },{withCredentials:true});
                        let obj={
                            password:resetPOptions.newPassword,
                            confirmPassword:resetPOptions.confirmNewPassword,
                            token
                        }
                        dispatch(resetPassword(obj));
                    }
                    else{
                        setShowError(true);
                    }
                    
                }} className="w-[25vmax] h-auto bg-green-600 rounded-md flex-wrap flex items-center justify-center text-white cursor-pointer text-updateTodoText xxsm:text-base">
                    CHANGE PASSWORD
                </div>:<SpinnerCircular size={20}/>}
                {success?<p onClick={e=>navigation("/login")} className="text-updateTodoText xxsm:text-base text-green-600 underline cursor-pointer">Password changed successfully. Click here to login with new password</p>:""}
                {error?<p className="text-updateTodoText xxsm:text-base text-red-400 ">Network failure. Please try again</p>:""}
                

            </div>:
            <div className="flex flex-col justify-center items-center p-10">
                <img className="w-[53%]" src={unauth_err}/>
                <div onClick={e=>navigation("/login")} className="cursor-pointer text-blue-600 text-updateTodoText xxsm:text-base">Please try to login again</div>
            </div>
            }
        </div>
    )
}