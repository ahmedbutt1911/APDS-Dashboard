import axios from "axios";
import config from "../config";
import { useAuthStore } from "../stores/AuthStore";

const login = (payload) => {
    return axios.post(
        `${config.backendUrl}/auth/login`,
        payload
    );
}

const logout = () => {
    const { user } = useAuthStore.getState(); // Access the user state directly
    return axios.post(
        `${config.backendUrl}/auth/logout`,
        { refresh_token: user?.refresh_token },
        {
            headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
            },
        }
    );
};

export { login, logout };