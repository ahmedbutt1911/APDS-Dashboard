import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TuneIcon from "@mui/icons-material/Tune";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataInvoices } from "../../data/mockData";
// import EditIcon from "@mui/icons-material/Edit";
import AnalyticsIcon from "@mui/icons-material/Analytics";
// import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useAuthStore } from "../../stores/AuthStore";

const EmailAnalysis = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/emails`, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "application/json",
          },
        });

        setEmailData(response.data);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchEmailData();
  }, []);

  useEffect(() => {
    console.log(emailData);
  }, [emailData]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "body",
      headerName: "Body",
      flex: 3,
    },
    {
      field: "category_id",
      headerName: "Category",
      renderCell: (params) => {
        const categoryId = params.row.category_id;
        return categoryId === 2 ? "Legitimate" : "Spam";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="ActionsCol">
          <Button
            component={Link}
            to={`/reports/${params.row.id}`}
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "normal",
              padding: "5px 10px",
              textTransform: "none",
            }}
          >
            <AnalyticsIcon sx={{ mr: "10px" }} />
            View Analysis
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Email Analysis" subtitle="List of Analyzed Emails" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <TuneIcon sx={{ mr: "10px" }} />
            Filters
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root ": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={emailData}
          columns={columns}
          // components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default EmailAnalysis;
