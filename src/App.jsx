import { useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./scenes/dashboard";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Reports from "./scenes/Reports";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import EmailAnalysis from "./scenes/emailAnalysis";
import AppWrapper from "./components/AppWrapper";
import Login from "./scenes/Login";
import { useAuthStore } from "./stores/AuthStore"; // Import AuthStore
import { refreshToken } from "./services/authService"; // Import refreshToken

function App() {
  const [colorMode, theme] = useMode();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshToken(navigate).catch((err) =>
          console.error("Failed to refresh token:", err)
        );
      }, 15 * 60 * 1000); // Refresh token every 15 minutes

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [isAuthenticated, navigate]);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/auth/login" />;
  };

  const PublicRoute = ({ element }) => {
    return !isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/auth/login"
            element={<PublicRoute element={<Login />} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute element={<AppWrapper child={<Dashboard />} />} />
            }
          />
          <Route
            path="/email-analysis"
            element={
              <PrivateRoute
                element={<AppWrapper child={<EmailAnalysis />} />}
              />
            }
          />
          <Route
            path="/reports/:id"
            element={
              <PrivateRoute element={<AppWrapper child={<Reports />} />} />
            }
          />
          <Route
            path="/faq"
            element={<PrivateRoute element={<AppWrapper child={<FAQ />} />} />}
          />
          <Route
            path="/form"
            element={<PrivateRoute element={<AppWrapper child={<Form />} />} />}
          />
          <Route path="*" element={<Navigate to="/" />} /> {/* Default route */}
          {/* <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} /> */}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
