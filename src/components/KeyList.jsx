import { useEffect, useState } from "react"
// import Filter from "../assets/Filter"
// import ArrowUp from "../assets/ArrowUp"
// import ArrowDown from "../assets/ArrowDown"
// import IsAvailable from "../assets/IsAvailable"
import { Bounce, toast, ToastContainer } from "react-toastify"
import apiInstance from "../api/axiosInstance"

export default function KeyList() {

    const [instructor, setInstructor] = useState([])

    const [list, setList] = useState([])

    const [selectedInstructor, setSelectedInstructor] = useState({ name: '', surname: '' })

    useEffect(() => {
        console.log(selectedInstructor)
    }, [selectedInstructor])


    const getClassroom = async () => {
        const res = await apiInstance.get(`/classroom`);
        setList(res.data.teacherClassroom)
    }

    const getTeacher = async () => {
        const res = await apiInstance.get(`/teacher`);
        setInstructor(res.data)
    }

    useEffect(() => {
        getClassroom()
        getTeacher()
    }, [])

    const giveBackClassroom = async (classroom, teacherName, teacherSurname) => {

        try {
            await apiInstance.post(`/classroom/giveback`, {
                classroom, teacherName, teacherSurname
            });

            toast.success('Devolução concluída', {
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

            getClassroom();
        } catch{
            toast.error('Ocorreu algum erro durante a devolução.', {
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
            return; // Interrompe a execução da função se a validação falhar
        }
    }


    const borrowClassroom = async (classroom, teacherName, teacherSurname) => {

        
        if (!teacherName || teacherName === 'Selecione o professor' || !teacherName || teacherName === 'Selecione' && teacherSurname === 'o') {
            toast.error('Por favor, selecione um professor válido!', {
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
            return; // Interrompe a execução da função se a validação falhar
        }

        try{
            await apiInstance.post(`/classroom/borrow`, {
                classroom, teacherName, teacherSurname
            });
        toast.success('Empréstimo realizado!', {
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

        getClassroom();
        } catch{
            toast.error('Ocorreu algum erro.', {
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
            return; // Interrompe a execução da função se a validação falhar
        }
    }


    const InstructorDataItems = ({ items }) => {

        return items.teacher.map((instructor, index) =>
            <>
                <option value={`${instructor.name} ${instructor.surname}`}
                    key={index}
                    className=" text-center"
                >
                    {instructor.name} {instructor.surname}
                </option>
            </>
        )
    }

    const ArrayDataItems = ({ items }) => {

        return items.map((classroom, index) =>
            <>
                <tr className="bg-white border-b text-center"
                    key={index} >
                    <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {classroom.classroom.name}
                    </td>
                    <td className="px-6 py-4">
                        {classroom.classroom.floor}
                    </td>
                    {
                        classroom.classroom.isAvailable == false ?
                            <td className="px-6 py-4">
                                <span className="p-1 px-2 rounded-lg bg-red-200 text-red-700 font-medium">
                                    Indisponível
                                </span>
                            </td> :
                            <td className="px-6 py-4">
                                <span className="p-1 px-4 rounded-lg bg-green-200 text-green-700 font-medium">
                                    Disponível
                                </span>
                            </td>
                    }
                    <td className="px-6 py-4">
                        {
                            classroom.classroom.isAvailable == false ? `${classroom.teacher.name} ${classroom.teacher.surname}` :
                                <select onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    const [name, surname] = selectedValue.split(" ");
                                    setSelectedInstructor({ name, surname });
                                }}
                                    value={`${selectedInstructor.name} ${selectedInstructor.surname}`}
                                    className=" px-0 text-sm text-gray-link bg-transparent border-0 border-b-2appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                    <option selected>Selecione o professor</option>
                                    <InstructorDataItems items={instructor} />
                                </select>
                        }
                    </td>
                    {
                        classroom.classroom.isAvailable == true ? <td className="px-6 py-4 uppercase text-blue-actions font-medium"><span className="cursor-pointer" onClick={() => borrowClassroom(classroom.classroom.name, selectedInstructor.name, selectedInstructor.surname)}>Emprestar</span></td> :
                            <td className="px-6 py-4 uppercase text-blue-actions font-medium"><span className="cursor-pointer" onClick={() => giveBackClassroom(classroom.classroom.name, instructor.name, instructor.surname)}>Devolver</span></td>
                    }

                </tr>
            </>
        )
    };

    return (
        <>
            <div className="flex flex-col w-3/4">
                <div className="flex justify-between">
                    <div className="relative my-5 w-1/2">
                        <input type="email" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Pesquisar sala" />
                        <button className="absolute left-1 top-1 rounded p-1.5 border border-transparent text-center text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {/* <div className="flex">
                        <button className="rounded p-1.5 text-center text-sm " type="button">
                            <Filter />
                        </button>
                        <button className="rounded p-1.5 text-center text-sm" type="button">
                            <ArrowUp />
                        </button>
                        <button className="rounded p-1.5 text-center text-sm" type="button">
                            <ArrowDown />
                        </button>
                        <button className="rounded p-1.5 border border-transparent text-center text-sm  transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <IsAvailable />
                        </button>
                    </div> */}
                </div>
                <div className="relative overflow-x-auto w-full rounded-md">
                    <table className="w-full text-sm text-gray-link">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sala
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Andar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Professor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <ArrayDataItems items={list} />
                        </tbody>
                    </table>
                </div>
            </div >
            <ToastContainer />
        </>

    )
}