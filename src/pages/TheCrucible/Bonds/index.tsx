import { useState } from 'preact/hooks';

// AJS let's start with a context for the bonds

export function Bonds() {
	return (
        <div>
            <h1>Bonds</h1>
            <p>Pull in bonds from skills context</p>
            <ul>
                <li>`Each Bond begins with a score equal to your
Agent’s CHA. Bonds’ scores often deteriorate because
of your Agent’s involvement in Delta Green. A Bond
increases if it is cultivated between operations (see
HOME on page 76). A Bond can never have a score
higher than your Agent’s CHA. Any time CHA drops,
each Bond drops by the same amount.</li>
                <li>Defining Bonds
Identify each Bond: “My Wife.” “My Husband and
Kids.” “The Platoon.” “My Ex-Partner in the LAPD.”
A Bond must be a real person or small group of people
who are alive and can be interacted with.</li>
                <li>Sample Bonds
1. Spouse or ex-spouse (individual)
2. Son or daughter (individual)
3. Parent or grandparent (individual)
4. Best friend (individual)
5. Coworker or partner (individual)
6. Psychologist or therapist (individual)
7. Spouse and children (group)
8. Parents (group)
9. Siblings (group)
10. Colleagues in an intense job (group)
11. Church or support group (group)
12. Survivors of a shared trauma (group)`</li>
            </ul>
            <p>
                <ul>
                    <li>Step 1: Title bond</li>
                    <li>Step 2: group or individual</li>
                    <li>Assign to context using CHA as initial bond score</li>
                    <li>Show sample bonds as reference somewhere</li>
                </ul>
            </p>
        </div>
    )
};

export default Bonds;