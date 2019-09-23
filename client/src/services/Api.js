import axios from 'axios'
import store from '@/store/store'

//https://goschoolportal.herokuapp.com/
//http://localhost:8081

export default () => {
    return axios.create({
        baseURL: `https://goschoolportal.herokuapp.com/`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}