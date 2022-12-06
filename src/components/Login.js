import logo from "../images/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";
import SavingSpinner from "../loading-spinners/savingSpinner";
import {useDispatch, useSelector} from "react-redux";
import { loginFunction, removeError } from "../redux/features/login/loginSlice";
import { fetchAccountData } from "../redux/features/profile/profileSlice";


function Login(){
     const navigation=useNavigate();
     const dispatch=useDispatch();
     const {isLoading, isLogged, error}=useSelector((state)=>state.login);
     
     const [credentials,setCredentials]=useState({
         email:"",
         password:"",
     });
    //const [failure,setFailure]=useState(false);
    //const [isLoading,setIsLoading]=useState(false);

    //  async function login(e){
    //     e.preventDefault();
    //     setIsLoading(true);
    //     const promise = account.createEmailSession(credentials.email, credentials.password);
    

    //     promise.then(function (response) {
    //         console.log(response); // Success
    //         setIsLoading(false);
    //         navigation("/");
    //     }, function (error) {
    //         console.log(error); // Failure
    //         setIsLoading(false);
    //         setFailure(true);
    //     });
    // }

   
    useEffect(()=>{
        if(isLogged){
            dispatch(fetchAccountData());
            navigation("/");
        }
    },[isLoading, isLogged, error])
    return(
        <div className="bg-zinc-800 flex flex-col min-h-screen justify-center">
            <div className="flex flex-col bg-zinc-800 items-center">
                <div className="flex justify-center items-center gap-1 my-6">
                    <img className="w-20" src={logo} alt="logo"/>
                    <p className="text-white font-fascinate text-5xl">TraceBit</p>
                </div>
                <p className="text-slate-500">To access TraceBit, please Login</p>
            </div>
            <div className="min-h-full flex flex-col justify-center items-center ">
                <form className="flex flex-col w-2/4 max-w-xl p-4 gap-5 bg-stone-900 rounded-lg">
                    <div className="flex flex-col">
                        <label className="self-start text-white" htmlFor="email">Email address</label>
                        <input className="p-2 rounded-sm outline-none" onFocus={()=>dispatch(removeError())}  id="email" type={"email"} placeholder="Email address" onChange={(e)=>setCredentials({
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
                                dispatch(loginFunction(credentials));
                            }
                        }>
                        {
                            !isLoading?
                            "Login":
                            <div className="flex justify-center items-center gap-1">
                                 <p>Logging in...</p>
                                 <div className="relative top-2"><SavingSpinner/></div>
                            </div>
                        }</button>

                    </div>
                    {error?<p style={{color:"red",textAlign:"center"}}>Please enter valid email and password</p>:""}
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
                <div className="mt-12 text-white flex flex-col items-center mb-10">
                    <b>Don't have an account yet?</b>
                    <button className="w-64 cursor-pointer" onClick={(e)=>{
                        e.preventDefault();
                        navigation("/signup");
                    }}>Signup</button>
                </div>
            </div>
        </div>
    )

}
export default Login;