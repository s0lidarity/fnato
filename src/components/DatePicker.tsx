import Calendar from 'react-calendar';
import styled from 'styled-components';

const StyledCalendar = styled(Calendar)`
    &.react-calendar {
        width: 21.875rem;
        height: 15rem;
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
        min-width: 2.75rem;
        background: ${({ theme }) => theme.material};
        
        &:disabled {
            background-color: ${({ theme }) => theme.materialDark};
        }
    }

    .react-calendar__viewContainer {
        height: calc(100% - 2.75rem);
    }

    .react-calendar__month-view {
        height: 100%;
        
        & > div {
            height: 100%;
        }
    }

    .react-calendar__month-view__days {
        height: 100%;
    }
`;

export default StyledCalendar; 