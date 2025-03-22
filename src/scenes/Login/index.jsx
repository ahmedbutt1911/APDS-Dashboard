import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from '../../stores/AuthStore';
import { useNavigate } from "react-router-dom";
import { login } from '../../services/authService'

function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const { user } = useAuthStore();
  const [loginToken, setLoginToken] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    onSuccess: (codeResponse) => {
      setLoginToken(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (loginToken?.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${loginToken?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${loginToken.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          login({ ...res.data, access_token: loginToken?.access_token }).then((res1) => {
            setUser({ ...res.data, access_token: res1.data?.access_token, refresh_token: res1.data?.refresh_token });
            setAuthenticated(true);
            console.log({ ...res.data, access_token: res1.data?.access_token, refresh_token: res1.data?.refresh_token });
            console.log(user);

            navigate("/"); // Redirect to home page after setting user
          }).catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, [loginToken, setUser, navigate]);


  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <button onClick={handleGoogleLogin}>Sign in with Google 🚀 </button>
    </div>
  );
}

export default Login;
