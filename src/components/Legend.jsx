import React, {useContext} from 'react';
import { ThemeContext } from '../ThemeContext';


const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
};


function Legend() {
    
    const { currentThemeStyles } = useContext(ThemeContext);
    const backgroundColor = currentThemeStyles.backgroundColor;
    const textOutlineColor = currentThemeStyles.mapTextOutline;
    const textColor = currentThemeStyles.textColor;

    const legendStyle = {
        position: 'absolute',
        top: '3%',
        right: '3%',
        backgroundColor: backgroundColor,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #E6E6E6',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
        zIndex: 99,
        fontSize: '16px',
        fontWeight: 'bold',
    };

    const legendTextStyle = (color) => ({
        color: textColor,
        textShadow: `1px 1px ${textOutlineColor}, -1px -1px ${textOutlineColor}, -1px 1px ${textOutlineColor}, 1px -1px ${textOutlineColor}`,
    });

    const legendCircleStyle = (color) => ({
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
        marginRight: '5px',
        border: `1px solid ${textOutlineColor}`
    });
    


    return (
        <div style={legendStyle}>
            <div style={legendItemStyle}>
                <div style={legendCircleStyle('rgb(115, 191, 105)')}></div>
                <span style={legendTextStyle('rgb(115, 191, 105)')}>No Flooding</span>
            </div>
            <div style={legendItemStyle}>
                <div style={legendCircleStyle('rgb(242, 73, 92)')}></div>
                <span style={legendTextStyle('rgb(242, 73, 92)')}>Flooding</span>
            </div>
            <div style={legendItemStyle}>
                <div style={legendCircleStyle('white')}></div>
                <span style={legendTextStyle('white')}>No Data Available</span>
            </div>
        </div>
    );
}

export default Legend;