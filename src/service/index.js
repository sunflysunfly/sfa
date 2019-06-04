import axios from 'axios';
axios.interceptors.request.use(function(config){
    config.headers.Authorization='123456';
    return config;
})
export default{
    login(data){
        return axios.get(data);
    }
}