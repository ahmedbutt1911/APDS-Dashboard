import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockEmails } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReportIcon from "@mui/icons-material/Report";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import axios from "axios";
import config from "../../config";

const Dashboard = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/dashboard`, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    data && (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Dashboard"
            subtitle="Data Insights are provided below"
          />

          {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data?.total_emails}
              subtitle="Total Emails Detected"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data?.category_summary?.Legitimate?.count}
              subtitle="Valid Emails"
              progress={data?.category_summary?.Legitimate?.percentage / 100}
              increase={`${data?.category_summary?.Legitimate?.percentage}%`}
              icon={
                <VerifiedUserIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data?.category_summary?.Spam?.count}
              subtitle="Detected Spam Emails"
              progress={data?.category_summary?.Legitimate?.percentage / 100}
              increase={`${data?.category_summary?.Spam?.percentage}%`}
              icon={
                <ReportIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Total Spam Detected
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle
                size="125"
                progress={data?.category_summary?.Legitimate?.percentage / 100}
              />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                {`${data?.category_summary?.Spam?.percentage}% Emails detected to be SPAM`}
              </Typography>
              <Typography>Errors and omissions are accepted</Typography>
            </Box>
          </Box>

          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Analysis
              </Typography>
            </Box>
            {data.recent_emails.map((email, i) => (
              <Box
                key={`${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
                gap="20px"
              >
                {/* Title & Body Section */}
                <Box flex="3" minWidth="200px">
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    noWrap
                  >
                    {email.title}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {email.body}
                  </Typography>
                </Box>

                {/* Date Section */}
                <Box
                  flex="1"
                  minWidth="100px"
                  color={colors.grey[100]}
                  textAlign="right"
                >
                  {email.date}
                </Box>

                {/* Status Badge Section */}
                <Box
                  flex="0 0 auto"
                  width="100px"
                  textAlign="center"
                  backgroundColor={
                    email.status === "Legitimate"
                      ? colors.greenAccent[500]
                      : colors.redAccent[500]
                  }
                  p="5px 10px"
                  borderRadius="4px"
                  whiteSpace="nowrap"
                >
                  {email.status}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Phishing Attacks are Increasing
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  Trends
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} lineData={data?.line_chart} />
            </Box>
          </Box>

          {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
          {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Analysis Based on Geography
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
        </Box>
      </Box>
    )
  );
};

export default Dashboard;
