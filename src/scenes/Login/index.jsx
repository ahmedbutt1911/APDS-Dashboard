import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { sendMessageToExtension } from "../../services/extensionService";
import { useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [loginToken, setLoginToken] = useState("");
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
          login({ ...res.data, access_token: loginToken?.access_token })
            .then((res1) => {
              const userData = {
                ...res.data,
                access_token: res1.data?.access_token,
                refresh_token: res1.data?.refresh_token,
              };
              console.log(userData);
              setUser(userData);
              setAuthenticated(true);
              sendMessageToExtension(userData);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, [loginToken, setUser, navigate]);

  return (
    <div>
      <div className="loginBox">
        <div>
          <Header title="APDS" subtitle="Advanced Phishing Email Detection" />
          <hr />
          <Button
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            🚀 Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
