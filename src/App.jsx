import { Outlet, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Keys from './pages/Keys';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import AccessDenied from './pages/AccessDenied';
// import Equipments from './pages/Equipments';
import ClassroomLog from './pages/ClassroomLog';
import Management from './pages/Management';
import Teacher from './pages/Teacher'
import Implementando from './pages/Implementando';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Keys />} />
        <Route path='/login' element={<Login />} />
        <Route path='/management' element={
          <ProtectedRoute
            errorPage={<AccessDenied />}
            targetPage={<Outlet />} />} >
          <Route path='' element={<Management />} />
          <Route path='classroomlog' element={<ClassroomLog />} />
          <Route path='teacher' element={<Teacher />} />
          <Route path='implementando' element={<Implementando />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
