import Calendar from 'react-calendar';
import styled from 'styled-components';

const StyledCalendar = styled(Calendar)`
    &.react-calendar {
        background: #c0c0c0;
        border: 2px solid;
        border-right-color: #000000;
        border-bottom-color: #000000;
        border-left-color: #ffffff;
        border-top-color: #ffffff;
        font-family: 'ms_sans_serif';
    
    button {
        background-color: #c0c0c0;
        border: 1px solid;
        border-right-color: #000000;
        border-bottom-color: #000000;
        border-left-color: #ffffff;
        border-top-color: #ffffff;
        padding: 4px;
    
        &:active {
            border-right-color: #ffffff;
            border-bottom-color: #ffffff;
            border-left-color: #000000;
            border-top-color: #000000;
        }
    }

    .react-calendar__tile--active {
        background: #000080;
        color: white;
    }

    .react-calendar__navigation button {
        min-width: 44px;
        background: #c0c0c0;
        
        &:disabled {
            background-color: #d4d0c8;
        }
    }
`;

export default StyledCalendar; 