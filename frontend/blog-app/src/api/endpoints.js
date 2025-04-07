import axios from 'axios';

const base_url = 'http://127.0.0.1:8000/api/'

const login_url = `${base_url}login/`
const register_url = `${base_url}register/`
const logout_url = `${base_url}logout/`

axios.defaults.withCredentials = true;

export const login = async (username, password) => {
    try{
        const response = await axios.post(
            login_url,
            {username, password},
            {withCredentials:true}
        );
        return response.data
    } catch (error) {
        console.log("Login failed:", error)
        return false
    }
}