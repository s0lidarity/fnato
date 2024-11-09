import h from 'preact';
import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Tabs, Tab, TabBody, Window, WindowContent, WindowHeader } from 'react95';
import { PiCookingPotFill } from "react-icons/pi";


import Statistics from './Statistics/Statistics';
import Profession from './Profession';
import Skills from './Skills';
import Equipment from './Equipment';
import Bonds from './Bonds';
import { PageWrapper } from '../../components/SharedStyles';

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
                    {/* show an icon when tab is complete, maybe context for completion? */}
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab value={0}>Statistics</Tab>
                        <Tab value={1}>Profession</Tab>
                        <Tab value={2}>Skills</Tab>
                        <Tab value={3}>Equipment</Tab>
                        <Tab value={4}>Bonds</Tab>
                    </Tabs>
                    <TabBody>
                        {activeTab === 0 && <Statistics />}
                        {activeTab === 1 && <Profession />}
                        {activeTab === 2 && <Skills />}
                        {activeTab === 3 && <Equipment />}
                        {activeTab === 4 && <Bonds />}
                    </TabBody>
                    {/* when tab complete, have option to advance to next incomplete tab */}
                </WindowContent>
            </StyledWindow>
        </PageWrapper>
    )
};

export default TheCrucible;