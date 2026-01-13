class CalmPatterns {
    constructor() {
        this.activePattern = null;
        this.injectStyles();
    }

    activate(patternName, element = null) {
        if (this.activePattern) {
            this.deactivate();
        }

        this.activePattern = patternName;
        
        switch (patternName) {
            case 'breathe':
                this.applyBreathe(element);
                break;
            case 'focus':
                this.applyFocus(element);
                break;
            case 'simplify':
                this.applySimplify();
                break;
            case 'rest':
                this.applyRest();
                break;
            case 'guide':
                this.applyGuide(element);
                break;
            case 'protect':
                this.applyProtect(element);
                break;
        }
    }

    deactivate() {
        if (!this.activePattern) return;

        document.body.classList.remove('calm-simplify', 'calm-rest', 'calm-protect');
        document.querySelectorAll('.calm-breathe, .calm-focus, .calm-guide').forEach(el => {
            el.classList.remove('calm-breathe', 'calm-focus', 'calm-guide');
        });

        this.activePattern = null;
    }

    applyBreathe(element) {
        if (element) element.classList.add('calm-breathe');
    }

    applyFocus(element) {
        if (element) element.classList.add('calm-focus');
    }

    applySimplify() {
        document.body.classList.add('calm-simplify');
    }

    applyRest() {
        document.body.classList.add('calm-rest');
    }

    applyGuide(element) {
        if (element) element.classList.add('calm-guide');
    }

    applyProtect(element) {
        document.body.classList.add('calm-protect');
        if (element) element.classList.add('calm-focus');
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .calm-breathe {
                animation: calm-breathe 4s ease-in-out infinite;
                transition: all 0.8s ease;
            }
            
            .calm-focus {
                box-shadow: 0 0 20px rgba(103, 126, 234, 0.3);
                transition: all 0.8s ease;
            }
            
            .calm-guide {
                box-shadow: 0 0 15px rgba(255, 193, 7, 0.4);
                transition: all 0.8s ease;
            }
            
            .calm-simplify .feature-card:not(.calm-focus),
            .calm-simplify .panel:not(.calm-focus) {
                opacity: 0.6;
                transform: scale(0.98);
                transition: all 0.8s ease;
            }
            
            .calm-rest {
                filter: sepia(0.1) brightness(0.95);
                transition: filter 1s ease;
            }
            
            .calm-protect .feature-card:not(.calm-focus),
            .calm-protect .panel:not(.calm-focus) {
                opacity: 0.4;
                transition: all 1s ease;
            }
            
            @keyframes calm-breathe {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.02); opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);
    }

    getCurrentPattern() {
        return this.activePattern;
    }
}

window.CalmPatterns = CalmPatterns;