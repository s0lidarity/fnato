import { useEffect, useState } from 'preact/hooks';
import { GroupBox, Radio, TextInput } from 'react95'
import styled from 'styled-components';

import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { useBonds } from '../../../../providers/BondsContext';
import { useStats } from '../../../../providers/StatisticsContext';

const BondInputContainer = styled.div.attrs<any>({
    'data-testid': 'bond-input-container',
    'data-component': 'BondInput/BondInputContainer',
})`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 0.25rem solid ${({ theme }) => theme.borderDark};
    padding: 0.5rem;
    margin: 0.5rem 0;
`;

const TopRowContainer = styled.div.attrs<any>({
    'data-testid': 'bond-input-top-row-container',
    'data-component': 'BondInput/TopRowContainer',
})`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
`;

const BondNameContainer = styled.div.attrs<any>({
    'data-testid': 'bond-input-name-container',
    'data-component': 'BondInput/BondNameContainer',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

const BondTypeContainer = styled.div.attrs<any>({
    'data-testid': 'bond-input-group-box-container',
    'data-component': 'BondInput/GroupBoxContainer',
})`
    display: flex;
    flex-direction: row;
`;

const BondDetailContainer = styled.div.attrs<any>({
    'data-testid': 'bond-input-detail-container',
    'data-component': 'BondInput/BondDetailContainer',
})`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    input { flex: 1;
        min-height: 3rem;
    }
`;

const StyledTextInput = styled(TextInput).attrs<any>({
    'data-testid': 'bond-input-text-input',
    'data-component': 'BondInput/StyledTextInput',
})`
    flex: 1;
    min-height: 2rem;
`;



function BondInput({ index }: { index: number }) {
    const [bondName, setBondName] = useState('');
    const [bondType, setBondType] = useState('individual');
    const [bondDetail, setBondDetail] = useState('');

    const { bonds, setBonds } = useBonds();
    const { stats } = useStats();
    

    useEffect(() => {
        const newBond = {
            name: bondName,
            detail: bondDetail,
            type: bondType,
            score: stats.charisma.score,
        };

        let newBonds = [...bonds];
        newBonds[index] = newBond;
        setBonds(newBonds);
    }, [bondDetail, bondName, bondType]);

    const handleBondNameChange = (e: any) => {
        setBondName(e.target.value);
    };

    const handleBondTypeChange = (e: any) => {
        setBondType(e.target.value);
    };

    const handleBondDetailChange = (e: any) => {
        setBondDetail(e.target.value);
    };

    return (
        <BondInputContainer>
            <TopRowContainer>
                <BondNameContainer>
                    <ReminderTooltip labelText="Bond Name" reminderText="The name of the individual or group your agent is bonded to." />
                    <TextInput value={bondName} onChange={(e) => handleBondNameChange(e)} />
                </BondNameContainer>
                <BondTypeContainer>
                    <GroupBox label="Bond Type">
                        <Radio
                            checked={bondType === 'individual'}
                            onChange={(e) => handleBondTypeChange(e)}
                            name="Bond Type"
                            value="individual" 
                            label="Individual" 
                        />
                        <Radio
                            checked={bondType === 'group'}
                            onChange={(e) => handleBondTypeChange(e)}
                            name="Bond Type"
                            value="group" 
                            label="Group" 
                        />
                    </GroupBox>
                </BondTypeContainer>
            </TopRowContainer>
            <BondDetailContainer>
                <ReminderTooltip labelText="Bond Detail" reminderText="Note additional details about the bond" />
                <StyledTextInput 
                    value={bondDetail} 
                    onChange={(e) => handleBondDetailChange(e)}
                    multiline
                    rows={3}
                />
            </BondDetailContainer>
        </BondInputContainer>
    )
}

export default BondInput;