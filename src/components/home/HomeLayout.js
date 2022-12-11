import {Outlet} from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";


function HomeLayout(){
    return(
        <div className="flex h-screen bg-red-400">
                <Sidebar/>
                <div className="basis-full md:basis-4/5 h-full bg-zinc-900 overflow-y-scroll">
                    <Header/>
                    <Outlet/>
                </div>
        </div>
    )
}

export default HomeLayout;