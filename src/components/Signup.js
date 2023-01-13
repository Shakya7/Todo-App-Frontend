import logo from "../images/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";
import SavingSpinner from "../loading-spinners/savingSpinner";
import {useDispatch, useSelector} from "react-redux";
import { signupFunction, removeError } from "../redux/features/login/loginSlice";
import { fetchAccountData } from "../redux/features/profile/profileSlice";

function Signup(){
     const navigation=useNavigate();
     const dispatch=useDispatch();
     const {isLoading, isLogged, error}=useSelector((state)=>state.login);

     const theme=useSelector((state)=>state.settings.darkMode);

     const [credentials,setCredentials]=useState({
         email:"",
         password:"",
         name:"",
     });

    useEffect(()=>{
        if(isLogged){
            console.log("test")
            dispatch(fetchAccountData());
            navigation("/");
        }
    },[isLoading, isLogged, error])
    return(
        <div className={`${theme?"bg-zinc-50":"bg-zinc-800"} h-screen flex flex-col justify-center`}>
            <div className="basis-full h-full overflow-y-scroll overflow-x-hidden">
                <div className="h-full">
                    <div className={`flex flex-col ${theme?"bg-zinc-50":"bg-zinc-800"} justify-center items-center`}>
                        <div onClick={()=>navigation("/")} className="flex justify-center items-center gap-1 my-6">
                            <img className="w-1/5 xxsm:w-20" src={logo} alt="logo"/>
                            <p className={`${theme?"text-zinc-800":"text-white"} font-fascinate text-title xxsm:text-5xl`}>TraceBit</p>
                        </div>
                        <p className="text-slate-500 text-updateTodoText xxsm:text-base">To access TraceBit, please Sign up</p>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <form className="flex flex-col  w-3/4 vsm:w-2/4 max-w-xl p-4 gap-5 bg-stone-900 rounded-lg">
                            <div className="flex flex-col">
                                <label className="self-start text-white" htmlFor="name">Name</label>
                                <input className="p-2 rounded-sm outline-none" onFocus={()=>dispatch(removeError())} id="name" type={"text"} placeholder="Name" onChange={(e)=>setCredentials({
                                    ...credentials,
                                    name:e.target.value
                                })}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="self-start text-white" htmlFor="email">Email address</label>
                                <input className="p-2 rounded-sm outline-none" onFocus={()=>dispatch(removeError())} id="email" type={"email"} placeholder="Email address" onChange={(e)=>setCredentials({
                                    ...credentials,
                                    email:e.target.value
                                })}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="self-start text-white" htmlFor="pw">Password</label>
                                <input className="p-2 rounded-sm outline-none" onFocus={()=>dispatch(removeError())} id="pw" type={"password"} placeholder="Password" onChange={(e)=>setCredentials({
                                    ...credentials,
                                    password:e.target.value
                                })}/>
                            </div>
                            <div>
                                <button className="bg-green-800 cursor-pointer text-white w-full rounded-sm py-1.5" onClick={
                                    (e)=>{
                                        e.preventDefault();
                                        dispatch(signupFunction(credentials));
                                    }
                                }>
                                {
                                    !isLoading?
                                    "Sign Up":
                                    <div className="flex justify-center items-center gap-1">
                                        <p>Signing up...</p>
                                        <div className="relative top-2"><SavingSpinner/></div>
                                    </div>
                                }</button>

                            </div>
                            {error?<p className="text-updateTodoText xxsm:text-base" style={{color:"red",textAlign:"center"}}>Please enter valid email address or password</p>:""}
                            <div className="text-white">OR</div>
                            <div className="flex gap-x-2">
                                <div className="basis-full py-1 cursor-pointer border border-slate-600 rounded-md">
                                    <FontAwesomeIcon className="text-slate-600" icon={faGithub}/>
                                </div>
                                <div className="basis-full py-1 cursor-pointer border border-slate-600 rounded-md">
                                    <FontAwesomeIcon className="text-slate-600" icon={faGoogle}/>
                                </div>
                                <div className="basis-full py-1 border cursor-pointer border-slate-600 rounded-md">
                                    <FontAwesomeIcon className="text-slate-600" icon={faLinkedin}/>
                                </div>
                            </div>
                        </form>
                        <div className={`mt-12 ${theme?"text-zinc-800":"text-white"} flex flex-col items-center mb-10 text-updateTodoText xxsm:text-base`}>
                            <b>Already have an account?</b>
                            <button className="w-64 cursor-pointer" onClick={(e)=>{
                                e.preventDefault();
                                navigation("/login");
                            }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;