import h from 'preact';
import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Tabs, Tab, Window, WindowContent, WindowHeader } from 'react95';

export function TheCrucible() {
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (value: number, event:MouseEvent) => setActiveTab(value);

	return (
        <div>
            <Window style={{ width: '95%', height: '95%'}} className='window'>
                <WindowHeader className='window-title'>
                    <span>The Crucible</span>
                </WindowHeader>
                <WindowContent>
                    <Tabs value={activeTab} onChange={console.log}>
                        <Tab value={0}>Statistics</Tab>
                        <Tab value={1}>Profession</Tab>
                        <Tab value={2}>Skills</Tab>
                        <Tab value={3}>Equipment</Tab>
                        <Tab value={4}>Bonds</Tab>
                    </Tabs>
                </WindowContent>
            </Window>
        </div>
    )
};

export default TheCrucible;