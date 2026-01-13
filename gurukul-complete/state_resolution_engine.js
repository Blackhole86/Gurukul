class StateResolutionEngine {
    constructor() {
        this.signalMap = new Map([
            ['hesitation', 'gentle-encouragement'],
            ['confusion', 'calm-clarity'],
            ['overwhelm', 'cognitive-relief'],
            ['fatigue', 'rest-invitation'],
            ['lost', 'gentle-wayfinding'],
            ['distracted', 'sacred-focus'],
            ['correct', 'positive-validation'],
            ['incorrect', 'supportive-guidance'],
            ['idle', 'gentle-nudge'],
            ['engaged', 'maintain-flow']
        ]);
    }

    resolve(signal) {
        return this.signalMap.get(signal) || 'neutral';
    }

    resolveMultiple(signals) {
        if (!Array.isArray(signals) || signals.length === 0) return 'neutral';
        
        const priorities = ['overwhelm', 'fatigue', 'confusion', 'lost', 'hesitation'];
        
        for (const priority of priorities) {
            if (signals.includes(priority)) {
                return this.signalMap.get(priority);
            }
        }
        
        return this.signalMap.get(signals[0]) || 'neutral';
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StateResolutionEngine;
} else {
    window.StateResolutionEngine = StateResolutionEngine;
}