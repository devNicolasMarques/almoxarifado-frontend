import { useEffect, useState } from "react"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import apiInstance from "../api/axiosInstance";


export default function ManagementTeacher() {

    const [instructor, setInstructor] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [editId, setEditId] = useState(0)

    const getTeacher = async () => {
        try {
            const res = await apiInstance.get(`/teacher`);
            setInstructor(res.data.teacher);
        } catch (error) {
            console.log(error);
        }
    };
    
    const registerTeacher = async () => {
        try {
            await apiInstance.post(`/teacher/register`, {
                name, surname, email, code
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const updateTeacher = async () => {
        try {
            const id = editId;
            await apiInstance.put(`/teacher/update`, {
                id, name, surname, email, code
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const deleteTeacher = async (id) => {
        try {
            await apiInstance.post(`/teacher/delete`, { id });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(name,surname,code,email)
    }, [name,surname,code,email

    ])

    useEffect(() => {
        getTeacher()
    }, [])


    const openRegisterDialog = () => {
        setIsOpen(true);
    };

    const openEditDialog = (id) => {
        console.log(id)
        setEditId(id)
        setIsOpenEdit(true);
    };

    async function handleUpdate(e) {
        e.preventDefault();
        try {

            await updateTeacher(editId);

            setIsOpen(false);

            await getTeacher();

            toast.success('Atualizado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setIsOpenEdit(false)

        } catch (error) {

            setIsOpenEdit(false)

            toast.error('Ocorreu um erro. Tente novamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            console.log(error)
        }
    }


    async function handleSubmit(e) {

        e.preventDefault();

        try {
            await registerTeacher();
            setIsOpen(false);
            await getTeacher();

            toast.success('Registrado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (error) {

            console.log(error)
        }
    }

    const handleDelete = async (id) => {

        try {

            await deleteTeacher(id);

            await getTeacher();

            toast.success('Professor deletado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (error) {
            toast.error('Erro ao deletar professor', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log(error)
        }
    }

    const ArrayDataItems = ({ items }) => {
        console.log(items)
        return items.map((teacher, index) =>
            <>
                <tr className="bg-white border-b text-center"
                    key={index} >
                    <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {teacher.id}
                    </td>
                    <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {teacher.name}
                    </td>
                    <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {teacher.surname}
                    </td>
                    <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {teacher.email}
                    </td>
                    <td>
                        <span>
                            <span>
                                <button onClick={() => openEditDialog(teacher.id)} className=" hover:bg-amber-400 hover:text-white rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>

                                </button>
                            </span>
                            <button onClick={() => { handleDelete(teacher.id) }} className=" hover:bg-red-500 hover:text-white rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </span>
                    </td>
                </tr>
            </>
        )
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-lg font-bold mb-4">Registrar professor</h2>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Nome" />
                            <input onChange={(e) => setSurname(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Sobrenome" />
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <input onChange={(e) => setCode(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Código" />
                            <div className="flex justify-end">
                                <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isOpenEdit && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <form onSubmit={handleUpdate}>
                            <h2 className="text-lg font-bold mb-4">Editar professor</h2>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Nome" />
                            <input onChange={(e) => setSurname(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Sobrenome" />
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <input onChange={(e) => setCode(e.target.value)} type="text" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-2 py-2 my-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Código" />
                            <div className="flex justify-end">
                                <button onClick={() => setIsOpenEdit(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">
                                    Cancelar
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Atualizar
                                </button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            )}



            <div className="flex flex-col w-full items-center">
                <div className="flex justify-between w-3/4">
                    <div className="relative my-5 w-1/2">
                        <input type="email" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Pesquisar professor" />
                        <button className="absolute left-1 top-1 rounded p-1.5 border border-transparent text-center text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center">
                        {/* <button onClick={() => { navigateToClassroomLog() }} className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 ">Visualizar registros</button> */}
                        <button onClick={() => { openRegisterDialog() }} className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 ">Registrar professor</button>
                    </div>
                </div>
                <div className="relative overflow-x-autorounded-md w-3/4 overflow-y-auto max-h-table">
                    <table className="w-full text-sm text-gray-link">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sobrenome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <ArrayDataItems items={instructor} />
                        </tbody>
                    </table>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}