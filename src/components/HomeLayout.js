import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";


function HomeLayout(){
    return(
        <div className="flex min-h-screen bg-stone-400">
                <Sidebar className=""/>
                <div className=" basis-full md:basis-4/5 min-h-full bg-red-300 relative">
                    <Header/>
                    <Outlet/>
                </div>
        </div>
    )
}

export default HomeLayout;