# UMass CICS Independent Study Platform - Wireframes

High-fidelity black and white wireframe prototype for the UMass independent study proposal platform.

## Design System

- **Width**: 1440px max-width, centered layout
- **Colors**: Black (#000), White (#fff), and grayscale only
- **Typography**: System defaults (see `styles/globals.css`)
  - H1: 2xl, medium weight
  - H2: xl, medium weight  
  - H3: lg, medium weight
  - Body: base, normal weight
- **Components**: ShadCN UI library for consistent interactions

## Screen Flow

### Entry Point (`/`)
Two-path selection:
- **Direct Path** → Jump to full form
- **Guided Path** → 3-step AI-assisted flow

### Direct Path
1. **Direct Form** - Single scrollable page with all fields

### Guided Path  
1. **Step 1: Interests** - Nested checkbox selections (expandable categories)
2. **Step 2: Skills** - Multi-select dropdown (shown expanded) + optional description
3. **Step 3: Goals** - Multi-select dropdown + required text area
4. **AI Recommendations** - 3-5 project cards with difficulty/match indicators
5. **Template Form** - Pre-populated with AI suggestions (marked with ✨)

### Review Process (Both Paths)
1. **AI Feasibility Review** - Split screen (60/40) with feedback panel
2. **Peer Review Options** - Modal with 3 options (random/specific/skip)
3. **Peer Review Received** - Split screen with comments and apply/dismiss actions
4. **Final Review** - Full template display with checklist sidebar
5. **Success Transition** - Completion screen with next steps

## Interactive States Shown

- **Expanded Dropdown**: Step 2 skills dropdown shown in expanded state
- **Expanded Nested Checkbox**: Step 1 "Computer Science" category shown expanded
- **Hover States**: Button and card hover effects via Tailwind classes
- **Focus States**: Form inputs with `focus:border-gray-900 focus:ring-gray-900`
- **Selected States**: Radio buttons, checkboxes, and project cards
- **Applied/Dismissed**: Suggestions and comments in review screens

## Key Components

- **Progress Bar**: 3-step indicator for guided path
- **Nested Checkboxes**: Expandable/collapsible category system
- **Multi-select Dropdowns**: Shown in expanded state with grid layout
- **Tag System**: Skills displayed as dismissible badges
- **Split Screen**: 60/40 layout for review screens
- **Status Indicators**: Checkmarks, warnings, and AI suggestion badges
- **Cards**: Project recommendations, entry options, and summaries

## Navigation Flow

```
Entry Point
    ├─ Direct Path
    │   └─ Direct Form → AI Review → Peer Options → ...
    └─ Guided Path
        └─ Step 1 → Step 2 → Step 3 → Recommendations → Template Form → AI Review → ...

Review Flow (shared)
    AI Review → Peer Options → Peer Received (optional) → Final Review → Success
```

## Example Content

All screens include realistic placeholder content:
- Student information (Jane Smith, jsmith@umass.edu)
- Project example: "Accessible Campus Navigation Web App"
- Skills, interests, and learning goals representative of CS students
- Detailed feedback and suggestions from AI and peers
- Complete proposal template with UMass CICS requirements

## Technical Notes

- React with TypeScript
- State management via React useState
- Routing handled by screen state in App.tsx
- All ShadCN components imported from `/components/ui`
- No backend - pure frontend prototype
- Responsive layouts using Tailwind grid and flexbox
