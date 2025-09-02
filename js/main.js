// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializePortfolioFilter();
    initializeScrollEffects();
    initializeFormValidation();
});

// تهيئة الرسوم المتحركة
function initializeAnimations() {
    // تأثير الكتابة المتحركة
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        animateText(heroTitle);
    }

    // تأثير العد التصاعدي للإحصائيات
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
}

// تأثير الكتابة المتحركة
function animateText(element) {
    const text = element.innerHTML;
    element.innerHTML = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// تأثير العد التصاعدي
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
}

// تهيئة شريط التنقل
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تأثير الشفافية عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        }
    });

    // التنقل السلس
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // تحديث الرابط النشط
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// تهيئة فلتر المعرض
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // تحديث الأزرار النشطة
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // فلترة العناصر
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// تأثيرات التمرير
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // مراقبة العناصر للرسوم المتحركة
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// تحقق من صحة النموذج
function initializeFormValidation() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            showSuccessMessage();
            form.reset();
        }
    });
    
    // التحقق المباشر أثناء الكتابة
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => clearError(input));
    });
}

// التحقق من صحة الإدخال
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    clearError(input);
    
    if (!value) {
        showError(input, 'هذا الحقل مطلوب');
        return false;
    }
    
    if (type === 'email' && !isValidEmail(value)) {
        showError(input, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if (type === 'tel' && !isValidPhone(value)) {
        showError(input, 'يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// عرض رسالة خطأ
function showError(input, message) {
    input.classList.add('is-invalid');
    
    let errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        input.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

// إزالة رسالة الخطأ
function clearError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// عرض رسالة النجاح
function showSuccessMessage() {
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    successAlert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    successAlert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(successAlert);
    
    // إزالة الرسالة تلقائياً بعد 5 ثوان
    setTimeout(() => {
        if (successAlert.parentNode) {
            successAlert.remove();
        }
    }, 5000);
}

// تأثيرات إضافية للتفاعل
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// تأثير الجسيمات في الخلفية (اختياري)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// تهيئة الجسيمات (اختياري - يمكن تفعيله حسب الحاجة)
// createParticles();

// تحسين الأداء - تأخير تحميل الصور
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// تهيئة تحميل الصور المؤجل
lazyLoadImages();

// تأثير النقر على الأزرار
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// إضافة تأثير الريبل
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// تحسين تجربة المستخدم - إضافة مؤشرات التحميل
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
}

// تأثير التمرير السلس للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تحسين الأداء - تقليل استخدام الذاكرة
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// تطبيق التحسين على أحداث التمرير
const optimizedScrollHandler = debounce(() => {
    // معالجة أحداث التمرير المحسنة
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// إضافة تأثيرات صوتية (اختياري)
function playClickSound() {
    // يمكن إضافة أصوات تفاعلية هنا
    // const audio = new Audio('path/to/click-sound.mp3');
    // audio.play();
}

// تحسين إمكانية الوصول
function improveAccessibility() {
    // إضافة دعم لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

improveAccessibility();

// تحسين الأداء - تحميل مؤجل للمحتوى
function lazyLoadContent() {
    const lazyElements = document.querySelectorAll('.lazy-load');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

lazyLoadContent();

// إضافة تأثيرات متقدمة للماوس
document.addEventListener('mousemove', (e) => {
    const interactiveElements = document.querySelectorAll('.interactive-hover');
    
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', x + 'px');
        element.style.setProperty('--mouse-y', y + 'px');
    });
});

// تحسين تجربة الجوال
function optimizeMobileExperience() {
    // منع التكبير المزدوج على iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // تحسين التمرير على الجوال
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

optimizeMobileExperience();

// إضافة مؤثرات بصرية متقدمة
function addAdvancedEffects() {
    // تأثير الضوء المتحرك
    const glowElements = document.querySelectorAll('.glow-effect');
    glowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.background = '';
        });
    });
}

addAdvancedEffects();

// تحسين الأداء العام
function optimizePerformance() {
    // تحسين الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
    
    // تحسين الخطوط
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
}

optimizePerformance();

console.log('🚀 إبداع ديجيتال - تم تحميل الموقع بنجاح!');