
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const textarea = document.getElementById('notesArea');
            const suggestion = btn.dataset.suggestion;
            
            const cursorPos = textarea.selectionStart;
            const textBefore = textarea.value.substring(0, cursorPos);
            const textAfter = textarea.value.substring(cursorPos);
            
            textarea.value = textBefore + suggestion + textAfter;
            textarea.focus();
            
            const newPos = cursorPos + suggestion.length;
            textarea.setSelectionRange(newPos, newPos);
            
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            if (this.dataset.answer === 'a') {
                setTimeout(() => {
                    this.classList.add('correct-answer');
                    showFeedback('Excellent! You correctly applied the Pythagorean theorem.', 'success');
                }, 800);
            } else {
                setTimeout(() => {
                    showFeedback('Not quite right. Remember: a² + b² = c²', 'hint');
                }, 500);
            }
        });
    });

    let saveTimeout;
    const notesArea = document.getElementById('notesArea');
    const autoSaveIndicator = document.querySelector('.auto-save');
    
    if (notesArea && autoSaveIndicator) {
        notesArea.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            autoSaveIndicator.textContent = '💾 Saving...';
            autoSaveIndicator.style.color = '#ffa500';
            
            saveTimeout = setTimeout(() => {
                try {
                    localStorage.setItem('gurukul_notes', this.value);
                    autoSaveIndicator.textContent = '✓ Auto-saved';
                    autoSaveIndicator.style.color = '#48bb78';
                } catch (e) {
                    autoSaveIndicator.textContent = '⚠ Save failed';
                    autoSaveIndicator.style.color = '#e53e3e';
                }
            }, 1000);
        });

        try {
            const savedNotes = localStorage.getItem('gurukul_notes');
            if (savedNotes) {
                notesArea.value = savedNotes;
            }
        } catch (e) {
            console.warn('Could not load saved notes');
        }
    }

    function updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        const currentProgress = parseInt(progressBar.style.width) || 45;
        
        const newProgress = Math.min(currentProgress + 5, 100);
        progressBar.style.width = newProgress + '%';
        
        const timeElement = document.querySelector('.progress-info span:last-child');
        if (timeElement) {
            const match = timeElement.textContent.match(/\d+/);
            const currentTime = match ? parseInt(match[0]) : 23;
            timeElement.textContent = `Time: ${currentTime + 1} min`;
        }
    }

    let interactionCount = 0;
    document.addEventListener('click', function(e) {
        if (e.target.matches('.option-btn, .suggestion-btn') || 
            e.target.closest('.content-block')) {
            interactionCount++;
            if (interactionCount % 3 === 0) {
                updateProgress();
            }
        }
    });

    function showFeedback(message, type) {
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${type}`;
        feedback.textContent = message;
        
        Object.assign(feedback.style, {
            position: 'fixed',
            top: '100px',
            right: '24px',
            background: type === 'success' ? '#48bb78' : '#667eea',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            fontSize: '14px',
            fontWeight: '500'
        });

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 4000);
    }

    document.querySelectorAll('.panel').forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (notesArea) {
                try {
                    localStorage.setItem('gurukul_notes', notesArea.value);
                    showFeedback('Notes saved successfully!', 'success');
                } catch (err) {
                    showFeedback('Failed to save notes', 'hint');
                }
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (notesArea) {
                notesArea.focus();
            }
        }
    });

    document.querySelectorAll('.action-btn').forEach((btn, index) => {
        const tooltips = ['Bookmark this lesson', 'Share lesson'];
        btn.title = tooltips[index] || 'Action';
        
        btn.addEventListener('click', function() {
            const action = this.title;
            showFeedback(`${action} - Feature coming soon!`, 'hint');
        });
    });

    console.log('🌱 Gurukul Learning Interface: Enhanced features loaded');
});

const adaptiveIndicator = document.querySelector('.adaptive-indicator');
if (adaptiveIndicator) {
    const observer= new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const body = document.body;
                if (body.classList.contains('gentle-encouragement')) {
                    adaptiveIndicator.textContent = '🌱 Encouraging your focus';
                } else if (body.classList.contains('calm-clarity')) {
                    adaptiveIndicator.textContent = '🌱 Creating thinking space';
                } else if (body.classList.contains('cognitive-relief')) {
                     adaptiveIndicator.textContent = '🌱 Simplifying for clarity';
                } else if (body.classList.contains('rest-invitation')) {
                    adaptiveIndicator.textContent = '🌱 Suggesting gentle rest';
                } else if (body.classList.contains('sacred-focus')) {
                    adaptiveIndicator.textContent = '🌱 Protecting your focus';
                } else {
                    adaptiveIndicator.textContent = '🌱 Learning with you';
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
}