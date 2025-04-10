import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Tabs, Tab, TabBody, Window, WindowContent, WindowHeader } from 'react95';
import { PiCookingPotFill } from "react-icons/pi";
import { Trans } from '@lingui/react/macro';

import Statistics from './Statistics/Statistics';
import Profession from './Profession';
import PersonalDetails from './PersonalDetails';
import Bonds from './Bonds';
import { PageWrapper } from '../../components/SharedStyles';
import Dossier from './Dossier';
import DamagedVeteranTemplates from './DamagedVeteranTemplates';
import ArrowNavigators from './components/ArrowNavigators';

const StyledWindow = styled(Window).attrs<any>({
    'data-component': 'TheCrucible/StyledWindow',
    'data-testid': 'styled-window',
})`
    width: 100%;
`;

const StyledHeader = styled(WindowHeader).attrs<any>({
    'data-component': 'TheCrucible/StyledHeader',
    'data-testid': 'styled-header',
})`
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
                    <h1><Trans>The Crucible</Trans></h1>
                    <PiCookingPotFill />
                </StyledHeader>
                <WindowContent>
                    {/* AJS TODO */}
                    {/* show an icon when tab is complete, maybe context for completion? */}
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab value={0}><Trans>Statistics</Trans></Tab>
                        <Tab value={1}><Trans>Profession & Skills</Trans></Tab>
                        <Tab value={2}><Trans>Bonds</Trans></Tab>
                        <Tab value={3}><Trans>Personal Details</Trans></Tab>
                        <Tab value={4}><Trans>Damaged Veteran Templates</Trans></Tab>
                        <Tab value={4}><Trans>Dossier</Trans></Tab>
                        
                    </Tabs>
                    <TabBody>
                        {activeTab === 0 && <Statistics />}
                        {activeTab === 1 && <Profession />}
                        {activeTab === 2 && <Bonds />}
                        {activeTab === 3 && <PersonalDetails />}
                        {activeTab === 4 && <DamagedVeteranTemplates />}
                        {activeTab === 5 && <Dossier />}

                    </TabBody>
                </WindowContent>
                {/* AJS TODO clean up the magic number, let's put the tabs in an array and use the length */}
                <ArrowNavigators activeTab={activeTab} setActiveTab={setActiveTab} maxTab={5} />
            </StyledWindow>
        </PageWrapper>
    )
};

export default TheCrucible;