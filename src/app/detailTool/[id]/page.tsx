"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface IToolParams extends Params {
    id: string;
}


interface ITool {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: string;
    status: boolean;

}

export default function UserDetails() {
    const router = useRouter();
    const params: IToolParams = useParams();
    const { id } = params;
    const [tool, setTool] = useState<ITool | null>(null);
    useEffect(() => {
        const fetchTool = async () => {
            try {
                const response = await api.get(`/equipamentos/${id}`);
                setTool(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };
        if (id) {
            fetchTool();
        }
    }, [id]);
    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Detalhes da Ferramenta
            </h1>
            {tool ? (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
                    <h2 className="font-bold text-xl text-black text-center uppercase mb-2">
                        ID da ferramenta: {tool.id}
                    </h2>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Tipo:</strong> {tool.tipo}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Marca:</strong> {tool.marca}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Modelo:</strong> {tool.modelo}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Numero de serie:</strong> {tool.numero_serie}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Data de Aquisição:</strong> {tool.data_aquisicao}
                    </p>
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        <strong>Status:</strong> {tool.status ? "Disponivel" : "Em uso"}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
                    <p className="font-bold text-xl text-black text-center uppercase mb-2">
                        Carregando...
                    </p>
                </div>
            )}
            {}
            <div className="flex justify-center">
                <button
                    onClick={handleGoBack}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}