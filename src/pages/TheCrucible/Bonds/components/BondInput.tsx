import { GroupBox, Radio, TextInput } from 'react95'
import styled from 'styled-components';
import { t } from '@lingui/core/macro';

import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { useBonds } from '../../../../providers/BondsContext';

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
    flex: 1;
`;

const BondNameTextInput = styled(TextInput).attrs<any>({
    'data-testid': 'bond-input-name-text-input',
    'data-component': 'BondInput/BondNameTextInput',
})`
    flex: 1;
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
    const { bonds, setBondByIndex } = useBonds();

    const handleBondNameChange = (e: any) => {
        setBondByIndex(index, {
            ...bonds[index],
            name: e.target.value,
        });
    };

    const handleBondTypeChange = (e: any) => {
        setBondByIndex(index, {
            ...bonds[index],
            type: e.target.value,
        });
    };

    const handleBondDetailChange = (e: any) => {
        setBondByIndex(index, {
            ...bonds[index],
            detail: e.target.value,
        });
    };

    return (
        <BondInputContainer>
            <TopRowContainer>
                <BondNameContainer>
                    <ReminderTooltip labelText={t`Bond Name`} reminderText={t`The name of the individual or group your agent is bonded to.`} />
                    <BondNameTextInput value={bonds[index]?.name || ''} onChange={(e) => handleBondNameChange(e)} />
                </BondNameContainer>
                <BondTypeContainer>
                    <GroupBox label={t`Bond Type`}>
                        <Radio
                            checked={bonds[index]?.type === 'individual'}
                            onChange={(e) => handleBondTypeChange(e)}
                            name="Bond Type"
                            value="individual" 
                            label={t`Individual`} 
                        />
                        <Radio
                            checked={bonds[index]?.type === 'group'}
                            onChange={(e) => handleBondTypeChange(e)}
                            name="Bond Type"
                            value="group" 
                            label={t`Group`} 
                        />
                    </GroupBox>
                </BondTypeContainer>
            </TopRowContainer>
            <BondDetailContainer>
                <ReminderTooltip labelText={t`Bond Detail`} reminderText={t`Note additional details about the bond`} />
                <StyledTextInput 
                    value={bonds[index]?.detail || ''} 
                    onChange={(e) => handleBondDetailChange(e)}
                    multiline
                    rows={3}
                />
            </BondDetailContainer>
        </BondInputContainer>
    )
}

export default BondInput;