import axios from "axios";

export const axiosService = axios.create({ baseURL: 'https://api.chucknorris.io/' });