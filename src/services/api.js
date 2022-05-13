import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemaagely.com.br:8345/recrutamentoagely",
  headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
});

export default api;
