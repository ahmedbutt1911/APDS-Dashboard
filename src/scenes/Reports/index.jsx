import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Shield from "@mui/icons-material/Shield";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import IconButton from "@mui/material/IconButton";
import LineChart from "../../components/LineChart";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Report for"
          subtitle="Title: You have WON grand prize!!!"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Shield sx={{ mr: "10px" }} />
            Valid
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
            {/* <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Email Body
            </Typography> */}
            {/* <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Email Body
            </Typography> */}

            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              Analysis
            </Typography>
            <ul>
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
              <li>Point 4</li>
            </ul>
            <Typography variant="h5" fontWeight="bold">
              Confidence Score: 77%
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
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est rem
              fuga non doloremque quod, iusto distinctio, eaque exercitationem
              nisi maxime quis odio, optio voluptates dolor repudiandae cum.
              Dignissimos, ratione dolores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Est rem fuga non doloremque quod,
              iusto distinctio, eaque exercitationem nisi maxime quis odio,
              optio voluptates dolor repudiandae cum. Dignissimos, ratione
              dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Est rem fuga non doloremque quod, iusto distinctio, eaque
              exercitationem nisi maxime quis odio, optio voluptates dolor
              repudiandae cum. Dignissimos, ratione dolores. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Est rem fuga non doloremque
              quod, iusto distinctio, eaque exercitationem nisi maxime quis
              odio, optio voluptates dolor repudiandae cum. Dignissimos, ratione
              dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Est rem fuga non doloremque quod, iusto distinctio, eaque
              exercitationem nisi maxime quis odio, optio voluptates dolor
              repudiandae cum. Dignissimos, ratione dolores. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Est rem fuga non doloremque
              quod, iusto distinctio, eaque exercitationem nisi maxime quis
              odio, optio voluptates dolor repudiandae cum. Dignissimos, ratione
              dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Est rem fuga non doloremque quod, iusto distinctio, eaque
              exercitationem nisi maxime quis odio, optio voluptates dolor
              repudiandae cum. Dignissimos, ratione dolores.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est rem
              fuga non doloremque quod, iusto distinctio, eaque exercitationem
              nisi maxime quis odio, optio voluptates dolor repudiandae cum.
              Dignissimos, ratione dolores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Est rem fuga non doloremque quod,
              iusto distinctio, eaque exercitationem nisi maxime quis odio,
              optio voluptates dolor repudiandae cum. elit. Est rem fuga non
              doloremque quod, iusto distinctio, eaque exercitationem nisi
              maxime quis odio, optio voluptates dolor repudiandae cum.
              Dignissimos, ratione dolores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Est rem fuga non doloremque quod,
              iusto distinctio, eaque exercitationem nisi repudiandae cum.
              Dignissimos, ratione dolores.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est rem
              fuga non doloremque quod, iusto distinctio, eaque exercitationem
              nisi maxime quis odio, optio voluptates dolor repudiandae cum.
              Dignissimos, ratione dolores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Est rem fuga non doloremque quod,
              iusto distinctio, eaque exercitationem nisi repudiandae cum.
              Dignissimos, ratione dolores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Est rem fuga non doloremque quod,
              iusto distinctio, eaque exercitationem nisi maxime quis odio,
              optio voluptates dolor repudiandae cum. Dignissimos, ratione
              dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Est rem fuga non doloremque quod, iusto distinctio, eaque
              exercitationem nisi maxime quis odio, optio voluptates dolor
              repudiandae cum. Dignissimos, ratione dolores. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Est rem fuga non doloremque
              quod, iusto distinctio, eaque exercitationem nisi maxime quis
              odio, optio voluptates dolor repudiandae cum. Dignissimos, ratione
              dolores.
            </p>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Reports;
