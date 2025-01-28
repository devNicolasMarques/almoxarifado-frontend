import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { OrbitProgress } from 'react-loading-indicators'
import apiInstance from "../api/axiosInstance";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false)

  async function loginUser() {
    try {
        const res = await apiInstance.post(`/auth/login`, {  
        email,
        password,
      });
      sessionStorage.setItem("token", res.data.token);
      setLoading(false)
      return true;
    } catch {
      toast.error("Ocorreu algum erro.", {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    await loginUser();
    navigate("/management");
  }

  return (
    <>
      <div className=" w-2/5 bg-white flex flex-col">
        <div className="flex justify-center items-center py-3">
          <h1 className="">Área de gerenciamento</h1>
        </div>
        <div className=" flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center my-5 w-full text-sm text-gray-text font-medium p-2"
          >
            <div className=" flex items-start w-3/4 flex-col">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className=" h-3/4 w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm rounded-sm pr-3 pl-1 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Digite o usuário"
              />
            </div>
            <div className=" flex items-start w-3/4 flex-col">
              <label htmlFor="pass">Senha</label>
              <input
                value={password}
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                className="h-3/4 w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm rounded-sm pr-3 pl-1 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="******************"
              />
            </div>
            <button
              type="submit"
              className="my-3 text-white bg-blue-senai hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

        { loading &&  
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <OrbitProgress dense color="#418ce9" size="small" text="" textColor="" />
            </div> 
        }
    </>
  );
}
