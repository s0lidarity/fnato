import { h } from 'preact';
import { Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { useCharacter } from '../../../providers/CharacterContext';

const DerivedAttributes = () => {
    const { character } = useCharacter();

    console.log('da keys: ', Object.keys(character.derivedAttributes));
    const renderedDAs = Object.keys(character.derivedAttributes).map((key) => {
        return (
            <TableRow>
                <TableDataCell>{key}</TableDataCell>
                <TableDataCell>{character.derivedAttributes[key].maxValue}</TableDataCell>
            </TableRow>
        )
    });

    return (
        <Window>
            <WindowHeader>
                <h1>Derived Attributes</h1>
            </WindowHeader>
            <WindowContent>
                <Table>
                    <TableBody>
                        {renderedDAs}
                    </TableBody>
                </Table>
            </WindowContent>
        </Window>
    );

};


export default DerivedAttributes;