# Damaged Veteran Templates Page

This page provides a comprehensive interface for managing damaged veteran templates in Delta Green character creation.

## Overview

Damaged Veteran Templates represent traumatic experiences that have left lasting marks on characters. They provide both mechanical benefits and narrative depth, reflecting how trauma has shaped a character's abilities and worldview.

## Components

### Main Page (`index.tsx`)
The main page component that orchestrates all the damaged veteran template functionality.

**Features:**
- Grid layout of template cards
- Active templates summary
- Clear all templates functionality
- Integration with character context

### Components Directory

#### `DamagedVeteranGuidance.tsx`
Provides educational content about damaged veteran templates, including:
- What they are and how they work
- Available template types
- Important warnings about permanent choices

#### `HardExperienceSkillSelector.tsx`
A modal component for selecting skills in the Hard Experience template.

**Features:**
- Visual skill selection grid
- Progress tracking (X/5 skills selected)
- Validation to ensure exactly 5 skills are selected
- Preview of skill bonuses
- Occult skill is automatically included and cannot be deselected

#### `TemplateEffectsPreview.tsx`
Shows a detailed preview of how each template will affect the character.

**Features:**
- Stat changes with before/after values
- Skill bonuses with before/after percentages
- Bond adjustments
- Skill selection rules display
- Color-coded positive/negative effects

## Available Templates

1. **Extreme Violence**
   - +10% to Occult skill
   - -5 SAN
   - -3 CHA and -3 to each Bond
   - Character is adapted to violence

2. **Captivity or Imprisonment**
   - +10% to Occult skill
   - -5 SAN
   - -3 POW
   - Character is adapted to helplessness

3. **Hard Experience**
   - +10% to Occult skill
   - +10% to 5 additional skills (user choice)
   - -5 SAN
   - Remove 1 Bond
   - Skills cannot exceed 90%

4. **Things Man Was Not Meant to Know**
   - +10% to Unnatural skill
   - +20% to Occult skill
   - Reduce SAN by POW value
   - Gain new disorder caused by the Unnatural
   - Reset Breaking Point to new SAN minus POW

## Technical Implementation

### Context Integration
The page integrates with multiple contexts:
- `DamagedVeteranContext` - Template management
- `PersonalDetailsContext` - Character data
- `StatisticsContext` - Character stats
- `SkillsContext` - Character skills
- `BondsContext` - Character bonds

### Styling
Uses styled-components with react95 theme for consistent retro UI styling. All components include proper data-testid attributes for testing.

### Localization
All user-facing text uses `@lingui/react/macro` for internationalization support.

## Usage

The page is designed to be used during character creation in The Crucible section. Users can:

1. Read the guidance to understand templates
2. Browse available templates with detailed descriptions
3. See previews of how templates will affect their character
4. Select and apply templates
5. Manage skill selections for the Hard Experience template
6. Clear all templates if needed

## Future Enhancements

Potential improvements could include:
- Template combination validation
- Narrative prompts for each template
- Integration with mental disorder system
- Template-specific character sheet sections
