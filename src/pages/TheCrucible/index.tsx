import h from 'preact';
import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Tabs, Tab, TabBody, Window, WindowContent, WindowHeader } from 'react95';
import Statistics from './Statistics';
import Profession from './Profession';
import Skills from './Skills';
import Equipment from './Equipment';
import Bonds from './Bonds';

export function TheCrucible() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (value: number, event:MouseEvent) => setActiveTab(value);

	return (
        <div>
            <Window style={{ margin: '1rem', minWidth: '95%', height: '80vh' } }>
                <WindowHeader className='window-title'>
                    <span>The Crucible</span>
                </WindowHeader>
                <WindowContent>
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
                </WindowContent>
            </Window>
        </div>
    )
};

export default TheCrucible;