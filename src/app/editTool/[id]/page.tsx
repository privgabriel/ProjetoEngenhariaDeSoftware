"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

interface IPostParams extends Params {
    id: number;
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

export default function EditTool() {
    const router = useRouter();
    const params: IPostParams = useParams();
    const { id } = params;
    const [tool, setTool] = useState<ITool>({
        id: 0,
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        data_aquisicao: "",
        status: true,
    });

    useEffect(() => {
        const fetchTool = async () => {
            try {
                console.log(id);
                const response = await api.get(`/equipamentos/${id}`);
                const toolData: ITool = response.data;
                const formattedBirthDate = new Date(toolData.data_aquisicao)
                    .toISOString()
                    .split("T")[0];
                setTool({ ...toolData, data_aquisicao: formattedBirthDate });
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };

        if (id) {
            fetchTool();
        }
    }, [id]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setTool((prevTool) => ({
                ...prevTool,
                [name]: checked,
            }));
        } else {
            setTool((prevTool) => ({
                ...prevTool,
                [name]: value,
            }));
        }
    };

    const formatDataAquisicao = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const handleUpdateUser = async () => {
        try {
            const formattedDataAquisicao = formatDataAquisicao(tool.data_aquisicao);

            const response = await api.put(`/equipamentos/${id}`, {
                ...tool,
                data_aquisicao: formattedDataAquisicao,
            });

            console.log("Dados atualizados com sucesso!");
            console.log("Resposta:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center my-8">
            <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Tipo de Manutenção</label>
                    <input
                        type="text"
                        name="tipo"
                        value={tool.tipo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Marca</label>
                    <input
                        type="text"
                        name="marca"
                        value={tool.marca}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Modelo</label>
                    <input
                        type="text"
                        name="modelo"
                        value={tool.modelo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Número de serie</label>
                    <input
                        type="string"
                        name="numero_serie"
                        value={tool.numero_serie}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Data de Aquisição</label>
                    <input
                        type="date"
                        name="data_aquisicao"
                        value={tool.data_aquisicao}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Status</label>
                    <input
                        type="checkbox"
                        name="Disponivel"
                        checked={tool.status}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
                    <button
                        type="button"
                        onClick={handleUpdateUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Atualizar Ferramenta
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}