import { h } from 'preact';
import styled from 'styled-components';
import { Trans } from '@lingui/react/macro';
import { IoInformationCircle, IoWarning } from 'react-icons/io5';
import { t } from '@lingui/core/macro';

import Guidance from '../../../../components/Guidance/Guidance';

const GuidanceSection = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-section',
    'data-component': 'DamagedVeteranGuidance/Section'
})`
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionTitle = styled.h3.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-section-title',
    'data-component': 'DamagedVeteranGuidance/SectionTitle'
})`
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
`;

const SectionText = styled.p.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-section-text',
    'data-component': 'DamagedVeteranGuidance/SectionText'
})`
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
    font-size: 0.9rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const WarningHeader = styled(SectionText).attrs<any>({
    'data-testid': 'damaged-veteran-guidance-warning-header',
    'data-component': 'DamagedVeteranGuidance/WarningHeader'
})`
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const WarningText = styled(SectionText).attrs<any>({
    'data-testid': 'damaged-veteran-guidance-warning-text',
    'data-component': 'DamagedVeteranGuidance/WarningText'
})`
    margin: 0.5rem 0 0 0;
`;

const WarningBox = styled.div.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-warning',
    'data-component': 'DamagedVeteranGuidance/Warning'
})`
    background: rgba(255, 170, 0, 0.1);
    border: 1px solid #ffaa00;
    border-radius: 4px;
    padding: 0.75rem;
    margin: 0.5rem 0;
`;

const TemplateList = styled.ul.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-template-list',
    'data-component': 'DamagedVeteranGuidance/TemplateList'
})`
    margin: 0.5rem 0;
    padding-left: 1.5rem;
`;

const TemplateListItem = styled.li.attrs<any>({
    'data-testid': 'damaged-veteran-guidance-template-item',
    'data-component': 'DamagedVeteranGuidance/TemplateItem'
})`
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
`;

function DamagedVeteranGuidance() {
    return (
        <Guidance 
            title={t`Damaged Veteran Templates`}
            buttonText={t`Damaged Veteran Templates Details`}
        >
            <GuidanceSection>
                <SectionTitle>
                    <IoInformationCircle size={14} />
                    <Trans>What Are Damaged Veteran Templates?</Trans>
                </SectionTitle>
                <SectionText>
                    <Trans>
                        Damaged Veteran Templates represent traumatic experiences that have left lasting marks on your character. 
                        These templates provide both mechanical benefits and narrative depth, reflecting how trauma has shaped 
                        your character's abilities and worldview.
                    </Trans>
                </SectionText>
            </GuidanceSection>

            <GuidanceSection>
                <SectionTitle>
                    <IoInformationCircle size={14} />
                    <Trans>How They Work</Trans>
                </SectionTitle>
                <SectionText>
                    <Trans>
                        Each template provides specific bonuses to skills and penalties to certain statistics. 
                        These changes reflect how the trauma has affected your character's mental and physical state, 
                        while also granting them hard-won experience in certain areas.
                    </Trans>
                </SectionText>
                <SectionText>
                    <Trans>
                        You can apply multiple templates to represent a character with complex trauma history, 
                        but be aware that the cumulative effects can significantly impact your character's capabilities.
                    </Trans>
                </SectionText>
            </GuidanceSection>

            <GuidanceSection>
                <SectionTitle>
                    <IoInformationCircle size={14} />
                    <Trans>Available Templates</Trans>
                </SectionTitle>
                <TemplateList>
                    <TemplateListItem>
                        <strong><Trans>Extreme Violence:</Trans></strong> <Trans>For characters who have witnessed or participated in horrific violence.</Trans>
                    </TemplateListItem>
                    <TemplateListItem>
                        <strong><Trans>Captivity or Imprisonment:</Trans></strong> <Trans>For characters who have been held against their will.</Trans>
                    </TemplateListItem>
                    <TemplateListItem>
                        <strong><Trans>Hard Experience:</Trans></strong> <Trans>For characters who have endured prolonged hardship and danger.</Trans>
                    </TemplateListItem>
                    <TemplateListItem>
                        <strong><Trans>Things Man Was Not Meant to Know:</Trans></strong> <Trans>For characters who have encountered the unnatural and survived.</Trans>
                    </TemplateListItem>
                </TemplateList>
            </GuidanceSection>

            <WarningBox>
                <WarningHeader>
                    <IoWarning size={16} />
                    <strong><Trans>Important:</Trans></strong>
                </WarningHeader>
                <WarningText>
                    <Trans>
                        Damaged Veteran Templates are permanent character choices that cannot be easily undone. 
                        Consider the narrative implications of each template and how it fits with your character's backstory.
                    </Trans>
                </WarningText>
            </WarningBox>
        </Guidance>
    );
}

export default DamagedVeteranGuidance;
