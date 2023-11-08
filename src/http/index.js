import axios from "axios";

const $api = axios.create({
    baseURL: "https://crypto.cmd-root.com/api/",
    withCredentials: true,

})


// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

export default $api