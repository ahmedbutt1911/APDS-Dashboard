import { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const userRef = useRef(null);
  const profileRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [messageId, setMessageID] = useState("");

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      userRef.current = codeResponse;
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getMail = () => {
    if (userRef != null && profileRef != null) {
      axios
        .get(
          `https://gmail.googleapis.com/gmail/v1/users/${profileRef.current.id}/messages/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${userRef.current.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (userRef.current && userRef.current.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userRef.current.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userRef.current.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data.id);
          setProfile(res.data);
          profileRef.current = res.data;
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    profileRef.current = null;
  };

  const logData = () => {
    console.log(userRef.current, profileRef.current);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
          <button onClick={logData}>Log Data</button>

          <input
            type="text"
            value={messageId}
            onChange={(e) => setMessageID(e.target.value)}
          />
          <button onClick={() => getMail()}>Get Mail</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default Login;
