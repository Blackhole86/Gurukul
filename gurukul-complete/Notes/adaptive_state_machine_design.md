# Adaptive Learning Interface Brain

## What It Does

This system watches how learners behave and responds with gentle, helpful visual changes. It's designed to support calm learning without being distracting or overwhelming.

**Core Rule: Only one helpful response at a time, always calm and purposeful.**

## How Learners Behave

1. **Calm** - Just reading or thinking, no help needed
2. **Focused** - Working steadily on something, going well
3. **Browsing** - Looking around, comparing options
4. **Stuck** - Hovering, unsure what to do next
5. **Lost** - Repeating failed actions, clearly confused
6. **Overwhelmed** - Moving too fast, too many things at once
7. **Getting Better** - Starting to succeed after being stuck

## How System Responds

1. **Do Nothing** - Clean interface, no changes
2. **Gentle Highlight** - Softly show the best next step
3. **Reduce Clutter** - Dim distractions, emphasize what matters
4. **Encouraging Glow** - Soft pulse to say "you're doing well"
5. **Show Path** - Subtle hints about where you are and where to go

## State Transitions (How We Move Between States)

**User Behavior Detection:**
- Calm → Focused: User starts working steadily
- Focused → Stuck: User stops, hovers repeatedly
- Stuck → Lost: User tries same failed action 3+ times
- Lost → Getting Better: User finds correct action
- Any State → Overwhelmed: Too many rapid clicks (5+ in 2 seconds)
- Overwhelmed → Calm: User slows down, pauses

**System Response Triggers:**
- Lost → Gentle Highlight (Priority 1 - Most Important)
- Overwhelmed → Reduce Clutter (Priority 2)
- Stuck → Reduce Clutter (Priority 3)
- Focused → Encouraging Glow (Priority 4)
- Getting Better → Encouraging Glow (Priority 4)
- Calm/Browsing → Do Nothing

## Priority Rules (Conflict Resolution)

**Only One Active Response:**
1. **Lost** beats everything (emergency help)
2. **Overwhelmed** beats stuck/focused
3. **Stuck** beats focused
4. **Focused/Getting Better** are equal priority
5. **Calm/Browsing** = no response

**If conflict occurs:** Higher priority wins, lower priority waits

## Reset Rules (When to Stop Helping)

**Automatic Reset:**
- All responses fade after 3-6 seconds
- User starts succeeding → immediate stop
- User moves to different area → reset to calm
- 30 seconds of no activity → reset to calm

**Manual Reset:**
- User clicks outside learning area
- Page refresh or navigation
- System detects user is reading (no mouse movement for 10+ seconds)

## Safety Rules

**Rate Limiting:**
- Maximum 6 helpful changes per minute
- 3 seconds minimum between any changes
- If rate exceeded → enter "quiet mode" for 30 seconds

**Protection Rules:**
- If unsure what learner needs → do nothing
- Never interrupt active reading or typing
- Stop immediately if learner starts succeeding
- No responses during first 5 seconds on new page
- Disable all responses if user seems frustrated (rapid random clicking)

**Emergency Stop:**
- Any response can be cancelled if user behavior improves
- System goes quiet if it detects its help isn't working