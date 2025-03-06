import styled from "styled-components";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { Button, ProgressBar } from "react95";

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

const StyledProgressBar = styled(ProgressBar).attrs<any>({
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
            <Button onClick={() => handlePrevious(activeTab)}>
                <IoMdArrowBack />
            </Button>
            {/* AJS TODO stop using magic number and calculate by maxTabs */}
            <StyledProgressBar 
                value={(activeTab * 20) + 20} 
                variant="tile"
            />
            <Button onClick={() => handleNext(activeTab)}>
                <IoMdArrowForward />
            </Button>
        </ArrowNavigatorContainer>
    );
}

export default ArrowNavigators;