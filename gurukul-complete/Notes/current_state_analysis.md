# How the Adaptive UI System Actually Works

## What It Does

This system watches for user behavior patterns and responds with helpful visual changes. Think of it like a smart assistant that notices when you're struggling and offers gentle guidance.

Right now, it only responds to test buttons - it doesn't actually watch real user behavior yet.

## How It Makes Decisions

### Simple Rules
The system uses a basic lookup table:
- User keeps hitting undo → Highlight the main action
- User hovers back and forth → Fade distractions, highlight focus
- User stays on something too long → Give encouraging pulse
- User navigates back and forth → Show breadcrumb hints
- User moves really fast → Quick acknowledgment flash

### Priority System
When multiple things happen at once:
1. Confusion gets top priority
2. Being overwhelmed comes next
3. Then hesitation
4. Then exploration
5. Fast users get lowest priority

## What Works as Intended

- Only one visual change happens at a time
- Higher priority needs interrupt lower ones
- Everything cleans up automatically after a few seconds
- Prevents spam by blocking repeated signals
- Has safety limits to avoid overwhelming users

## What Happens by Accident

### Timing Issues
- Sometimes signals arrive so fast they get processed in random order
- Visual effects can stack up before cleanup happens
- The system has two different throttling mechanisms that sometimes conflict

### Unpredictable Behavior
- When no specific target is given, it randomly picks a tile
- If a tile disappears, the system just fails silently
- Rapid interactions can cause visual chaos

### Memory Problems
- Old data doesn't always get cleaned up properly
- Error recovery wipes everything, losing context
- Under stress, the system can become unresponsive

## Main Weaknesses

- **No context awareness** - Treats every "undo" signal the same way
- **Rigid timing** - All delays and durations are hardcoded
- **Random target selection** - Makes responses unpredictable
- **Assumes perfect conditions** - Breaks when things go wrong
- **One-size-fits-all** - Doesn't adapt to different users or situations

## Under Pressure

When users interact rapidly or things go wrong:
- Most signals get blocked (system becomes deaf)
- Visual effects can overlap and conflict
- Memory usage grows without cleanup
- The system can lose track of what it's doing
- Recovery often means starting completely over