import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./scenes/dashboard";
import { Routes, Route } from "react-router-dom";
import Reports from "./scenes/Reports";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import EmailAnalysis from "./scenes/emailAnalysis";
import AppWrapper from "./components/AppWrapper";
import Login from "./scenes/Login";

function App() {
  const [colorMode, theme] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<AppWrapper child={<Dashboard />} />} />
          <Route
            path="/email-analysis"
            element={<AppWrapper child={<EmailAnalysis />} />}
          />
          <Route path="/reports" element={<AppWrapper child={<Reports />} />} />
          <Route path="/faq" element={<AppWrapper child={<FAQ />} />} />
          <Route path="/form" element={<AppWrapper child={<Form />} />} />

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
