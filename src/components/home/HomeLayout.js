import {Outlet} from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { account } from "../../appwrite/appwriteConfig";
import { sessionPresent } from "../../redux/features/login/loginSlice";
import { fetchAccountData } from "../../redux/features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



function HomeLayout(){
    const dispatch=useDispatch();
    const theme=useSelector((state)=>state.settings.darkMode);

    async function getSession(){
        try{
        const session=await account.getSession('current');
        //console.log(session);
        dispatch(sessionPresent());
        dispatch(fetchAccountData());
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getSession();
    },[])
    return(
        <div className="flex h-screen bg-red-400">
                <Sidebar/>
                <div className={`basis-full md:basis-4/5 h-full ${!theme?"bg-zinc-900":"bg-zinc-50"} overflow-y-scroll`}>
                    <Header/>
                    <Outlet/>
                </div>
        </div>
    )
}

export default HomeLayout;