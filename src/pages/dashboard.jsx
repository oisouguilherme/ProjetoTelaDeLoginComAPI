import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Cadastro from "./components/Add";

const DashBoard = () => {
  const router = useRouter();
  const [objetos, setObjetos] = useState([]);

  const handleLogout = () => {
    alert("Sessão encerrada!")
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      axios
        .get("https://m2devadmin.softkuka.com.br/api/Vendedor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setObjetos(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
   
    <div className="container mx-auto flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full flex justify-between items-center mb-8 lg:w-1/3">
        <h1 className="text-4xl font-bold">Lista de objetos</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
      <ul className="w-full lg:w-1/3 text-xl space-y-3 pb-12">
        {objetos.length > 0 ? (
          objetos.map((objeto) => (
            <li key={objeto.id}>
              {" "}
              <p> <span className="font-medium">Nome: </span>{objeto.nome}</p> 
              <p> <span className="font-medium">CNPJ: </span>{objeto.cnpj}</p>
              <p><span>Criado em: {objeto.criadoEm}</span></p>
            </li>
          ))
        ) : (
          <>
            <div className="flex items-center justify-center animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </div>
          </>
        )}
      </ul>
      <Cadastro/>
    </div>
    </>
  );
};

export default DashBoard;
