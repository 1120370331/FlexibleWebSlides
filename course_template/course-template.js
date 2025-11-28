/**
 * Course Template v2 - Interactive Presentation Framework
 * ========================================================
 * Features:
 * - Slide navigation (keyboard + buttons)
 * - Interactive code labs (auto-run & manual)
 * - Quiz validation with feedback
 * - Theme switching with persistence
 * - Reveal/hide sections
 */

(function() {
    'use strict';

    // ============================================
    // INITIALIZATION
    // ============================================

    document.addEventListener('DOMContentLoaded', () => {
        initSlides();
        initLabs();
        initReveals();
        initThemeSwitcher();
    });

    // ============================================
    // SLIDE NAVIGATION
    // ============================================

    function initSlides() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        const currentEl = document.querySelector('[data-current]');
        const totalEl = document.querySelector('[data-total]');
        const progressIndicator = document.querySelector('.progress-indicator');

        if (!slides.length) return;

        let currentIndex = 0;

        // Set total
        if (totalEl) totalEl.textContent = slides.length;

        function showSlide(index) {
            // Clamp index
            index = Math.max(0, Math.min(index, slides.length - 1));
            currentIndex = index;

            // Update active slide
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === index);
            });

            // Update counter
            if (currentEl) currentEl.textContent = index + 1;

            // Update progress bar
            if (progressIndicator) {
                const progress = ((index + 1) / slides.length) * 100;
                progressIndicator.style.width = progress + '%';
            }

            // Update button states
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === slides.length - 1;
        }

        // Button handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip if focus is on input/textarea/select
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    showSlide(currentIndex + 1);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    showSlide(currentIndex - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    showSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    showSlide(slides.length - 1);
                    break;
            }
        });

        // Initialize first slide
        showSlide(0);
    }

    // ============================================
    // INTERACTIVE LABS
    // ============================================

    function initLabs() {
        document.querySelectorAll('.lab').forEach(lab => {
            const tabs = lab.querySelectorAll('.lab-tab');
            const editors = lab.querySelectorAll('.lab-editors textarea');
            const iframe = lab.querySelector('iframe');
            const runBtn = lab.querySelector('.lab-run');
            const autoRun = lab.dataset.autoRun;

            // Tab switching
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const lang = tab.dataset.lang;
                    
                    tabs.forEach(t => t.classList.toggle('is-active', t === tab));
                    editors.forEach(e => e.classList.toggle('is-active', e.dataset.lang === lang));
                });
            });

            // Run code function
            function runCode() {
                if (!iframe) return;

                const html = lab.querySelector('textarea[data-lang="html"]')?.value || '';
                const css = lab.querySelector('textarea[data-lang="css"]')?.value || '';
                const js = lab.querySelector('textarea[data-lang="js"]')?.value || '';

                const doc = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;

                iframe.srcdoc = doc;
            }

            // Manual run button
            if (runBtn) {
                runBtn.addEventListener('click', runCode);
            }

            // Auto-run on input (for HTML/CSS only labs)
            if (autoRun === 'input') {
                editors.forEach(editor => {
                    editor.addEventListener('input', debounce(runCode, 300));
                });
                // Initial render
                runCode();
            }
        });
    }

    // ============================================
    // REVEAL SECTIONS
    // ============================================

    function initReveals() {
        document.querySelectorAll('.reveal-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.dataset.reveal;
                const content = document.getElementById(targetId);
                
                if (content) {
                    content.classList.toggle('is-visible');
                    trigger.textContent = content.classList.contains('is-visible') 
                        ? trigger.textContent.replace('查看', '隐藏').replace('Click to reveal', 'Click to hide')
                        : trigger.textContent.replace('隐藏', '查看').replace('Click to hide', 'Click to reveal');
                }
            });
        });
    }

    // ============================================
    // THEME SWITCHER
    // ============================================

    function initThemeSwitcher() {
        // Create theme switcher UI if not exists
        if (!document.querySelector('.theme-switcher')) {
            const switcher = document.createElement('div');
            switcher.className = 'theme-switcher';
            switcher.innerHTML = `
                <button class="theme-switcher-toggle" title="切换主题">🎨</button>
                <div class="theme-switcher-menu">
                    <button class="theme-btn" data-theme="indigo">🔮 Indigo</button>
                    <button class="theme-btn" data-theme="ocean">🌊 Ocean</button>
                    <button class="theme-btn" data-theme="forest">🌲 Forest</button>
                    <button class="theme-btn" data-theme="sunset">🌅 Sunset</button>
                    <button class="theme-btn" data-theme="rose">🌸 Rose</button>
                    <button class="theme-btn" data-theme="midnight">🌙 Midnight</button>
                    <button class="theme-btn" data-theme="mono">⬛ Mono</button>
                </div>
            `;
            document.body.appendChild(switcher);
        }

        const toggle = document.querySelector('.theme-switcher-toggle');
        const menu = document.querySelector('.theme-switcher-menu');
        const themeBtns = document.querySelectorAll('.theme-btn');

        // Load saved theme
        const savedTheme = localStorage.getItem('course-theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
        }

        // Update active button
        function updateActiveBtn() {
            const currentTheme = document.body.dataset.theme || 'indigo';
            themeBtns.forEach(btn => {
                btn.classList.toggle('is-active', btn.dataset.theme === currentTheme);
            });
        }
        updateActiveBtn();

        // Toggle menu
        toggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            menu?.classList.toggle('is-open');
        });

        // Theme selection
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                document.body.dataset.theme = theme;
                localStorage.setItem('course-theme', theme);
                updateActiveBtn();
                menu?.classList.remove('is-open');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', () => {
            menu?.classList.remove('is-open');
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ============================================
    // QUIZ HELPER FUNCTIONS (Exported for custom use)
    // ============================================

    window.CourseTemplate = {
        /**
         * Initialize answer toggle buttons
         * Call this after DOM is ready if you have custom quiz sections
         */
        initAnswerToggles: function() {
            document.querySelectorAll('.quiz-answer-toggle').forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const container = toggle.closest('.task-card, .concept-card');
                    const answers = container?.querySelectorAll('.quiz-answer');
                    const isShowing = toggle.classList.toggle('is-showing');
                    answers?.forEach(a => a.classList.toggle('is-visible', isShowing));
                });
            });
        },

        /**
         * Mark an input as correct
         * @param {HTMLElement} input - The input element
         * @param {HTMLElement} statusEl - Optional status span element
         */
        markCorrect: function(input, statusEl) {
            input.classList.remove('quiz-wrong');
            input.classList.add('quiz-correct');
            if (statusEl) {
                statusEl.classList.add('is-visible', 'is-correct');
                statusEl.classList.remove('is-wrong');
                statusEl.textContent = '✓';
            }
        },

        /**
         * Mark an input as wrong
         * @param {HTMLElement} input - The input element
         * @param {HTMLElement} statusEl - Optional status span element
         */
        markWrong: function(input, statusEl) {
            input.classList.remove('quiz-correct');
            input.classList.add('quiz-wrong');
            if (statusEl) {
                statusEl.classList.add('is-visible', 'is-wrong');
                statusEl.classList.remove('is-correct');
                statusEl.textContent = '✗';
            }
        },

        /**
         * Clear input state
         * @param {HTMLElement} input - The input element
         * @param {HTMLElement} statusEl - Optional status span element
         */
        clearState: function(input, statusEl) {
            input.classList.remove('quiz-wrong', 'quiz-correct');
            if (statusEl) {
                statusEl.classList.remove('is-visible', 'is-wrong', 'is-correct');
                statusEl.textContent = '';
            }
        },

        /**
         * Show result message
         * @param {HTMLElement} resultEl - The result paragraph element
         * @param {string} message - Message to display
         * @param {boolean} isSuccess - Whether it's a success message
         */
        showResult: function(resultEl, message, isSuccess) {
            if (resultEl) {
                resultEl.textContent = message;
                resultEl.style.color = isSuccess ? '#059669' : '#b45309';
            }
        }
    };

})();
