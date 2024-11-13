import Logs from "../components/Logs"
import SideBar from "../components/Sidebar"

export default function ClassroomLog() {
    return (
    <>
     <div className="flex flex-row">
        <SideBar/>
        <Logs />
        </div>
    </>
    )
}