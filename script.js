function initPopup() {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popupForm = document.getElementById('popupForm');
    const closeBtn = document.querySelector('.close-btn');

    if (openPopupBtn && popupForm) {
        openPopupBtn.addEventListener('click', () => {
            popupForm.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            popupForm.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === popupForm) {
                popupForm.style.display = 'none';
            }
        });

        document.getElementById('popupSubscribeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            popupForm.style.display = 'none';
            this.reset();
        });
    }
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        updateThemeButton(true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.classList.add('dark-theme');
                updateThemeButton(true);
            } else {
                document.body.classList.remove('dark-theme');
                updateThemeButton(false);
            }
            
            localStorage.setItem('darkMode', isDarkMode);
        });
    }
}

function updateThemeButton(isDark) {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;

    if (isDark) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun me-2"></i>Light Mode';
        themeToggleBtn.style.background = 'linear-gradient(135deg, #eeff00ff 0%, #ffe600ff 100%)';
        themeToggleBtn.style.color = '#333';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon me-2"></i>Dark Mode';
        themeToggleBtn.style.background = 'linear-gradient(135deg, var(--primary-red) 0%, var(--dark-red) 100%)';
        themeToggleBtn.style.color = 'white';
    }
}

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
}

function initSoundEffects() {
    document.querySelectorAll('.btn-custom, .floating-btn, .aca-team-card').forEach(button => {
        button.addEventListener('click', () => {
            playClickSound();
        });
    });

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            playClickSound();
        });
    }
}

function initInteractiveFAQ() {
    const faqSection = document.querySelector('.aca-faq-section');
    if (!faqSection) return;

    const quizHTML = `
        <div class="quiz-container mt-5">
            <div class="card card-custom">
                <div class="card-body card-body-custom">
                    <h4 class="card-title-custom">American Culture Quiz</h4>
                    <p class="card-text-custom">Test your knowledge about American culture with this interactive quiz!</p>
                    <div id="quizQuestions"></div>
                    <button id="startQuiz" class="btn btn-custom mt-3">
                        <i class="fas fa-play me-2"></i>Start Quiz
                    </button>
                    <div id="quizResult" class="mt-3"></div>
                </div>
            </div>
        </div>
    `;

    const faqAccordion = document.getElementById('faqAccordion');
    if (faqAccordion) {
        faqAccordion.insertAdjacentHTML('afterend', quizHTML);
    }

    const quizData = [
        {
            question: "Which music genre originated in the United States?",
            options: ["Jazz", "Flamenco", "Reggae", "K-Pop"],
            correct: 0,
            fact: "Jazz originated in New Orleans in the late 19th century and is considered America's classical music."
        },
        {
            question: "What is the traditional American Thanksgiving dish?",
            options: ["Pizza", "Sushi", "Turkey", "Tacos"],
            correct: 2,
            fact: "Turkey has been the centerpiece of Thanksgiving meals since the 19th century, with over 46 million turkeys consumed each Thanksgiving."
        },
        {
            question: "Which sport is known as 'America's Pastime'?",
            options: ["Basketball", "Baseball", "Soccer", "Hockey"],
            correct: 1,
            fact: "Baseball earned the nickname 'America's Pastime' in the 1850s and was the first professional team sport in the US."
        },
        {
            question: "Which landmark is a symbol of American freedom?",
            options: ["Golden Gate Bridge", "Statue of Liberty", "Mount Rushmore", "Grand Canyon"],
            correct: 1,
            fact: "The Statue of Liberty was a gift from France in 1886 and has welcomed millions of immigrants to America."
        },
        {
            question: "What American holiday features fireworks displays?",
            options: ["Thanksgiving", "Independence Day", "Labor Day", "Memorial Day"],
            correct: 1,
            fact: "Independence Day (July 4th) celebrates the adoption of the Declaration of Independence in 1776 with fireworks across the nation."
        }
    ];

    document.getElementById('startQuiz').addEventListener('click', startQuiz);

    function startQuiz() {
        const quizQuestions = document.getElementById('quizQuestions');
        const startBtn = document.getElementById('startQuiz');
        const quizResult = document.getElementById('quizResult');
        
        startBtn.style.display = 'none';
        quizResult.innerHTML = '';
        
        let score = 0;
        let currentQuestion = 0;
        let userAnswers = [];
        
        function showQuestion() {
            if (currentQuestion >= quizData.length) {
                showResults();
                return;
            }
            
            const q = quizData[currentQuestion];
            quizQuestions.innerHTML = `
                <div class="question-container">
                    <h5>Question ${currentQuestion + 1}/${quizData.length}</h5>
                    <p class="fw-semibold">${q.question}</p>
                    <div class="options-container">
                        ${q.options.map((option, index) => `
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="quizAnswer" id="option${currentQuestion}_${index}" value="${index}">
                                <label class="form-check-label" for="option${currentQuestion}_${index}">
                                    ${option}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-custom mt-3" onclick="checkAnswer()">
                        ${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            `;
        }
        
        window.checkAnswer = function() {
            const selected = document.querySelector('input[name="quizAnswer"]:checked');
            if (!selected) {
                alert('Please select an answer!');
                return;
            }
            
            const selectedAnswer = parseInt(selected.value);
            const isCorrect = selectedAnswer === quizData[currentQuestion].correct;
            
            userAnswers.push({
                question: quizData[currentQuestion].question,
                userAnswer: quizData[currentQuestion].options[selectedAnswer],
                correctAnswer: quizData[currentQuestion].options[quizData[currentQuestion].correct],
                isCorrect: isCorrect,
                fact: quizData[currentQuestion].fact
            });
            
            if (isCorrect) {
                score++;
                playSuccessSound();
            } else {
                playErrorSound();
            }
            
            currentQuestion++;
            showQuestion();
        };
        
        function showResults() {
            const percentage = (score / quizData.length) * 100;
            let message, alertClass;
            
            switch(true) {
                case percentage >= 80:
                    message = "🎉 Excellent! You're an American culture expert!";
                    alertClass = "alert-success";
                    break;
                case percentage >= 60:
                    message = "👍 Great job! You know American culture well!";
                    alertClass = "alert-info";
                    break;
                case percentage >= 40:
                    message = "💡 Good effort! Keep learning about American culture!";
                    alertClass = "alert-warning";
                    break;
                default:
                    message = "📚 Keep exploring! American culture has so much to discover!";
                    alertClass = "alert-danger";
            }
            
            quizQuestions.innerHTML = '';
            quizResult.innerHTML = `
                <div class="alert ${alertClass}">
                    <h5>Quiz Complete!</h5>
                    <p>You scored <strong>${score} out of ${quizData.length}</strong> (${percentage}%)</p>
                    <p class="mb-0">${message}</p>
                </div>
                
                <div class="detailed-results mt-4">
                    <h6>Detailed Results:</h6>
                    ${userAnswers.map((answer, index) => `
                        <div class="card mb-2 ${answer.isCorrect ? 'border-success' : 'border-danger'}">
                            <div class="card-body py-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="fw-semibold">Q${index + 1}: ${answer.question}</span>
                                    <span class="badge ${answer.isCorrect ? 'bg-success' : 'bg-danger'}">
                                        ${answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                    </span>
                                </div>
                                ${!answer.isCorrect ? `
                                    <div class="mt-1">
                                        <small class="text-muted">Your answer: ${answer.userAnswer}</small><br>
                                        <small class="text-success">Correct answer: ${answer.correctAnswer}</small>
                                    </div>
                                ` : ''}
                                <div class="mt-1">
                                    <small class="text-info"><i>💡 ${answer.fact}</i></small>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center mt-4">
                    <button class="btn btn-custom me-2" onclick="restartQuiz()">
                        <i class="fas fa-redo me-2"></i>Try Again
                    </button>
                    <button class="btn btn-outline-custom" onclick="shareResults()">
                        <i class="fas fa-share me-2"></i>Share Results
                    </button>
                </div>
            `;
        }
        
        window.restartQuiz = function() {
            startBtn.style.display = 'block';
            quizResult.innerHTML = '';
            score = 0;
            currentQuestion = 0;
            userAnswers = [];
        };
        
        window.shareResults = function() {
            const shareText = `I scored ${score}/${quizData.length} on the American Culture Quiz! How well do you know American culture?`;
            if (navigator.share) {
                navigator.share({
                    title: 'American Culture Quiz Results',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                alert(shareText + '\n\nShare this with your friends!');
            }
        };
        
        showQuestion();
    }
}

function playSuccessSound() {
    playTone(523.25, 0.2, 'sine'); 
}

function playErrorSound() {
    playTone(392.00, 0.3, 'square'); 
}

function playTone(frequency, duration, type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function initRatingStars() {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');
    
    if (!stars.length || !ratingText) return;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            const messages = {
                1: "Thanks for 1 star! We'll work harder to improve! 🌟",
                2: "Thanks for 2 stars! We appreciate your feedback! ⭐⭐", 
                3: "Thanks for 3 stars! We're glad you like it! ⭐⭐⭐",
                4: "Thanks for 4 stars! Great rating! ⭐⭐⭐⭐",
                5: "Thanks for 5 stars! You're amazing! ⭐⭐⭐⭐⭐"
            };
            
            ratingText.textContent = messages[rating] || "Thank you for rating!";
            ratingText.style.fontWeight = 'bold';
            
            playRatingSound();
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.style.color = '#078fffff';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                if (!s.classList.contains('active')) {
                    s.style.color = '';
                }
            });
        });
    });
}

function playRatingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function initFAQAccordion() {
    const accordionHeaders = document.querySelectorAll('.aca-accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherContent = document.getElementById(otherHeader.getAttribute('id').replace('Heading', 'Content'));
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = "0";
                }
            });
            
            this.classList.toggle('active');
            const content = document.getElementById(this.getAttribute('id').replace('Heading', 'Content'));
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
    
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }
}

function initReadMore() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const moreText = this.getAttribute('data-more');
            const lessText = this.getAttribute('data-less');
            
            if (content && moreText && lessText) {
                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                    this.textContent = moreText;
                    content.style.maxHeight = '60px';
                } else {
                    content.classList.add('expanded');
                    this.textContent = lessText;
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
                
                playClickSound();
            }
        });
    });
}

const galleryItems = [
    {
        id: 1,
        title: "Statue of Liberty",
        image: "statue-liberty.jpg",
        description: "Iconic symbol of freedom in New York Harbor",
        category: "landmark",
        year: 1886
    },
    {
        id: 2,
        title: "Grand Canyon",
        image: "grand-canyon.jpg", 
        description: "Natural wonder in Arizona, carved by Colorado River",
        category: "nature",
        year: 0
    },
     {
        id: 4,
        title: "Hollywood Sign",
        image: "Hollywood-sign.jpg",
        description: "Famous landmark in Los Angeles, California",
        category: "entertainment",
        year: 1923
    },
    {
        id: 3,
        title: "White House",
        image: "white-house.jpg",
        description: "Official residence of the US President in Washington D.C.",
        category: "government",
        year: 1800
    },
   
    {
        id: 5,
        title: "Golden Gate Bridge",
        image: "new-york.jpg", 
        description: "Suspension bridge connecting San Francisco to Marin County",
        category: "landmark", 
        year: 1937
    },
    {
        id: 6,
        title: "Mount Rushmore",
        image: "Cuisine Image.webp", 
        description: "National memorial with presidential sculptures in South Dakota",
        category: "landmark",
        year: 1941
    }
];

function initInteractiveGallery() {
    const galleryHTML = `
        <section class="py-5">
            <div class="container">
                <h3 class="aca-section-title fade-in">Interactive American Gallery</h3>
                <div class="text-center mb-4">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-custom active" data-filter="all">All</button>
                        <button type="button" class="btn btn-outline-custom" data-filter="landmark">Landmarks</button>
                        <button type="button" class="btn btn-outline-custom" data-filter="nature">Nature</button>
                        <button type="button" class="btn btn-outline-custom" data-filter="entertainment">Entertainment</button>
                    </div>
                </div>
                <div class="row g-3" id="interactiveGallery"></div>
                <div class="text-center mt-4">
                    <button id="shuffleGallery" class="btn btn-custom">
                        <i class="fas fa-random me-2"></i>Shuffle Gallery
                    </button>
                </div>
            </div>
        </section>
    `;
    
    const carouselSection = document.querySelector('.bg-light');
    if (carouselSection) {
        carouselSection.insertAdjacentHTML('afterend', galleryHTML);
        renderGallery();
        
        document.getElementById('shuffleGallery').addEventListener('click', function() {
            const shuffled = [...galleryItems].sort(() => Math.random() - 0.5);
            renderGallery(shuffled);
            playClickSound();
        });
        
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                document.querySelectorAll('[data-filter]').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                if (filter === 'all') {
                    renderGallery();
                } else {
                    const filtered = galleryItems.filter(item => item.category === filter);
                    renderGallery(filtered);
                }
                
                playClickSound();
            });
        });
    }
}

function renderGallery(items = galleryItems) {
    const galleryContainer = document.getElementById('interactiveGallery');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = items.map(item => `
        <div class="col-lg-4 col-md-6">
            <div class="gallery-item card card-custom fade-in" data-category="${item.category}">
                <img src="${item.image}" class="card-img-top card-img-custom" alt="${item.title}" 
                     onclick="openGalleryModal(${item.id})">
                <div class="card-body card-body-custom">
                    <h5 class="card-title-custom">${item.title}</h5>
                    <p class="card-text-custom">${item.description}</p>
                    <div class="gallery-meta">
                        ${item.year ? `<small class="text-muted"><i class="fas fa-calendar me-1"></i>${item.year}</small>` : ''}
                        <span class="badge bg-primary ms-2">${item.category}</span>
                    </div>
                    <button class="btn btn-outline-custom btn-sm mt-2" onclick="showItemDetails(${item.id})">
                        <i class="fas fa-info-circle me-1"></i>Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.openGalleryModal = function(itemId) {
    const item = galleryItems.find(i => i.id === itemId);
    if (!item) return;
    
    const modalHTML = `
        <div class="modal fade" id="galleryModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${item.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${item.image}" class="img-fluid mb-3" alt="${item.title}">
                        <p>${item.description}</p>
                        ${item.year ? `<p><strong>Year:</strong> ${item.year}</p>` : ''}
                        <p><strong>Category:</strong> ${item.category}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('galleryModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
};

window.showItemDetails = function(itemId) {
    const item = galleryItems.find(i => i.id === itemId);
    if (!item) return;
    
    alert(`📋 ${item.title}\n\n📝 ${item.description}\n\n🏷️ Category: ${item.category}${item.year ? `\n📅 Year: ${item.year}` : ''}`);
};

const culturalFacts = [
    {
        id: 1,
        title: "Thanksgiving Tradition",
        fact: "The first Thanksgiving was celebrated in 1621 by Pilgrims and Native Americans and lasted three days.",
        category: "holidays",
        source: "Historical Records",
        interesting: true
    },
    {
        id: 2, 
        title: "Jazz Origins",
        fact: "Jazz originated in New Orleans in the late 19th century, blending African and European musical traditions.",
        category: "music",
        source: "Music History",
        interesting: true
    },
    {
        id: 3,
        title: "Baseball History",
        fact: "The first official baseball game was played in 1846 in Hoboken, New Jersey.",
        category: "sports", 
        source: "Sports Archives",
        interesting: true
    },
    {
        id: 4,
        title: "Hollywood Golden Age",
        fact: "The Golden Age of Hollywood lasted from the late 1920s to the early 1960s, producing classic films.",
        category: "movies",
        source: "Film History",
        interesting: false
    },
    {
        id: 5,
        title: "Hamburger Popularity",
        fact: "Americans consume approximately 50 billion burgers each year.",
        category: "cuisine",
        source: "Food Statistics",
        interesting: true
    },
    {
        id: 6,
        title: "Fourth of July",
        fact: "The Declaration of Independence was actually signed on July 2, 1776, but adopted on July 4th.",
        category: "holidays",
        source: "Historical Documents", 
        interesting: false
    }
];

function initCulturalFacts() {
    const factsHTML = `
        <section class="py-5 bg-light">
            <div class="container">
                <h3 class="aca-section-title fade-in">American Cultural Facts</h3>
                <div class="row g-4" id="culturalFactsContainer"></div>
                <div class="text-center mt-4">
                    <button id="refreshFacts" class="btn btn-custom">
                        <i class="fas fa-sync-alt me-2"></i>Show New Facts
                    </button>
                </div>
            </div>
        </section>
    `;
    
    const categoriesSection = document.querySelector('.aca-categories');
    if (categoriesSection) {
        categoriesSection.insertAdjacentHTML('afterend', factsHTML);
        renderFacts();
        
        document.getElementById('refreshFacts').addEventListener('click', function() {
            renderFacts();
            playClickSound();
        });
    }
}

let displayedFacts = [];

function getRandomFacts(count = 3) {
    const availableFacts = culturalFacts.filter(fact => !displayedFacts.includes(fact.id));
    
    if (availableFacts.length < count) {
        displayedFacts = [];
        return culturalFacts.slice(0, count);
    }
    
    const shuffled = [...availableFacts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    selected.forEach(fact => displayedFacts.push(fact.id));
    
    return selected;
}

function renderFacts() {
    const container = document.getElementById('culturalFactsContainer');
    if (!container) return;
    
    const facts = getRandomFacts(3);
    
    container.innerHTML = facts.map(fact => `
        <div class="col-md-4">
            <div class="card card-custom h-100 fade-in">
                <div class="card-body card-body-custom">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-primary">${fact.category}</span>
                        ${fact.interesting ? '<span class="badge bg-warning">⭐ Interesting</span>' : ''}
                    </div>
                    <h5 class="card-title-custom">${fact.title}</h5>
                    <p class="card-text-custom">${fact.fact}</p>
                    <small class="text-muted">Source: ${fact.source}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function initTimeBasedGreeting() {
    function getGreeting() {
        const hour = new Date().getHours();
        let greeting, emoji;
        
        switch(true) {
            case hour >= 5 && hour < 12:
                greeting = "Good Morning!";
                emoji = "☀️";
                break;
            case hour >= 12 && hour < 17:
                greeting = "Good Afternoon!";
                emoji = "😊";
                break;
            case hour >= 17 && hour < 21:
                greeting = "Good Evening!";
                emoji = "🌆";
                break;
            default:
                greeting = "Good Night!";
                emoji = "🌙";
        }
        
        return { greeting, emoji };
    }
    
    function updateGreeting() {
        const greetingElement = document.getElementById('timeGreeting');
        if (!greetingElement) return;
        
        const { greeting, emoji } = getGreeting();
        greetingElement.innerHTML = `${emoji} <strong>${greeting}</strong> Welcome to American Cultural Association!`;
    }
    
    const heroContent = document.querySelector('.aca-hero-content');
    if (heroContent) {
        const greetingHTML = `<div id="timeGreeting" class="aca-greeting fade-in" style="font-size: 1.4rem; margin: 10px 0;"></div>`;
        heroContent.querySelector('p').insertAdjacentHTML('afterend', greetingHTML);
        
        updateGreeting();
        setInterval(updateGreeting, 60000);
    }
}

function initKeyboardNavigation() {
    const menuItems = document.querySelectorAll('.navbar-nav .nav-item');
    let focusedIndex = 0;

    if (menuItems.length > 0) {
        menuItems[focusedIndex].focus();

        document.addEventListener('keydown', function (e) {
            if (e.target.closest('.navbar-nav')) {
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        focusedIndex = (focusedIndex + 1) % menuItems.length;
                        menuItems[focusedIndex].focus();
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        focusedIndex = (focusedIndex - 1 + menuItems.length) % menuItems.length;
                        menuItems[focusedIndex].focus();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                const popupForm = document.getElementById('popupForm');
                if (popupForm && popupForm.style.display === 'flex') {
                    popupForm.style.display = 'none';
                }
            }
        });
    }
}

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const dateTimeElement = document.getElementById('date-time-block');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initPopup();
    initThemeToggle();
    initScrollAnimations();
    initSoundEffects();
    initInteractiveFAQ();
    initRatingStars();
    initKeyboardNavigation();
    initFAQAccordion();
    initReadMore();
    initInteractiveGallery();
    initCulturalFacts();
    initTimeBasedGreeting();
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
