import { useState } from 'preact/hooks';
import { TextInput } from 'react95'
import styled from 'styled-components';

import { useBonds } from '../../../../providers/BondsContext';

function BondInput() {
    const [bondName, setBondName] = useState('');


    const handleBondNameChange = (e: any) => {
        setBondName(e.target.value);
        // also set the bond in the bonds context
    };

    return (
        <div>
            <div>
                <label>Bond Name</label>
                <TextInput value={bondName} onChange={(e) => handleBondNameChange(e.target.value)} />
            </div>
        </div>
    )
}

export default BondInput;