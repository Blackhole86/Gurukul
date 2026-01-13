class SafetyGovernor {
    constructor() {
        this.activeState = null;
        this.flowStates = ['sacred-focus', 'maintain-flow'];
        this.cooldowns = new Map();
        this.cooldownDurations = {
            'cognitive-relief': 10000,
            'rest-invitation': 15000,
            'sacred-focus': 20000,
            'default': 3000
        };
    }

    canEnterState(newState) {
        // Rule 1: Only 1 pattern active
        if (this.activeState && this.activeState !== newState) {
            return false;
        }

        // Rule 2: No override during flow
        if (this.flowStates.includes(this.activeState)) {
            return false;
        }

        // Rule 3: Cooldowns enforced
        if (this.isInCooldown(newState)) {
            return false;
        }

        return true;
    }

    enterState(state) {
        if (!this.canEnterState(state)) {
            return false;
        }

        this.activeState = state;
        this.setCooldown(state);
        return true;
    }

    exitState() {
        this.activeState = null;
    }

    isInCooldown(state) {
        const cooldownEnd = this.cooldowns.get(state);
        return cooldownEnd && Date.now() < cooldownEnd;
    }

    setCooldown(state) {
        const duration = this.cooldownDurations[state] || this.cooldownDurations.default;
        this.cooldowns.set(state, Date.now() + duration);
    }

    getActiveState() {
        return this.activeState;
    }

    reset() {
        this.activeState = null;
        this.cooldowns.clear();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SafetyGovernor;
} else {
    window.SafetyGovernor = SafetyGovernor;
}