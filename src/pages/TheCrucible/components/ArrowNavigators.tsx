import styled from "styled-components";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import ProgressBarWrapper from "../../../components/ProgressBarWrapper";
import ButtonWrapper from "../../../components/ButtonWrapper";
import { Button } from "react95";

const ArrowNavigatorContainer = styled.div.attrs<any>({
    'data-component': 'TheCrucible/ArrowNavigatorContainer',
    'data-testid': 'arrow-navigator-container',
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.75rem;
    padding: 0 0.5rem;
`;

const StyledProgressBar = styled(ProgressBarWrapper).attrs<any>({
    'data-component': 'TheCrucible/StyledProgressBar',
    'data-testid': 'styled-progress-bar',
})`
    padding: 1rem;
`;

interface ArrowNavigatorsProps {
    activeTab: number;
    maxTab: number;
    setActiveTab: (tab: number) => void;
}

function ArrowNavigators({ activeTab, maxTab, setActiveTab }: ArrowNavigatorsProps) {

    const handlePrevious = (activeTab: number) => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    }

    const handleNext = (activeTab: number) => {
        if (activeTab <  maxTab) {
            setActiveTab(activeTab + 1);
        }
    }

    return (
        <ArrowNavigatorContainer>
            <ButtonWrapper onClick={() => handlePrevious(activeTab)}>
                <IoMdArrowBack />
            </ButtonWrapper>
            {/* AJS TODO stop using magic number and calculate by maxTabs */}
            <StyledProgressBar 
                value={(activeTab * 20) + 20} 
                variant="tile"
            />
            <ButtonWrapper onClick={() => handleNext(activeTab)}>
                <IoMdArrowForward />
            </ButtonWrapper>
        </ArrowNavigatorContainer>
    );
}

export default ArrowNavigators;