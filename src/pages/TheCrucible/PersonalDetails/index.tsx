import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'
import { DetailedDescription } from '../../../types/characterTypes';

export function PersonalDetails() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value,
        });
    };

    return (
        <div className="personal-details-form">
            <h1>Personal Details</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={personalDetails.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="alias">Alias:</label>
                    <input
                        type="text"
                        id="alias"
                        name="alias"
                        value={personalDetails.alias || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={personalDetails.age}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="appearance">Appearance:</label>
                    <textarea
                        id="appearance"
                        name="appearance"
                        value={personalDetails.appearance}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="education">Education:</label>
                    <input
                        type="text"
                        id="education"
                        name="education"
                        value={personalDetails.education || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="personality">Personality:</label>
                    <textarea
                        id="personality"
                        name="personality"
                        value={personalDetails.personality || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="beliefs">Beliefs:</label>
                    <textarea
                        id="beliefs"
                        name="beliefs"
                        value={personalDetails.beliefs || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="hobbies">Hobbies:</label>
                    <textarea
                        id="hobbies"
                        name="hobbies"
                        value={personalDetails.hobbies || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="obsessions">Obsessions:</label>
                    <textarea
                        id="obsessions"
                        name="obsessions"
                        value={personalDetails.obsessions || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="motivations">Motivations:</label>
                    <textarea
                        id="motivations"
                        name="motivations"
                        value={personalDetails.motivations || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="admire">Something you admire:</label>
                    <textarea
                        id="admire"
                        name="admire"
                        value={personalDetails.admire || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="dislike">Something you dislike:</label>
                    <textarea
                        id="dislike"
                        name="dislike"
                        value={personalDetails.dislike || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="trustInDeltaGreen">Why does Delta Green trust this agent?</label>
                    <textarea
                        id="trustInDeltaGreen"
                        name="trustInDeltaGreen"
                        value={personalDetails.trustInDeltaGreen || ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="deltaGreenAgreement">Why does this agent serve Delta Green?</label>
                    <textarea
                        id="deltaGreenAgreement"
                        name="deltaGreenAgreement"
                        value={personalDetails.deltaGreenAgreement || ''}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
}

export default PersonalDetails;