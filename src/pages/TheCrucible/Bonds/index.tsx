import { Button } from 'react95';
import styled from 'styled-components';

import { bondCountSignal } from '../../../signals/bondSignal';
import BondGuidance from './components/BondGuidance';
import BondInput from './components/BondInput';
import { useBonds } from '../../../providers/BondsContext';

const ButtonsContainer = styled.div.attrs<any>({
    'data-component': 'TheCrucible/Bonds/ButtonsContainer',
    'data-testid': 'buttons-container',
})`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`;

export function Bonds() {
    const bondCount = bondCountSignal.value;
    const { resetBonds } = useBonds();

    const renderBondInputs = () => {
        const bondInputs = [];
        for (let i = 0; i < bondCount; i++) {
            bondInputs.push(<BondInput key={i} index={i} />);
        }
        return bondInputs;
    };

	return (
        <div>
        <BondGuidance />
            <div>
                {renderBondInputs()}
            </div>

            <ButtonsContainer>
                <Button onClick={resetBonds}>Reset Bonds</Button>
            </ButtonsContainer>
        </div>
    )
};

export default Bonds;