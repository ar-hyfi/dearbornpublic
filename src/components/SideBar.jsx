
import React from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, 
  Typography, ThemeProvider, createTheme, Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        answer: 'The purpose of this site is to display information about river bridges and road sensors.',
    },
    {
        question: 'How often is the data updated?',
        answer: 'The data is updated every hour.',
    },
    {
        question: 'Where does this data come from?',
        answer: 'Sensors!',
    },
    {
        question: 'Where can I learn more?',
        answer: 'Sensors!',
    },
    // ... Add more FAQs as needed
];

function SideBar() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{ backgroundColor: darkTheme.palette.background.default, color: darkTheme.palette.text.primary, width: '100%', padding: '0.5em' }}>
                <Typography variant="h6" style={{ marginBottom: '1em' }}>FAQs</Typography> {/* Added a title */}
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
            </div>
        </ThemeProvider>
    );
}

export default SideBar;
