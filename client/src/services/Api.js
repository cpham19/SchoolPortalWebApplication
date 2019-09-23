import axios from 'axios'
import store from '@/store/store'

//https://csula-center.herokuapp.com/
//http://localhost:8081

export default () => {
    return axios.create({
        baseURL: `http://localhost:8081`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}