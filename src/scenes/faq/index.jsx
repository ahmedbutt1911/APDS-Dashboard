import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/faqs`, {
          headers: {
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
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {data?.length > 0 ? (
        data.map((item) => (
          <Accordion defaultExpanded key={item.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {item?.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item?.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Ooooops!!!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>No FAQs were found.</Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
export default FAQ;
