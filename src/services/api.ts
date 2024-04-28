// api.js
import axios from "axios";

// Define a URL base da API
const baseURL = "http://localhost:3000";

// Configuração do Axios
const instance = axios.create({
    baseURL,
    // Outras configurações, se necessário
});

export default instance;