# Adaptive Engine

## What It Does

The `adaptive-engine.js` manages how the learning interface responds to student behavior. It ensures only one helpful change happens at a time, preventing overwhelming or confusing students.

## Key Features

- **One Thing at a Time** - Only one adaptation active, no conflicts
- **Smart Cleanup** - Automatically removes changes after a few seconds
- **Safe Fallbacks** - Handles errors gracefully, never breaks the interface
- **Simple Control** - Easy to add new behaviors and responses

## How It Works

```javascript
// Create the engine
const stateManager = new AdaptiveStateManager();

// Add a helpful response
stateManager.registerState('gentle-highlight', {
    onEnter: () => document.querySelector('.next-step').classList.add('glow'),
    onExit: () => document.querySelector('.next-step').classList.remove('glow'),
    duration: 4000 // Fades after 4 seconds
});

// Activate when student needs help
stateManager.enterState('gentle-highlight');
```

## Why This Matters

Students learn better with calm, purposeful guidance. This engine prevents the interface from becoming chaotic or distracting by managing all adaptive responses in one place.