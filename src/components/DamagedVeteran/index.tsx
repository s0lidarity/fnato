import { h } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { Trans } from '@lingui/react/macro';
import { Checkbox, Window, WindowContent, WindowHeader, Button, Fieldset } from 'react95';

import { useDamagedVeteran } from '../../providers/DamagedVeteranContext';
import { DAMAGED_VETERAN_TEMPLATES } from '../../constants/damagedVeteranTemplates';
import { DamagedVeteranAdjustment } from '../../types/characterTypes';

const StyledContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-container',
    'data-component': 'DamagedVeteran/Container'
})`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledWindow = styled(Window).attrs<any>({
    'data-testid': 'damaged-veteran-window',
    'data-component': 'DamagedVeteran/Window'
})`
    width: 100%;
    margin-bottom: 1rem;
`;

const StyledWindowHeader = styled(WindowHeader).attrs<any>({
    'data-testid': 'damaged-veteran-window-header',
    'data-component': 'DamagedVeteran/WindowHeader'
})`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledWindowContent = styled(WindowContent).attrs<any>({
    'data-testid': 'damaged-veteran-window-content',
    'data-component': 'DamagedVeteran/WindowContent'
})`
    display: flex;
    flex-direction: column;
`;

const StyledFieldset = styled(Fieldset).attrs<any>({
    'data-testid': 'damaged-veteran-fieldset',
    'data-component': 'DamagedVeteran/Fieldset'
})`
    margin-bottom: 1rem;
`;

const StyledTemplateContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-container',
    'data-component': 'DamagedVeteran/TemplateContainer'
})`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const StyledTemplateItem = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-item',
    'data-component': 'DamagedVeteran/TemplateItem'
})`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
`;

const StyledTemplateDetails = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-details',
    'data-component': 'DamagedVeteran/TemplateDetails'
})`
    display: flex;
    flex-direction: column;
`;

const StyledTemplateLabel = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-label',
    'data-component': 'DamagedVeteran/TemplateLabel'
})`
    font-weight: bold;
`;

const StyledTemplateDescription = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-template-description',
    'data-component': 'DamagedVeteran/TemplateDescription'
})`
    font-size: 0.875rem;
`;

const StyledButtonContainer = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-button-container',
    'data-component': 'DamagedVeteran/ButtonContainer'
})`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
`;

function DamagedVeteranTemplate({ template, isActive, onToggle }: { 
    template: DamagedVeteranAdjustment; 
    isActive: boolean;
    onToggle: (template: DamagedVeteranAdjustment) => void;
}) {
    return (
        <StyledTemplateItem>
            <Checkbox
                checked={isActive}
                onChange={() => onToggle(template)}
                value={template.id}
                label=""
            />
            <StyledTemplateDetails>
                <StyledTemplateLabel>
                    <Trans id={template.labelMsg?.id}>{template.label}</Trans>
                </StyledTemplateLabel>
                <StyledTemplateDescription>
                    <Trans id={template.descriptionMsg?.id}>{template.description}</Trans>
                </StyledTemplateDescription>
            </StyledTemplateDetails>
        </StyledTemplateItem>
    );
}

function DamagedVeteran() {
    const { 
        activeAdjustments, 
        isEnabled, 
        setIsEnabled, 
        toggleAdjustment, 
        clearAdjustments,
        applyAdjustments
    } = useDamagedVeteran();

    const handleToggleEnabled = () => {
        setIsEnabled(!isEnabled);
    };

    const handleToggleTemplate = (template: DamagedVeteranAdjustment) => {
        toggleAdjustment(template);
    };

    const handleClearAll = () => {
        clearAdjustments();
    };

    const handleApply = () => {
        applyAdjustments();
    };

    return (
        <StyledContainer>
            <StyledWindow>
                <StyledWindowHeader>
                    <Trans>Damaged Veteran Templates</Trans>
                    <Checkbox
                        checked={isEnabled}
                        onChange={handleToggleEnabled}
                        value="enable-damaged-veteran"
                        label={<Trans>Enable</Trans>}
                    />
                </StyledWindowHeader>
                <StyledWindowContent>
                    <StyledFieldset label={`Available Templates`}>
                        <StyledTemplateContainer>
                            {DAMAGED_VETERAN_TEMPLATES.map(template => (
                                <DamagedVeteranTemplate
                                    key={template.id}
                                    template={template}
                                    isActive={activeAdjustments.some(adj => adj.id === template.id)}
                                    onToggle={handleToggleTemplate}
                                />
                            ))}
                        </StyledTemplateContainer>
                    </StyledFieldset>
                    <StyledButtonContainer>
                        <Button onClick={handleClearAll} disabled={!isEnabled || activeAdjustments.length === 0}>
                            <Trans>Clear All</Trans>
                        </Button>
                        <Button onClick={handleApply} disabled={!isEnabled || activeAdjustments.length === 0}>
                            <Trans>Apply</Trans>
                        </Button>
                    </StyledButtonContainer>
                </StyledWindowContent>
            </StyledWindow>
        </StyledContainer>
    );
}

export default DamagedVeteran; 