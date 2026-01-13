
class AdaptiveStateManager {
    constructor() {
        this.currentState = null;
        this.states = new Map();
        this.stateTimeout = null;
    }

    // Register a state with enter/exit handlers
    registerState(name, config) {
        if (!name || typeof name !== 'string') {
            console.warn('[AdaptiveState] Invalid state name');
            return false;
        }

        this.states.set(name, {
            onEnter: config.onEnter || (() => {}),
            onExit: config.onExit || (() => {}),
            duration: config.duration || 0
        });
        return true;
    }

    // Enter a state (with overlap prevention)
    enterState(name, data = {}) {
        if (this.currentState === name) {
            return false;
        }

        if (!this.states.has(name)) {
            console.warn(`[AdaptiveState] Unknown state: ${name}`);
            return false;
        }

        // Check with Safety Governor if available
        if (window.gurukul && window.gurukul.safetyGovernor) {
            if (!window.gurukul.safetyGovernor.canEnterState(name)) {
                console.log(`[SafetyGovernor] Blocked state: ${name}`);
                return false;
            }
        }

        if (this.currentState) {
            this.exitState();
        }

        const state = this.states.get(name);
        this.currentState = name;

        // Update Safety Governor
        if (window.gurukul && window.gurukul.safetyGovernor) {
            window.gurukul.safetyGovernor.enterState(name);
        }

        try {
            state.onEnter(data);
            
            if (state.duration > 0) {
                this.stateTimeout = setTimeout(() => {
                    this.exitState();
                }, state.duration);
            }
            
            return true;
        } catch (error) {
            console.error(`[AdaptiveState] Error entering ${name}:`, error);
            this.currentState = null;
            return false;
        }
    }

    exitState() {
        if (!this.currentState) return false;

        const state = this.states.get(this.currentState);
        const stateName = this.currentState;

        if (this.stateTimeout) {
            clearTimeout(this.stateTimeout);
            this.stateTimeout = null;
        }

        this.currentState = null;

        // Update Safety Governor
        if (window.gurukul && window.gurukul.safetyGovernor) {
            window.gurukul.safetyGovernor.exitState();
        }

        try {
            state.onExit();
            return true;
        } catch (error) {
            console.error(`[AdaptiveState] Error exiting ${stateName}:`, error);
            return false;
        }
    }

    getCurrentState() {
        return this.currentState;
    }

    isActive(name) {
        return this.currentState === name;
    }

    reset() {
        this.exitState();
        this.states.clear();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdaptiveStateManager;
} else {
    window.AdaptiveStateManager = AdaptiveStateManager;
}