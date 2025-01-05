// AJS starting point, second page, see page 192 of pdf reference
import styled from 'styled-components';
// import { useWeapons } from '../../providers/WeaponsContext';
// import { useNotes } from '../../providers/NotesContext';

const CharacterSheet = styled.div.attrs<any>({
    'data-component': 'Summary/SecondPage',
    'data-testid': 'character-sheet-page-2',
})`
    border: 0.125rem solid black;
    background: white;
    padding: 0.3125rem;
    width: 210mm;
    height: 296mm;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    page-break-inside: avoid;
    page-break-after: avoid;
    page-break-before: avoid;
    display: flex;
    flex-direction: column;
`;

const Section = styled.div.attrs<any>({
    'data-component': 'Summary/Section',
    'data-testid': 'section',
})`
    border: 0.0625rem solid black;
    margin-bottom: 0.625rem;
`;

const SectionWithHeader = styled(Section)`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
`;

const VerticalHeader = styled.div.attrs<any>({
    'data-testid': 'vertical-header',
    'data-component': 'Summary/VerticalHeader'
})`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: end;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: white;
    padding: 0;
    font-size: 0.8rem;
    height: 100%;
    min-height: 0;
    margin-right: 0.25rem;
`;

const WeaponsTable = styled.table.attrs<any>({
    'data-component': 'Summary/WeaponsTable',
    'data-testid': 'weapons-table',
})`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;

    th, td {
        border: 0.0625rem solid black;
        padding: 0.25rem;
        text-align: center;
    }

    th {
        text-transform: uppercase;
        font-size: 0.7rem;
    }

    input {
        width: 100%;
        border: none;
        text-align: center;
        font-size: 0.8rem;
    }
`;

const SplitSection = styled.div.attrs<any>({
    'data-component': 'Summary/SplitSection',
    'data-testid': 'split-section',
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

const TextArea = styled.textarea.attrs<any>({
    'data-component': 'Summary/TextArea',
    'data-testid': 'text-area',
})`
    width: 100%;
    min-height: 5rem;
    padding: 0.25rem;
    border: 0.0625rem solid black;
    resize: vertical;
    font-size: 0.8rem;
`;

const SpecialTrainingTable = styled.table.attrs<any>({
    'data-component': 'Summary/SpecialTrainingTable',
    'data-testid': 'special-training-table',
})`
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.625rem;

    th {
        text-transform: uppercase;
        font-size: 0.7rem;
        text-align: left;
        padding: 0.25rem;
    }

    td {
        padding: 0.25rem;
        border: 0.0625rem solid black;
    }

    input {
        width: 100%;
        border: none;
        font-size: 0.8rem;
    }
`;

const FormFooter = styled.div.attrs<any>({
    'data-component': 'Summary/FormFooter',
    'data-testid': 'form-footer',
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-top: auto;
    padding-top: 0.625rem;

    > div {
        border: 0.0625rem solid black;
        padding: 0.25rem;
        min-height: 2.5rem;
    }
`;

export function SecondPage() {
    // const { weapons } = useWeapons();
    // const { notes } = useNotes();

    return (
        <CharacterSheet>
            <SectionWithHeader>
                <VerticalHeader>Injuries</VerticalHeader>
                <div>
                    <TextArea placeholder="List wounds and ailments..." />
                    <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
                        Has First Aid been attempted since the last injury? □ Yes: Only Medicine, Surgery, or long-term rest can help further.
                    </div>
                </div>
            </SectionWithHeader>

            <SectionWithHeader>
                <VerticalHeader>Equipment</VerticalHeader>
                <div>
                    <TextArea placeholder="List armor and gear..." />
                    <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
                        Body armor reduces the damage of all attacks except Called Shots and successful Lethality rolls.
                    </div>
                </div>
            </SectionWithHeader>

            <Section>
                <WeaponsTable>
                    <thead>
                        <tr>
                            <th>Skill %</th>
                            <th>Base Range</th>
                            <th>Damage</th>
                            <th>Armor Piercing</th>
                            <th>Lethality</th>
                            <th>Kill Radius</th>
                            <th>Ammo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <tr key={index}>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                    </tbody>
                </WeaponsTable>
            </Section>

            <SplitSection>
                <SectionWithHeader>
                    <VerticalHeader>Remarks</VerticalHeader>
                    <div>
                        <TextArea placeholder="Personal details and notes..." />
                        <SpecialTrainingTable>
                            <thead>
                                <tr>
                                    <th>Special Training</th>
                                    <th>Skill or Stat Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <tr key={index}>
                                        <td><input type="text" /></td>
                                        <td><input type="text" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </SpecialTrainingTable>
                    </div>
                </SectionWithHeader>
            </SplitSection>

            <FormFooter>
                <div>20. AUTHORIZING OFFICER</div>
                <div>21. AGENT SIGNATURE</div>
            </FormFooter>
        </CharacterSheet>
    );
}

export default SecondPage;
