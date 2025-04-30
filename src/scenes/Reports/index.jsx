import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Shield from "@mui/icons-material/Shield";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import IconButton from "@mui/material/IconButton";
import LineChart from "../../components/LineChart";
import config from "../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import HtmlPreview from "./HtmlPreview";
import { useAuthStore } from "../../stores/AuthStore";

const Reports = () => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/reports/?email_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.length == 0) navigate("/email-analysis");
        setReportData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching email data:", error);
        navigate("/email-analysis");
      }
    };

    fetchReportData();
  }, [id]);

  useEffect(() => {
    console.log(reportData);
    reportData?.attributes?.map((i) => {
      console.log(i);
    });
  }, [reportData]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Report for" subtitle={reportData?.email?.title} />
        <Box>
          <Button
            sx={{
              backgroundColor:
                reportData?.email?.category_name === "Spam"
                  ? colors.redAccent[600]
                  : colors.greenAccent[600],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Shield sx={{ mr: "10px" }} />
            {reportData?.email?.category_name}
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
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box p="30px">
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Analysis
            </Typography>
            <ul>
              {reportData?.attributes?.map((item, i) => (
                <li key={i}>{item?.name}</li>
              ))}
            </ul>
            <Typography variant="h5" fontWeight="bold">
              Confidence Score: {reportData?.confidence_score * 100}%
            </Typography>
          </Box>
        </Box>
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: colors.primary[500],
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Email Body
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HtmlPreview html={reportData?.message_body} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Reports;
