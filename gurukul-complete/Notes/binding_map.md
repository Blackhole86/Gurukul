# State-Pattern Binding Map

## State Mappings

| State                  | Pattern    | Effect          | Duration |
|------------------------|------------|-----------------|----------|
| `gentle-encouragement` | `breathe`  | Scale animation | 4s       |
| `calm-clarity`         | `focus`    | Blue glow       | 4s       |
| `cognitive-relief`     | `simplify` | Fade others     | 6s       |
| `rest-invitation`      | `rest`     | Sepia filter    | 8s       |
| `gentle-wayfinding`    | `guide`    | Golden glow     | 3.5s     |
| `sacred-focus`         | `protect`  | Isolate focus   | 12s      |

## Implementation

```javascript
// Single pattern rule - deactivate before activate
if (this.activePattern) {
    this.deactivate();
}
this.activePattern = patternName;
```

## Pattern Effects

- **breathe**: Scale 1.0↔1.02, opacity 1.0↔0.9
- **focus**: Blue shadow 20px blur 30% opacity
- **simplify**: Others 60% opacity, 98% scale
- **rest**: Sepia 10%, brightness 95%
- **guide**: Golden glow 15px blur 40% opacity
- **protect**: Others 40% opacity

## Behavior Triggers

- Dwell → `gentle-encouragement`
- Hover repeats → `calm-clarity`
- Stress clicks → `cognitive-relief`
- Low activity → `rest-invitation`
- Navigation confusion → `gentle-wayfinding`
- Deep focus → `sacred-focus`