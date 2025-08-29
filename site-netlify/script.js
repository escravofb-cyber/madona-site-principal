// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Content Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Load content based on tab
            if (tabName === 'blogs') {
                loadBlogs();
            } else if (tabName === 'videos') {
                loadVideos();
            }
        });
    });
    
    // Load blogs by default
    loadBlogs();
});

// API Configuration
const API_BASE_URL = 'https://mzhyi8cdg93m.manus.space';

// Load Blogs from API
async function loadBlogs() {
    const container = document.getElementById('blogs-container');
    const loading = document.getElementById('blogs-loading');
    
    try {
        loading.style.display = 'block';
        container.innerHTML = '';
        
        const response = await fetch(`${API_BASE_URL}/api/blogs`);
        const blogs = await response.json();
        
        loading.style.display = 'none';
        
        if (blogs.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhum blog encontrado.</p>';
            return;
        }
        
        blogs.forEach(blog => {
            const blogElement = createBlogElement(blog);
            container.appendChild(blogElement);
        });
        
    } catch (error) {
        console.error('Erro ao carregar blogs:', error);
        loading.style.display = 'none';
        container.innerHTML = '<p style="text-align: center; color: #dc3545; padding: 2rem;">Erro ao carregar blogs. Tente novamente mais tarde.</p>';
    }
}

// Load Videos from API
async function loadVideos() {
    const container = document.getElementById('videos-container');
    const loading = document.getElementById('videos-loading');
    
    try {
        loading.style.display = 'block';
        container.innerHTML = '';
        
        const response = await fetch(`${API_BASE_URL}/api/videos`);
        const videos = await response.json();
        
        loading.style.display = 'none';
        
        if (videos.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhum vídeo encontrado.</p>';
            return;
        }
        
        videos.forEach(video => {
            const videoElement = createVideoElement(video);
            container.appendChild(videoElement);
        });
        
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        loading.style.display = 'none';
        container.innerHTML = '<p style="text-align: center; color: #dc3545; padding: 2rem;">Erro ao carregar vídeos. Tente novamente mais tarde.</p>';
    }
}

// Create Blog Element
function createBlogElement(blog) {
    const blogDiv = document.createElement('div');
    blogDiv.className = 'blog-item';
    
    const date = new Date(blog.created_at).toLocaleDateString('pt-BR');
    
    blogDiv.innerHTML = `
        <div class="blog-image">
            <i class="fas fa-blog"></i>
        </div>
        <div class="blog-content">
            <div class="blog-title">${blog.title}</div>
            <div class="blog-excerpt">${blog.content.substring(0, 150)}...</div>
            <div class="blog-date">${date}</div>
        </div>
    `;
    
    return blogDiv;
}

// Create Video Element
function createVideoElement(video) {
    const videoDiv = document.createElement('div');
    videoDiv.className = 'video-item';
    
    videoDiv.innerHTML = `
        <div class="video-thumbnail" onclick="openVideo('${video.url}')">
            <i class="fas fa-video"></i>
        </div>
        <div class="video-content">
            <div class="video-title">${video.title}</div>
            <div class="video-description">${video.description}</div>
            <div class="video-duration">${video.duration || 'Duração não informada'}</div>
        </div>
    `;
    
    return videoDiv;
}

// Open Video
function openVideo(url) {
    if (url) {
        window.open(url, '_blank');
    }
}

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simulate form submission
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    alert('Obrigado por se inscrever! Você receberá nosso boletim informativo em breve.');
    this.reset();
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.about-item, .solution-item, .service-item, .testimonial-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Floating buttons hover effects
document.querySelectorAll('.floating-buttons a').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial body opacity for loading animation
    document.body.style.opacity = '0';
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const highlightNavigation = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once on load
});

