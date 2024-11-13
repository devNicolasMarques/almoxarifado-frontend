import SideBar from "../components/Sidebar";
import ManagementClassroom from "../components/ManagementClassroom";

export default function Management() {
    return (
        <>
            <div className="flex flex-row">
                 <SideBar/>
                 <ManagementClassroom/>
            </div>
           
        </>
    )
}