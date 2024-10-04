import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { 
	Bond, 
	Character, 
	DerivedAttributes, 
	DetailedDescription, 
	Profession, 
	Skills, 
	Stat, 
	Statistics 
} from '../types/characterTypes';
import { createDefaultCharacter } from '../utils/CharacterGenerator';


type CharacterContextType = {
    character: Character;
    setCharacter: (character: Character) => void;
	setBonds: (bonds: Bond[]) => void;
    setDerivedAttributes: (derivedAttributes: DerivedAttributes) => void;
    setDetailedDescription: (description: DetailedDescription) => void;
    setProfession: (profession: Profession) => void;
    setSkills: (skills: Skills) => void;
    setStats: (stats: Statistics) => void;
};

const defaultCharacter = createDefaultCharacter();

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
};

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
    const [character, setCharacter] = useState<Character>(defaultCharacter);
	const [bonds, setBonds] = useState<Bond[]>(defaultCharacter.bonds);
	const [derivedAttributes, setDerivedAttributes] = useState<DerivedAttributes>(defaultCharacter.derivedAttributes);
	const [detailedDescription, setDetailedDescription] = useState(defaultCharacter.detailedDescription);
	const [profession, setProfession] = useState(defaultCharacter.profession);
	const [skills, setSkills] = useState(defaultCharacter.skills);
	const [stats, setStats] = useState<Statistics>(defaultCharacter.statistics);

	useEffect(() => {
		setCharacter(prevCharacter => ({
			...prevCharacter,
			bonds,
			derivedAttributes,
			detailedDescription,
			profession,
			skills,
			stats
	}));
	}, [bonds, derivedAttributes, detailedDescription, profession, skills, stats]);

    return (
        <CharacterContext.Provider value={{ 
			character, 
			setCharacter,
            setBonds, 
            setDerivedAttributes, 
            setDetailedDescription, 
            setProfession, 
            setSkills, 
            setStats 
			}}>
            {children}
        </CharacterContext.Provider>
    );
};