import { Box, Button, Typography, Avatar, useTheme } from "@mui/material";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { useAuthStore } from "../../stores/AuthStore";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { logoutExtension } from "../../services/extensionService";

const UserSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${config.backendUrl}/auth/delete-user`,
          {}, // POST body (empty if not needed)
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response) {
          googleLogout();
          logout();
          logoutExtension();
          navigate("/auth/login");
        } else {
          alert("Something went wrong. Please try again");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Unauthorized or session expired");
      }
    };
    fetchData();
  };

  return (
    <Box m="20px">
      <Header
        title="User Settings"
        subtitle="You can change your profile settings here."
      />

      <Box
        mt="40px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        p="30px"
        backgroundColor={colors.primary[400]}
      >
        <Avatar
          alt={user.name}
          src={user.picture}
          sx={{ width: 175, height: 175, mb: 1 }}
        />
        <Typography variant="h2" color={colors.grey[100]}>
          {user.name}
        </Typography>

        <Typography
          color={colors.grey[300]}
          fontSize="16px"
          textAlign="center"
          maxWidth="400px"
        >
          Are you sure you want to delete your profile?
          <br />
          This action is permanent and cannot be undone.
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{
            mt: 2,
            padding: "8px 20px",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "0",
            textTransform: "none",
          }}
        >
          Delete Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserSettings;
