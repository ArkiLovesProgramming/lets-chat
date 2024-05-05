import axios from "axios"

// const base_url = "https://letschat.api.arkilovesprogramming.com:443/api"
const base_url = "http://localhost:8080/api"

// Request interceptors for API calls
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const userApi ={


    adduser(username, password){
        let data = {username, password}
        return axios.post(`${base_url}/user/adduser`, data)
    },

    login(username, password){
        let data = {username, password}
        return axios.post(`${base_url}/user/login`, data)
    },

    getUserById(userId){
        return axios.get(`${base_url}/user/getUserById/${userId}`)
    },

    getUsersByIdS(ids){
        let data = {userIds: ids}
        return axios.post(`${base_url}/user/getUsersByIds`, data)
    },

    getUsersByUsername(username){
        return axios.get(`${base_url}/user/getUsersByUsername/${username}`)
    }
}

const groupApi = {
    getContacts(userId){
        return axios.get(`${base_url}/group/getContacts/${userId}`)
    },

    getContactGroups(userId){
        return axios.get(`${base_url}/group/getContactGroups/${userId}`)
    },

    getGroupById(groupId){
        return axios.get(`${base_url}/group/getGroupById/${groupId}`)
    }, 

    addContact(userId1, userId2){
        return axios.get(`${base_url}/group/addContact/${userId1}/${userId2}`)
    },
    
    quiteGroup(groupId, userId){
        return axios.get(`${base_url}/group/quitGroup/${groupId}/${userId}`)
    }
}

const messageApi = {
    getLastMessageByGroupId(groupId){
        return axios.get(`${base_url}/message/getLastMessageByGroupId/${groupId}`)
    },

    allMessagesByGroupId(groupId){
        return axios.get(`${base_url}/message/allMessagesByGroupId/${groupId}`)
    }
}

let api = {userApi, groupApi, messageApi}
export default api
