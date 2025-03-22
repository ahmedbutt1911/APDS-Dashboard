import axios from "axios";
import config from "../config";
import { useAuthStore } from "../stores/AuthStore";
import { googleLogout } from "@react-oauth/google";

const login = (payload) => {
    return axios.post(
        `${config.backendUrl}/auth/login`,
        payload
    );
};

const logout = (navigate) => {
    const { user, logout } = useAuthStore.getState(); // Access the user state directly
    return axios.post(
        `${config.backendUrl}/auth/logout`,
        { refresh_token: user?.refresh_token },
        {
            headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
            },
        }
    ).then(() => {
        googleLogout();
        logout();
        navigate("/auth/login");
    });
};

const refreshToken = (navigate) => {
    const { user, setUser, logout } = useAuthStore.getState(); // Access the user state directly

    return axios.post(
        `${config.backendUrl}/token/refresh/`,
        { refresh: user?.refresh_token },
        {
            headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
            },
        }
    ).then(response => {
        setUser({ ...user, access_token: response.data?.access, refresh_token: response.data?.refresh });
        return response.data?.access_token;
    }).catch(() => {
        logout(navigate).then(() => {
            googleLogout();
            logout();
            navigate("/auth/login");
        });
    });
};

export { login, logout, refreshToken };