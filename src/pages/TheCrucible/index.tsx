import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Tabs, Tab, TabBody, Window, WindowContent, WindowHeader } from 'react95';
import { PiCookingPotFill } from "react-icons/pi";


import Statistics from './Statistics/Statistics';
import Profession from './Profession';
import PersonalDetails from './PersonalDetails';
import Bonds from './Bonds';
import { PageWrapper } from '../../components/SharedStyles';
import Dossier from './Dossier';
import ArrowNavigators from './components/ArrowNavigators';

const StyledWindow = styled(Window)`
    width: 100%;
`;

const StyledHeader = styled(WindowHeader)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

export function TheCrucible() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (value: number) => setActiveTab(value);

	return (
        <PageWrapper>
            <StyledWindow>
                <StyledHeader>
                    <h1>The Crucible</h1>
                    <PiCookingPotFill />
                </StyledHeader>
                <WindowContent>
                    {/* AJS TODO */}
                    {/* show an icon when tab is complete, maybe context for completion? */}
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab value={0}>Statistics</Tab>
                        <Tab value={1}>Profession & Skills</Tab>
                        <Tab value={2}>Bonds</Tab>
                        <Tab value={3}>Personal Details</Tab>
                        <Tab value={4}>Dossier</Tab>
                        
                    </Tabs>
                    <TabBody>
                        {activeTab === 0 && <Statistics />}
                        {activeTab === 1 && <Profession />}
                        {activeTab === 2 && <Bonds />}
                        {activeTab === 3 && <PersonalDetails />}
                        {activeTab === 4 && <Dossier />}
                        
                    </TabBody>
                </WindowContent>
                {/* AJS TODO clean up the magic number, let's put the tabs in an array and use the length */}
                <ArrowNavigators activeTab={activeTab} setActiveTab={setActiveTab} maxTab={4} />
            </StyledWindow>
        </PageWrapper>
    )
};

export default TheCrucible;