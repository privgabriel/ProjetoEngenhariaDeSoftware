"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IFormDataTool {
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: string;
    status: boolean;

}

export default function NewTool() {
    const router = useRouter();
    const [formDataTool, setFormDataTool] = useState<IFormDataTool>({
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        data_aquisicao: "",
        status: true,
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {name, value, type} = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target.type);

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormDataTool((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
            setFormDataTool((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const formatDataAquisicao = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const makePostRequest = async () => {
        try {
            const formattedDataAquisicao = formatDataAquisicao(formDataTool.data_aquisicao);

            console.log(formDataTool, formattedDataAquisicao);

            const response = await api.post("/equipamentos", {
                ...formDataTool,
                birth_date: formattedDataAquisicao,
            });

            console.log("Dados enviados com sucesso!");
            console.log("Resposta:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center my-8">
            <form
                className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Tipo de Manutenção</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formDataTool.tipo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Marca</label>
                    <input
                        type="text"
                        name="marca"
                        value={formDataTool.marca}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Modelo</label>
                    <input
                        type="text"
                        name="modelo"
                        value={formDataTool.modelo}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Número de serie</label>
                    <input
                        type="string"
                        name="numero_serie"
                        value={formDataTool.numero_serie}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Data de Aquisição</label>
                    <input
                        type="date"
                        name="data_aquisicao"
                        value={formDataTool.data_aquisicao}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
                    <label>Status</label>
                    <input
                        type="checkbox"
                        name="Disponivel"
                        checked={formDataTool.status}
                        onChange={handleChange}
                        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
                    />
                </div>

                <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
                    <button
                        type="button"
                        onClick={makePostRequest}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cadastrar Ferramenta
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