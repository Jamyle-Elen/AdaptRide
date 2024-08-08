import Axios from 'axios'

const api = Axios.create({
    baseURL: "http://localhost:3000"
})

// npm run start:api
// pra iniciar o servidor json server
export default api;
