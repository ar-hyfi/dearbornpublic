
import React from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, 
  Typography, ThemeProvider, createTheme 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E6E6E6', // A common color for primary text in Mapbox dark mode
        },
        background: {
            default: '#2E2E2E', // Mapbox dark mode background color
            paper: '#3C3C3C', // For elevated components in dark mode
        },
        text: {
            primary: '#E6E6E6', // Mapbox dark mode text color
            secondary: '#A8A8A8', // Slightly dimmed text color
        },
    },
});

const faqs = [
    {
        question: 'What is the purpose of this site?',
        answer: 'This site provides real-time road flooding information based on data from a network of sensors to help Dearborn residents make informed travel decisions during inclement weather.',
    },
    {
        question: 'How does the sensor network work?',
        answer: 'Ultrasonic sensors emit sound waves and measure the time it takes for the waves to return after hitting an obstacle. In this context, they detect the level of water on the roads and provide accurate measurements of flooding depth.',
    },
    {
        question: 'Where can I learn more?',
        answer: 'Read MiNextCities\' article about this project at https://minextcities.org/dearborn/. To learn more about the company behind the sensor network and this dashboard, visit https://hyfi.io/.',
    },
    {
        question: 'Who should I contact if I have questions or concerns?',
        answer: 'Send an email to concerns@hyfi.io.'
    }
    // ... Add more FAQs as needed
];

const SideBarContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    width: '100%', // or any other value based on your desktop design
    padding: '0.5em',
  
    '@media (max-width: 768px)': {
      width: '100%', // accordion takes the full width on mobile devices
    },
  }));

function SideBar() {
    return (
            <ThemeProvider theme={darkTheme}>
                <SideBarContainer>
                    <Typography variant="h6" style={{ marginBottom: '1em' }}>FAQs</Typography>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} style={{ backgroundColor: darkTheme.palette.background.paper, color: darkTheme.palette.text.primary, marginTop: '1em' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`faq-panel-content-${index}`}
                                id={`faq-panel-header-${index}`}
                            >
                                <Typography variant="subtitle1">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </SideBarContainer>
            </ThemeProvider>
        );
}

export default SideBar;
