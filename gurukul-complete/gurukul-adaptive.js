class GurukulAdaptive {
    constructor() {
        this.activePattern = null;
        this.fatigueInterval = null;
        this.behaviorTrackers = {
            dwell: new Map(),
            hover: new Map(),
            stress: { clicks: [], movements: [] },
            fatigue: { interactions: [], lastActivity: Date.now() },
            backtrack: [],
            focus: { startTime: null, element: null }
        };
        
        this.init();
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
        if (this.fatigueInterval) {
            clearInterval(this.fatigueInterval);
        }
    }

    // Dwell tracking
    setupDwellTracking() {
        document.querySelectorAll('.content-block, .panel, .formula-box').forEach(element => {
            let dwellTimer = null;
            
            element.addEventListener('mouseenter', () => {
                dwellTimer = setTimeout(() => {
                    this.activatePattern('gentle-encouragement', element);
                }, 3000); 
            });
            
            element.addEventListener('mouseleave', () => {
                if (dwellTimer) clearTimeout(dwellTimer);
            });
        });
    }

    // Hover repeat tracking
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
                    this.activatePattern('calm-clarity', element);
                }
            });
        });
    }

    // Stress tracking
    setupStressTracking() {
        document.addEventListener('click', (e) => {
            const now = Date.now();
            this.behaviorTrackers.stress.clicks.push(now);
            
            this.behaviorTrackers.stress.clicks = this.behaviorTrackers.stress.clicks
                .filter(time => now - time < 3000);
            
            if (this.behaviorTrackers.stress.clicks.length >= 5) {
                this.activatePattern('cognitive-relief');
            }
        });
        
        let mouseMovements = [];
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            mouseMovements.push({ x: e.clientX, y: e.clientY, time: now });
            
            mouseMovements = mouseMovements.filter(move => now - move.time < 2000);
            
            if (mouseMovements.length > 20) {
                const variance = this.calculateMovementVariance(mouseMovements);
                if (variance > 10000) { 
                    this.activatePattern('cognitive-relief');
                }
            }
        });
    }

    // Fatigue tracking
    setupFatigueTracking() {
        document.addEventListener('click', () => {
            this.behaviorTrackers.fatigue.interactions.push(Date.now());
            this.behaviorTrackers.fatigue.lastActivity = Date.now();
        });
        
        this.fatigueInterval = setInterval(() => {
            const now = Date.now();
            const recentInteractions = this.behaviorTrackers.fatigue.interactions
                .filter(time => now - time < 60000); 

            this.behaviorTrackers.fatigue.interactions = recentInteractions;
            
            if (recentInteractions.length < 3 && 
                now - this.behaviorTrackers.fatigue.lastActivity > 45000) {
                this.activatePattern('rest-invitation');
            }
        }, 30000);
    }

    // Backtrack tracking
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
                        this.activatePattern('gentle-wayfinding', element);
                    }
                }
            });
        });
    }

    // Deep focus tracking
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
                        this.activatePattern('sacred-focus', element);
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

    // Pattern activation
    activatePattern(patternName, targetElement = null) {
        if (this.activePattern) return;
        
        this.activePattern = patternName;
        
        switch (patternName) {
            case 'gentle-encouragement':
                this.applyGentleEncouragement(targetElement);
                break;
            case 'calm-clarity':
                this.applyCalmClarity(targetElement);
                break;
            case 'cognitive-relief':
                this.applyCognitiveRelief();
                break;
            case 'rest-invitation':
                this.applyRestInvitation();
                break;
            case 'gentle-wayfinding':
                this.applyGentleWayfinding(targetElement);
                break;
            case 'sacred-focus':
                this.applySacredFocus(targetElement);
                break;
            default:
                console.warn('Unknown pattern:', patternName);
                this.activePattern = null;
                break;
        }
    }

    applyGentleEncouragement(element) {
        if (!element) return;
        element.classList.add('gentle-encouragement');
        setTimeout(() => {
            element.classList.remove('gentle-encouragement');
            this.activePattern = null;
        }, 4000);
    }

    applyCalmClarity(element) {
        if (!element) return;
        document.body.classList.add('calm-clarity');
        element.classList.add('focused');
        
        setTimeout(() => {
            document.body.classList.remove('calm-clarity');
            element.classList.remove('focused');
            this.activePattern = null;
        }, 4000);
    }

    applyCognitiveRelief() {
        document.body.classList.add('cognitive-relief');
        
        setTimeout(() => {
            document.body.classList.remove('cognitive-relief');
            this.activePattern = null;
        }, 6000);
    }

    applyRestInvitation() {
        document.body.classList.add('rest-invitation');
        
        setTimeout(() => {
            document.body.classList.remove('rest-invitation');
            this.activePattern = null;
        }, 8000);
    }

    applyGentleWayfinding(element) {
        element.classList.add('gentle-wayfinding');
        
        setTimeout(() => {
            element.classList.remove('gentle-wayfinding');
            this.activePattern = null;
        }, 3500);
    }

    applySacredFocus(element) {
        document.body.classList.add('sacred-focus');
        element.classList.add('in-focus');
        
        setTimeout(() => {
            document.body.classList.remove('sacred-focus');
            element.classList.remove('in-focus');
            this.activePattern = null;
        }, 12000);
    }

    // Helper methods
    calculateMovementVariance(movements) {
        if (movements.length < 2) return 0;
        
        const distances = [];
        for (let i = 1; i < movements.length; i++) {
            const dx = movements[i].x - movements[i-1].x;
            const dy = movements[i].y - movements[i-1].y;
            distances.push(Math.sqrt(dx*dx + dy*dy));
        }
        
        const mean = distances.reduce((a, b) => a + b, 0) / distances.length;
        const variance = distances.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / distances.length;
        
        return variance;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GurukulAdaptive();
    console.log('🌱 Gurukul Adaptive System: Initialized according to learning alignment');
});