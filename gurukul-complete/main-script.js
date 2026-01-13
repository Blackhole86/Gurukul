
document.addEventListener('DOMContentLoaded', function() {
    const adaptiveManager = window.gurukul ? window.gurukul.stateManager : new AdaptiveStateManager();
    
    if (!window.gurukul || !window.gurukul.stateManager || !window.gurukul.stateManager.states.has('feature-highlight')) {
        adaptiveManager.registerState('feature-highlight', {
            onEnter: (data) => {
                if (data.element) {
                    data.element.style.transform = 'scale(1.05)';
                    data.element.style.boxShadow = '0 12px 40px rgba(103, 126, 234, 0.3)';
                }
            },
            onExit: () => {
                document.querySelectorAll('.feature-card').forEach(card => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            },
            duration: 3000
        });
    }

    if (!window.gurukul || !window.gurukul.stateManager || !window.gurukul.stateManager.states.has('cta-emphasis')) {
        adaptiveManager.registerState('cta-emphasis', {
            onEnter: () => {
                document.querySelectorAll('.btn-primary').forEach(btn => {
                    btn.style.animation = 'gentle-pulse 2s infinite';
                });
            },
            onExit: () => {
                document.querySelectorAll('.btn-primary').forEach(btn => {
                    btn.style.animation = '';
                });
            },
            duration: 4000
        });
    }

    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes gentle-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
    `;
    document.head.appendChild(pulseStyle);
    document.querySelectorAll('.btn-secondary').forEach(button => {
        if (button.textContent.trim() === 'Watch Demo') {
            button.addEventListener('click', function() {
                showDemoModal();
            });
        }
    });

    document.querySelectorAll('.btn-primary').forEach(button => {
        const text = button.textContent.trim();
        if (text === 'Get Started' || text === 'Start Learning' || text === 'Start Free Trial') {
            button.addEventListener('click', function() {
                window.location.href = 'learning-interface.html';
            });
        }
    });

    document.querySelectorAll('.btn-outline').forEach(button => {
        if (button.textContent.trim() === 'Schedule Demo') {
            button.addEventListener('click', function() {
                showDemoModal();
            });
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    let hoverCount = 0;
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            hoverCount++;
            if (hoverCount >= 3) {
                const adaptiveCards = document.querySelectorAll('.feature-card');
                const adaptiveCard = Array.from(adaptiveCards).find(c => 
                    c.textContent.includes('Gentle Encouragement') || 
                    c.textContent.includes('Calm Clarity')
                );
                if (adaptiveCard) {
                    adaptiveManager.enterState('feature-highlight', { element: adaptiveCard });
                }
                hoverCount = 0;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    let ctaInteractions = 0;
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            ctaInteractions++;
            if (ctaInteractions >= 2) {
                adaptiveManager.enterState('cta-emphasis');
                ctaInteractions = 0;
            }
        });

        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .principle-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

function showDemoModal() {
    let modal = document.getElementById('demoModal');
    if (!modal) {
        createDemoModal();
        modal = document.getElementById('demoModal');
    }
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDemoModal() {
    document.getElementById('demoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function createDemoModal() {
    const modalHTML = `
        <div id="demoModal" class="demo-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🎬 Gurukul Platform Demo</h2>
                    <button class="close-btn" onclick="closeDemoModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-video">
                        <div class="video-placeholder">
                            <div class="play-icon">▶️</div>
                            <p>Interactive Demo Video</p>
                            <small>Experience adaptive learning in action</small>
                        </div>
                    </div>
                    <div class="demo-features">
                        <h3>What you'll see:</h3>
                        <ul>
                            <li>✨ Adaptive interface responding to learning patterns</li>
                            <li>🧘 Gentle encouragement and calm clarity features</li>
                            <li>📚 Interactive lesson content and note-taking</li>
                            <li>🎯 Personalized question difficulty adjustment</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="window.location.href='learning-interface.html'">Try Live Demo</button>
                    <button class="btn-outline" onclick="closeDemoModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}