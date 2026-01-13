
class GurukulAdaptive {
    constructor() {
        this.stateManager = new AdaptiveStateManager();
        this.stateResolver = new StateResolutionEngine();
        this.safetyGovernor = new SafetyGovernor();
        this.stateBinder = new StateBinder(this.stateManager);
        this.behaviorTrackers = {
            dwell: new Map(),
            hover: new Map(),
            stress: { clicks: [], movements: [] },
            fatigue: { interactions: [], lastActivity: Date.now() },
            backtrack: [],
            focus: { startTime: null, element: null }
        };
        
        this.registerStates();
        this.init();
    }

    registerStates() {
        this.stateManager.registerState('gentle-encouragement', {
            onEnter: (data) => {
                if (data.element) {
                    data.element.classList.add('gentle-encouragement');
                }
            },
            onExit: () => {
                document.querySelectorAll('.gentle-encouragement')
                    .forEach(el => el.classList.remove('gentle-encouragement'));
            },
            duration: 4000
        });

        this.stateManager.registerState('calm-clarity', {
            onEnter: (data) => {
                document.body.classList.add('calm-clarity');
                if (data.element) {
                    data.element.classList.add('focused');
                }
            },
            onExit: () => {
                document.body.classList.remove('calm-clarity');
                document.querySelectorAll('.focused')
                    .forEach(el => el.classList.remove('focused'));
            },
            duration: 4000
        });

        this.stateManager.registerState('cognitive-relief', {
            onEnter: () => {
                document.body.classList.add('cognitive-relief');
            },
            onExit: () => {
                document.body.classList.remove('cognitive-relief');
            },
            duration: 6000
        });

        this.stateManager.registerState('rest-invitation', {
            onEnter: () => {
                document.body.classList.add('rest-invitation');
            },
            onExit: () => {
                document.body.classList.remove('rest-invitation');
            },
            duration: 8000
        });

        this.stateManager.registerState('gentle-wayfinding', {
            onEnter: (data) => {
                if (data.element) {
                    data.element.classList.add('gentle-wayfinding');
                }
            },
            onExit: () => {
                document.querySelectorAll('.gentle-wayfinding')
                    .forEach(el => el.classList.remove('gentle-wayfinding'));
            },
            duration: 3500
        });

        this.stateManager.registerState('sacred-focus', {
            onEnter: (data) => {
                document.body.classList.add('sacred-focus');
                if (data.element) {
                    data.element.classList.add('in-focus');
                }
            },
            onExit: () => {
                document.body.classList.remove('sacred-focus');
                document.querySelectorAll('.in-focus')
                    .forEach(el => el.classList.remove('in-focus'));
            },
            duration: 12000
        });
    }

    init() {
        this.setupDwellTracking();
        this.setupHoverTracking();
        this.setupStressTracking();
        this.setupFatigueTracking();
        this.setupBacktrackTracking();
        this.setupFocusTracking();
    }

    destroy() {
        this.stateManager.reset();
    }

    setupDwellTracking() {
        document.querySelectorAll('.content-block, .panel, .formula-box').forEach(element => {
            let dwellTimer = null;
            
            element.addEventListener('mouseenter', () => {
                dwellTimer = setTimeout(() => {
                    this.stateManager.enterState('gentle-encouragement', { element });
                }, 3000);
            });
            
            element.addEventListener('mouseleave', () => {
                if (dwellTimer) clearTimeout(dwellTimer);
            });
        });
    }

    setupHoverTracking() {
        document.querySelectorAll('.option-btn, .suggestion-btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                const elementId = element.dataset.answer || element.textContent.slice(0, 10);
                const now = Date.now();
                
                if (!this.behaviorTrackers.hover.has(elementId)) {
                    this.behaviorTrackers.hover.set(elementId, []);
                }
                
                const hovers = this.behaviorTrackers.hover.get(elementId);
                hovers.push(now);
                
                const recentHovers = hovers.filter(time => now - time < 5000);
                this.behaviorTrackers.hover.set(elementId, recentHovers);
                
                if (recentHovers.length >= 3) {
                    const resolvedState = this.stateResolver.resolve('confusion');
                    this.stateManager.enterState(resolvedState, { element });
                }
            });
        });
    }

    setupStressTracking() {
        document.addEventListener('click', (e) => {
            const now = Date.now();
            this.behaviorTrackers.stress.clicks.push(now);
            
            this.behaviorTrackers.stress.clicks = this.behaviorTrackers.stress.clicks
                .filter(time => now - time < 3000);
            
            if (this.behaviorTrackers.stress.clicks.length >= 5) {
                const resolvedState = this.stateResolver.resolve('overwhelm');
                this.stateManager.enterState(resolvedState);
            }
        });
    }

    setupFatigueTracking() {
        document.addEventListener('click', () => {
            this.behaviorTrackers.fatigue.interactions.push(Date.now());
            this.behaviorTrackers.fatigue.lastActivity = Date.now();
        });
        
        setInterval(() => {
            const now = Date.now();
            const recentInteractions = this.behaviorTrackers.fatigue.interactions
                .filter(time => now - time < 60000);
            
            this.behaviorTrackers.fatigue.interactions = recentInteractions;
            
            if (recentInteractions.length < 3 && 
                now - this.behaviorTrackers.fatigue.lastActivity > 45000) {
                this.stateManager.enterState('rest-invitation');
            }
        }, 30000);
    }

    setupBacktrackTracking() {
        document.querySelectorAll('.panel, .content-block').forEach(element => {
            element.addEventListener('click', () => {
                const elementId = element.className;
                const now = Date.now();
                
                this.behaviorTrackers.backtrack.push({ element: elementId, time: now });
                
                this.behaviorTrackers.backtrack = this.behaviorTrackers.backtrack
                    .filter(nav => now - nav.time < 10000);
                
                if (this.behaviorTrackers.backtrack.length >= 4) {
                    const recent = this.behaviorTrackers.backtrack.slice(-4);
                    const isBacktrack = recent[0].element === recent[2].element && 
                                       recent[1].element === recent[3].element;
                    
                    if (isBacktrack) {
                        this.stateManager.enterState('gentle-wayfinding', { element });
                    }
                }
            });
        });
    }

    setupFocusTracking() {
        document.querySelectorAll('.content-block, .panel').forEach(element => {
            let focusTimer = null;
            let currentElement = null;
            
            element.addEventListener('mouseenter', () => {
                currentElement = element;
                this.behaviorTrackers.focus.startTime = Date.now();
                this.behaviorTrackers.focus.element = element;
                
                focusTimer = setTimeout(() => {
                    if (currentElement === element) {
                        this.stateManager.enterState('sacred-focus', { element });
                    }
                }, 10000);
            });
            
            element.addEventListener('mouseleave', () => {
                if (focusTimer) clearTimeout(focusTimer);
                currentElement = null;
                this.behaviorTrackers.focus.element = null;
            });
        });
    }

    getCurrentState() {
        return this.stateManager.getCurrentState();
    }

    exitCurrentState() {
        return this.stateManager.exitState();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gurukul = new GurukulAdaptive();
    
    const statusEl = document.getElementById('engineStatus');
    
    // Verify State Resolution Engine connection
    if (window.gurukul.stateResolver) {
        statusEl.textContent = '✅ State Engine: Active';
        statusEl.style.color = '#4CAF50';
        console.log('✅ State Resolution Engine: Connected');
        console.log('✅ Safety Governor: Active');
        console.log('📋 Available signals:', Array.from(window.gurukul.stateResolver.signalMap.keys()));
    } else {
        statusEl.textContent = '❌ State Engine: Offline';
        statusEl.style.color = '#f44336';
        console.log('❌ State Resolution Engine: Not connected');
    }
    
    console.log('🌱 Gurukul Adaptive System: Enhanced with state manager');
});