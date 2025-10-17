import { IoMdPrint } from "react-icons/io";
import html2pdf from 'html2pdf.js';
import { useEffect } from 'preact/hooks';

import { PageWrapper } from '../../components/SharedStyles';
import { CharacterSheet } from './components';
import { ExportButton } from './styles/Export.styles';

export function Summary() {
    const handleExport = () => {
        const pdf = document.querySelector('[data-testid="character-sheet"]');
        const opt = {
            filename: 'character-sheet.pdf',
            margin: 0,
            image: { type: 'jpeg' },
            html2canvas: { 
                scale: 2,
                useCORS: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().set(opt).from(pdf).save();
    };

    useEffect(() => {
        const handlePrintCommand = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handleExport();
            }
        };

        window.addEventListener('keydown', handlePrintCommand);
        return () => window.removeEventListener('keydown', handlePrintCommand);
    }, []);

    return (
        <PageWrapper transparent>
            <CharacterSheet />
            <ExportButton onClick={handleExport}>
                Export as PDF <IoMdPrint />
            </ExportButton>
        </PageWrapper>
    );
}

export default Summary;
