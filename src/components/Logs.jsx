import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import apiInstance from "../api/axiosInstance"; // Importando a instância de axios

export default function Logs() {
    const [logList, setLogList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Função para obter os logs
    const getLogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await apiInstance.get('/manager/classroomlog');
            setLogList(res.data.classroomLog);
        } catch (error) {
            console.error("Erro ao obter logs: ", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getLogs(); // Carrega os logs quando o componente é montado
    }, [getLogs]);

    // Componente para renderizar as linhas da tabela
    const ArrayDataItems = ({ items }) => {
        return (
            <>
                {items.map((log, index) => (
                    <tr className="bg-white border-b text-center" key={index}>
                        <td scope="row" className="px-6 py-4 whitespace-nowrap">
                            {log.action}
                        </td>
                        <td className="px-6 py-4">
                            {dayjs(log.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex justify-between w-3/4 items-center rounded-full">
                <button onClick={() => navigate('../')} className="hover:bg-blue-actions hover:text-white h-1/2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div className="relative my-5 w-1/2">
                    <input type="email" className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Pesquisar registro" />
                    <button className="absolute left-1 top-1 rounded p-1.5 border border-transparent text-center text-sm  transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-autorounded-md w-3/4 overflow-y-auto max-h-table">
                {isLoading ? (
                    <div className="text-center py-4">Carregando...</div>
                ) : (
                    <table className="w-full text-sm text-gray-link">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ação
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data / Hora
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logList.length > 0 ? (
                                <ArrayDataItems items={logList} />
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                        Nenhum log encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
