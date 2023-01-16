import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendPasswordLinkToEmail } from "../redux/features/profile/profileSlice";

function ForgotpassPage() {
  const navigation=useNavigate();
  const dispatch=useDispatch();
  const isLoading=useSelector((state)=>state.profile.forgotPassword.isLoading);
  const error=useSelector((state)=>state.profile.forgotPassword.error);
  const success=useSelector((state)=>state.profile.forgotPassword.success);

  const [email,setEmail]=useState("");


  return (
    <div className={`h-screen flex flex-col justify-center`}>
      <div className="basis-full h-full overflow-y-scroll overflow-x-hidden">
        <div className="h-full">
          <div className={`flex flex-col justify-center items-center`}>
            <div onClick={()=>navigation("/")} className="flex justify-center items-center gap-1 my-6">
              <img className="w-1/5 xxsm:w-20" src={logo} alt="logo"/>
              <p className={`font-fascinate text-title xxsm:text-5xl`}>TraceBit</p>
            </div>
            <p className="text-slate-500 text-updateTodoText xxsm:text-base">To reset password, enter your email address</p>
            <p className="text-slate-500 text-updateTodoText xxsm:text-base">We'll send a password reset link to your email</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 mt-16">
            <input onChange={(e)=>{
                setEmail(e.target.value);
            }} type="text" className="bg-gray-300 py-2 px-3 rounded-md w-11/12 vsm:w-3/6 text-updateTodoText xxsm:text-base outline-none"/>
            {isLoading?<SpinnerCircular size={15}/>:<button onClick={()=>{
                let obj={
                  email,
                  redirectLink:`${process.env.REACT_APP_FRONTEND_URL}/resetPassword`
                }
                dispatch(sendPasswordLinkToEmail(obj));
            }} className="bg-blue-600 text-white py-1 px-3 rounded-md text-updateTodoText xxsm:text-base">Send</button>}

            {error?<p className="text-red-400 text-updateTodoText xxsm:text-base">{error}</p>:""}
            {success?<p className="text-green-500 text-updateTodoText xxsm:text-base">Password reset link has been sent to your email address.</p>:""}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotpassPage