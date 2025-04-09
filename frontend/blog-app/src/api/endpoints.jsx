import axios from 'axios';

const base_url = 'http://127.0.0.1:8000/api/'

const login_url = `${base_url}login/`
const register_url = `${base_url}register/`
const logout_url = `${base_url}logout/`
const authenticated_url = `${base_url}authenticated/`
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
    try{
        const response = await axios.post(
            login_url,
            {username, password},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data
    } catch (error) {
        console.log("Login failed:", error)
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(logout_url, {}, {withCredentials: true});
        return response.data
    } catch (error) {
        console.log("Logout failed:", error);
        throw error;
    }
}

export const register = async (firstName, lastName, username, email, password) =>{
    try {
        const data = {
            first_name: firstName,
            last_name: lastName || "",
            username,
            email,
            password
        };
        
        console.log("Sending registration data:", data);
        
        const response = await axios.post(
            register_url, 
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Registration failed:", error);
        console.log("Error response data:", error.response?.data);
        throw error;
    }
}

export const authenticated_user = async () => {
    try {
        const response = await axios.get(authenticated_url, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    } catch (error) {
        console.log("Authentication check failed:", error);
        throw error;
    }
}