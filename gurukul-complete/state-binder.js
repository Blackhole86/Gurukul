
class StateBinder {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.calmPatterns = new CalmPatterns();
        this.bindingMap = {
            'gentle-encouragement': 'breathe',
            'calm-clarity': 'focus',
            'cognitive-relief': 'simplify',
            'rest-invitation': 'rest',
            'gentle-wayfinding': 'guide',
            'sacred-focus': 'protect'
        };
        
        this.attachToStateManager();
    }

    // Attach to state manager's enter/exit methods
    attachToStateManager() {
        const originalEnter = this.stateManager.enterState.bind(this.stateManager);
        const originalExit = this.stateManager.exitState.bind(this.stateManager);

        this.stateManager.enterState = (stateName, data = {}) => {
            const result = originalEnter(stateName, data);
            if (result) {
                this.onStateEnter(stateName, data);
            }
            return result;
        };

        this.stateManager.exitState = () => {
            const currentState = this.stateManager.getCurrentState();
            const result = originalExit();
            if (result && currentState) {
                this.onStateExit();
            }
            return result;
        };
    }

    // Handle state entry - activate corresponding pattern
    onStateEnter(stateName, data) {
        const patternName = this.bindingMap[stateName];
        if (patternName) {
            this.calmPatterns.activate(patternName, data.element);
        }
    }

    // Handle state exit - gracefully deactivate pattern
    onStateExit() {
        this.calmPatterns.deactivate();
    }

    // Get current active pattern
    getActivePattern() {
        return this.calmPatterns.getCurrentPattern();
    }
}

window.StateBinder = StateBinder;