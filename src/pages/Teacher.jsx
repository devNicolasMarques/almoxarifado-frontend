import SideBar from "../components/Sidebar";
import ManagementTeacher from '../components/ManagementTeacher'

export default function Team() {
    return (
        <>
            <div className="flex flex-row">
                 <SideBar/>
                 <ManagementTeacher/>
            </div>
           
        </>
    )
}