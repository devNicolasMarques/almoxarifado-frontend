import imgSenai from '../assets/senai-logo.png'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <div className="bg-blue-senai w-100 min-h-nav flex justify-between items-center">
                <div className=" p-4">
                    <img src={imgSenai} alt="" className=' h-8' />
                </div>
                <div className=" p-4">
                    <Link to={'/login'} className='text-white mx-5'>Área de gerenciamento</Link>
                    <Link to={'/'} className='text-white mx-5'>Chaves</Link>
                </div>
            </div>
        </>
    )
}