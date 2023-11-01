
import React from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, 
  Typography, ThemeProvider, createTheme 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';


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


function SideBar() {

    const { currentThemeStyles } = useContext(ThemeContext);
    const backgroundColor = currentThemeStyles.backgroundColor;
    const textOutlineColor = currentThemeStyles.mapTextOutline;
    const textColor = currentThemeStyles.textColor;

    return (
                <div>
                    <Typography variant="h6" style={{ marginBottom: '1em', color: textColor }}>FAQs</Typography>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '1em' }}>
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
        );
}

export default SideBar;
