# Project Instructions

## Tech Stack & Core Dependencies

- Preact (not React)
- TypeScript
- styled-components
- react95 (Windows 95 UI components)

## Key Architecture Patterns

### Component Structure

- Use functional components with hooks
- Export components as default unless there's a specific reason not to
- Components should be in their own directories when they have sub-components
- Include data-testid and data-component attributes on styled components

### Styling

- Use styled-components for all styling
- Follow react95 design patterns for Windows 95 aesthetic
- Styled components should follow this pattern:

```typescript
const StyledComponent = styled.element.attrs<any>({
'data-testid': 'component-name',
    'data-component': 'ParentComponent/ComponentName'
}) // styles;
```

### State Management

- Check existing Context Providers before creating local state:
  - SkillsContext: Manages character skills and related calculations
  - CharacterContext: Manages character-level state
  - ProfessionContext: Manages profession-related state
  - ThemeContext: Manages UI theme state

### File Structure

src/
├── components/ # Shared components
├── pages/ # Page components
├── providers/ # Context providers
├── types/ # TypeScript types
├── utils/ # Utility functions
└── constants/ # Shared constants

### Naming Conventions

- Components: PascalCase
- Files: PascalCase for components, camelCase for utilities
- Styled Components: Prefix with 'Styled' or descriptive name
- Props Interfaces: Suffix with 'Props'
- Context: Suffix with 'Context'

### Testing

- Include data-testid attributes for component testing
- Keep components testable by avoiding complex nested logic

### Error Handling

- Use try/catch blocks for async operations
- Provide meaningful error messages
- Consider error boundaries for component failures

### Performance

- Memoize callbacks with useCallback when passing to child components
- Use useMemo for expensive calculations
- Avoid unnecessary re-renders

### Accessibility

- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Maintain proper heading hierarchy

## Common Gotchas

1. Remember to use Preact's imports:

```typescript
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
```

2. react95 components require ThemeProvider wrapper
3. Check Context Providers before creating new state
4. styled-components attrs are typed with <any> for this project
5. Always include data-testid and data-component attributes
6. Preact uses native events, not React events 
  1. For example, (value) => handleChange(value) instead of (event.target.value) => handleChange(event.target.value)

## Code Examples

### Basic Component Template

```typescript
import styled from 'styled-components';

import { useSkills } from '../providers/SkillsContext';
const StyledContainer = styled.div.attrs<any>({
'data-testid': 'component-container',
'data-component': 'ComponentName/Container'
}) display: flex; // additional styles;
interface ComponentProps {
// props
}
function ComponentName({ ...props }: ComponentProps) {
const { someContextValue } = useSkills();
return (
<StyledContainer>
{/ component content /}
</StyledContainer>
);
}
export default ComponentName;
```

### Context Usage Example

```typescript
import { useSkills } from '../providers/SkillsContext';
function Component() {
const { skills, setSkills } = useSkills();
// use context values
}

```

## Additional Notes

- Prefer composition over inheritance
- Keep components focused and single-responsibility
- Use TypeScript strictly - avoid any types except in styled-components attrs
- Follow existing patterns in the codebase
- Consider mobile responsiveness in styled-components
