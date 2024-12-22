import Calendar from 'react-calendar';
import styled from 'styled-components';

const StyledCalendar = styled(Calendar)`
    &.react-calendar {
        background: ${({ theme }) => theme.material};
        border: 2px solid;
        border-right-color: ${({ theme }) => theme.borderDarkest};
        border-bottom-color: ${({ theme }) => theme.borderDarkest};
        border-left-color: ${({ theme }) => theme.borderLightest};
        border-top-color: ${({ theme }) => theme.borderLightest};
        font-family: 'ms_sans_serif';
    
    button {
        background-color: ${({ theme }) => theme.material};
        border: 1px solid;
        border-right-color: ${({ theme }) => theme.borderDarkest};
        border-bottom-color: ${({ theme }) => theme.borderDarkest};
        border-left-color: ${({ theme }) => theme.borderLightest};
        border-top-color: ${({ theme }) => theme.borderLightest};
        padding: 4px;
    
        &:active {
            border-right-color: ${({ theme }) => theme.borderLightest};
            border-bottom-color: ${({ theme }) => theme.borderLightest};
            border-left-color: ${({ theme }) => theme.borderDarkest};
            border-top-color: ${({ theme }) => theme.borderDarkest};
        }
    }

    .react-calendar__tile--active {
        background: ${({ theme }) => theme.headerBackground};
        color: ${({ theme }) => theme.headerText};
    }

    .react-calendar__navigation button {
        min-width: 44px;
        background: ${({ theme }) => theme.material};
        
        &:disabled {
            background-color: ${({ theme }) => theme.materialDark};
        }
    }
`;

export default StyledCalendar; 