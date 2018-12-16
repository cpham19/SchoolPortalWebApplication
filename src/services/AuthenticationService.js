import Api from '@/services/Api'

export default {
    login (credentials) {
        return Api().post('', credentials).then(response => { 
            return response
        })
        .catch(error => {
            return error.response
        });
    },
    register (credentials) {
        return Api().post('register', credentials).then(response => { 
            return response
        })
        .catch(error => {
            return error.response
        });
    }
}