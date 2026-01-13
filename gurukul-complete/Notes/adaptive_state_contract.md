# Adaptive State Contract

## State → Pattern → UI Binding Map

| Learner State          | Gurukul Pattern    | UI Class                | Visual Effect                     |
|------------------------|--------------------|-------------------------|-----------------------------------|
| `gentle-encouragement` | Whisper Support    | `.gentle-encouragement` | Soft blue pulse breathing         |
| `calm-clarity`         | Focus Enhancement  | `.calm-clarity`         | Dim surroundings, highlight focus |
| `cognitive-relief`     | Interface Simplify | `.cognitive-relief`     | Reduce opacity, scale down        |
| `rest-invitation`      | Warmth Invitation  | `.rest-invitation`      | Sepia filter, warm colors         |
| `gentle-wayfinding`    | Navigation Support | `.gentle-wayfinding`    | Green glow guidance               |
| `sacred-focus`         | Deep Concentration | `.sacred-focus`         | Fade non-essential elements       |
| `positive-validation`  | Success Celebrate  | `.positive-validation`  | Green success animation           |
| `supportive-guidance`  | Gentle Correction  | `.supportive-guidance`  | Soft orange guidance              |
| `gentle-nudge`         | Activity Prompt    | `.gentle-nudge`         | Subtle pulse animation            |
| `maintain-flow`        | Flow Preservation  | `.maintain-flow`        | Minimal visual changes            |
| `neutral`              | Default State      |            -            | No adaptive styling               |

## Implementation Contract

```javascript
// State Resolution Engine Output → Adaptive State Manager Input
stateResolver.resolve(signal) → learnerState
stateManager.enterState(learnerState, data) → applies UI class

// Pattern Binding
learnerState → gurukul-pattern → CSS class → visual effect
```

## CSS Class Behaviors

- **Duration**: Auto-exit after specified time
- **Overlap Prevention**: Only one state active at a time
- **Graceful Fallback**: Unknown states default to neutral
- **Element Targeting**: Classes applied to specific elements or body