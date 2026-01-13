# Safety Conflict Rules

## Core Principle
**Only one adaptation active at a time. Engine decides calmly and predictably.**

## Priority Hierarchy

1. **Sacred Focus** (Priority 1) - Never interrupt deep learning
2. **Cognitive Relief** (Priority 2) - Help overwhelmed users immediately  
3. **Rest Invitation** (Priority 3) - Tired users need breaks first
4. **Gentle Wayfinding** (Priority 4) - Lost users need guidance
5. **Calm Clarity** (Priority 5) - Reduce confusion when hovering
6. **Gentle Encouragement** (Priority 6) - Supportive feedback

## Conflict Scenarios

### What if two behaviors happen?
**Engine decision:** Higher priority wins, lower priority waits
```javascript
if (newPriority < currentPriority) {
    exitCurrentState();
    enterState(newState); // Higher priority takes over
}
```

### What if stress comes during deep focus?
**Engine decision:** NEVER interrupt sacred focus
```javascript
if (currentState === 'sacred-focus') {
    return false; // Stress signal ignored until focus ends
}
```

### What if fatigue + hover + backtrack happen?
**Engine decision:** Rest wins (Priority 3 beats 4 and 5)
```javascript
const behaviors = {
    'rest-invitation': 3,    // fatigue
    'calm-clarity': 5,       // hover
    'gentle-wayfinding': 4   // backtrack
};
const winner = Object.keys(behaviors).reduce((a, b) => 
    behaviors[a] < behaviors[b] ? a : b
);
// Result: 'rest-invitation'
```

### Engine must decide calmly, predictably
**Calm decisions:** 2-second minimum between changes
```javascript
const timeSinceLastChange = Date.now() - lastStateChange;
if (timeSinceLastChange < 2000) {
    return false; // Wait for calm transition
}
```

**Predictable decisions:** Same inputs = same outputs
```javascript
function resolveConflict(newState, currentState) {
    // 1. Sacred focus is untouchable
    if (currentState === 'sacred-focus') return 'ignore';
    
    // 2. Higher priority wins
    const priorities = {
        'sacred-focus': 1, 'cognitive-relief': 2, 'rest-invitation': 3,
        'gentle-wayfinding': 4, 'calm-clarity': 5, 'gentle-encouragement': 6
    };
    
    return priorities[newState] < priorities[currentState] ? 'switch' : 'ignore';
}
```