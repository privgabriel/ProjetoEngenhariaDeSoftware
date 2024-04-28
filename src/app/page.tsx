"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";

interface ITool {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: string;
  status: boolean;

}

async function fetchUsers(): Promise<any> {
  const result = await api.get("/equipamentos");
  return result.data;
}

export default function Home() {
  const [tools, setTools] = useState<ITool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredTools, setFilteredTools] = useState<ITool[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const getTools = async () => {
      const toolData = await fetchUsers();
      setTools(toolData);
      setFilteredTools(toolData);
      setLoading(false);
    };
    getTools();
  }, []);
  const handleDeleteTools = async (toolId: number) => {
    try {
      await api.delete(`/equipamentos/${toolId}`);
      setTools(tools.filter((tool) => tool.id !== toolId));
      setFilteredTools(filteredTools.filter((tool) => tool.id !== toolId));
    } catch (error) {
      console.error("Erro ao excluir o equipamento:", error);
    }
  };
  const handleSearch = () => {
    const filtered = tools.filter((tool) =>
        tool.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTools(filtered);
  };
  if (loading) {
    return (
        <main className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
        </main>
    );
  }

  return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Manutenção</h1>
        <div className="flex mb-8 mt-8 justify-center items-center">
          <input
              type="text"
              placeholder="Filtrar por tipo (Ex: Notebook)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
          />
          <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Filtrar
          </button>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.length > 0 ? (
              filteredTools.map((tool: ITool) => {
                return (
                    <div
                        key={tool.id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
                    >
                      <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                        <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                          <Link href={`/detailTool/${tool.id}`}>
                            {tool.tipo}
                          </Link>
                        </h2>
                      </div>

                      <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                        <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {tool.id}
                  </span>
                        <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {tool.status ? "Disponivel" : "Em uso"}
                  </span>
                      </div>
                      <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                        <button
                            onClick={() => handleDeleteTools(tool.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Excluir
                        </button>
                        <Link href={`/editTool/${tool.id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                            Editar
                          </button>
                        </Link>
                        <Link href={`/detailTool/${tool.id}`}>
                          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Detalhes
                          </button>
                        </Link>
                      </div>
                    </div>
                );
              })
          ) : (
              <h1>Nenhuma Ferramenta usada!</h1>
          )}
        </section>
      </main>
  );
}