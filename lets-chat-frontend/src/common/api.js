import axios from "axios"

const base_url = "https://letschat.api.arkilovesprogramming.com:443/api"

const token = localStorage.getItem("token")

// 创建 Axios 实例
const axiosInstance = axios.create({
    // timeout: 5000, // 设置超时时间
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
  

const userApi ={


    adduser(username, password){
        let data = {username, password}
        return axiosInstance.post(`${base_url}/user/adduser`, data)
    },

    login(username, password){
        let data = {username, password}
        return axiosInstance.post(`${base_url}/user/login`, data)
    },

    getUserById(userId){
        return axiosInstance.get(`${base_url}/user/getUserById/${userId}`)
    },

    getUsersByIdS(ids){
        let data = {userIds: ids}
        return axiosInstance.post(`${base_url}/user/getUsersByIds`, data)
    },

    getUsersByUsername(username){
        return axiosInstance.get(`${base_url}/user/getUsersByUsername/${username}`)
    }
}

const groupApi = {
    getContacts(userId){
        return axiosInstance.get(`${base_url}/group/getContacts/${userId}`)
    },

    getContactGroups(userId){
        return axiosInstance.get(`${base_url}/group/getContactGroups/${userId}`)
    },

    getGroupById(groupId){
        return axiosInstance.get(`${base_url}/group/getGroupById/${groupId}`)
    }, 

    addContact(userId1, userId2){
        return axiosInstance.get(`${base_url}/group/addContact/${userId1}/${userId2}`)
    },
    
    quiteGroup(groupId, userId){
        return axiosInstance.get(`${base_url}/group/quitGroup/${groupId}/${userId}`)
    }
}

const messageApi = {
    getLastMessageByGroupId(groupId){
        return axiosInstance.get(`${base_url}/message/getLastMessageByGroupId/${groupId}`)
    },

    allMessagesByGroupId(groupId){
        return axiosInstance.get(`${base_url}/message/allMessagesByGroupId/${groupId}`)
    }
}

let api = {userApi, groupApi, messageApi}
export default api
