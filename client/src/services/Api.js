import axios from 'axios'
import store from '@/store/store'

export default () => {
    return axios.create({
        baseURL: `http://csula-center.herokuapp.com/`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}