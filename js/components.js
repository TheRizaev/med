/**
 * Common components for MediTour website
 */

/**
 * Renders the site header with navigation
 * @param {string} currentPage - The current active page
 * @param {object} translations - Translations object for the current language
 * @returns {string} HTML for the header
 */
function renderHeader(currentPage, translations) {
    const t = translations || {};
    
    // Navigation items structure
    const navItems = [
        { id: 'index', href: 'index.html', label: t.nav_home || 'Главная' },
        { id: 'services', href: 'services.html', label: t.nav_services || 'Услуги' },
        { id: 'partners', href: 'partners.html', label: t.nav_partners || 'Партнеры' },
        { id: 'news', href: 'news.html', label: t.nav_news || 'Новости' }
    ];
    
    // Generate navigation HTML
    const navHTML = navItems.map(item => {
        const isActive = currentPage === item.id ? 'active' : '';
        return `<li class="nav-item"><a href="${item.href}" class="nav-link ${isActive}">${item.label}</a></li>`;
    }).join('');
    
    // Generate mobile navigation HTML
    const mobileNavHTML = navItems.map(item => {
        const isActive = currentPage === item.id ? 'active' : '';
        return `<li class="mobile-menu-item"><a href="${item.href}" class="mobile-menu-link ${isActive}">${item.label}</a></li>`;
    }).join('');
    
    // Create the language selector dropdown
    const langSelectorHTML = `
        <div class="lang-dropdown">
            <button class="lang-dropdown-btn">
                <span class="current-lang">${getCurrentLanguage().toUpperCase()}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="lang-dropdown-content">
                <a href="#" data-lang="ru" class="lang-option ${getCurrentLanguage() === 'ru' ? 'active' : ''}">Русский</a>
                <a href="#" data-lang="en" class="lang-option ${getCurrentLanguage() === 'en' ? 'active' : ''}">English</a>
                <a href="#" data-lang="uz" class="lang-option ${getCurrentLanguage() === 'uz' ? 'active' : ''}">O'zbek</a>
            </div>
        </div>
    `;
    
    // Construct the full header HTML
    return `
        <!-- Шапка сайта -->
        <header class="header">
            <div class="container header-container">
                <div class="logo">
                    <a href="index.html" class="logo-text"><span class="primary">Medi</span><span class="secondary">Tour</span></a>
                </div>
                
                <nav class="nav">
                    <ul class="nav-list">
                        ${navHTML}
                    </ul>
                </nav>
                
                ${langSelectorHTML}
                
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            <!-- Мобильное меню -->
            <div class="mobile-menu">
                <ul class="mobile-menu-list">
                    ${mobileNavHTML}
                </ul>
                <div class="mobile-lang-selector">
                    ${langSelectorHTML}
                </div>
            </div>
        </header>
    `;
}

/**
 * Renders the site footer
 * @param {object} translations - Translations object for the current language
 * @returns {string} HTML for the footer
 */
function renderFooter(translations) {
    const t = translations || {};
    
    return `
        <!-- Подвал сайта -->
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <div class="footer-logo">
                            <a href="index.html" class="logo-text"><span class="primary">Medi</span><span class="secondary">Tour</span></a>
                        </div>
                        <p class="footer-text">${t.footer_about || 'Мы специализируемся на организации медицинского туризма в Узбекистане, предлагая качественное лечение в лучших клиниках страны по доступным ценам.'}</p>
                        <div class="footer-social">
                            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-telegram-plane"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h3>${t.footer_services || 'Услуги'}</h3>
                        <ul class="footer-links">
                            <li><a href="services.html#dental">${t.service_dental || 'Стоматология'}</a></li>
                            <li><a href="services.html#plastic">${t.service_plastic || 'Пластическая хирургия'}</a></li>
                            <li><a href="services.html#orthopedics">${t.service_orthopedics || 'Ортопедия'}</a></li>
                            <li><a href="services.html#checkup">${t.service_checkup || 'Диагностика'}</a></li>
                            <li><a href="services.html#cardiology">${t.service_cardiology || 'Кардиология'}</a></li>
                            <li><a href="services.html#spa">${t.service_spa || 'Санаторно-курортное лечение'}</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h3>${t.footer_links || 'Полезные ссылки'}</h3>
                        <ul class="footer-links">
                            <li><a href="index.html">${t.nav_home || 'Главная'}</a></li>
                            <li><a href="services.html">${t.nav_services || 'Услуги'}</a></li>
                            <li><a href="locations.html">${t.nav_clinics || 'Клиники'}</a></li>
                            <li><a href="news.html">${t.nav_news || 'Новости'}</a></li>
                            <li><a href="#about">${t.nav_about || 'О нас'}</a></li>
                            <li><a href="#contact">${t.nav_contacts || 'Контакты'}</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-col">
                        <h3>${t.footer_contacts || 'Контакты'}</h3>
                        <ul class="footer-info">
                            <li><i class="fas fa-map-marker-alt"></i> ${t.contact_address || 'г. Ташкент, ул. Амира Темура, 107Б'}</li>
                            <li><i class="fas fa-phone-alt"></i> +998 71 123-45-67</li>
                            <li><i class="fas fa-envelope"></i> info@meditour.uz</li>
                            <li><i class="fas fa-clock"></i> ${t.contact_hours || 'Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00'}</li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2025 MediTour. ${t.footer_rights || 'Все права защищены.'}</p>
                </div>
            </div>
        </footer>
    `;
}

/**
 * Renders the contact form section
 * @param {object} translations - Translations object for the current language
 * @returns {string} HTML for the contact section
 */
function renderContactSection(translations) {
    const t = translations || {};
    
    return `
        <!-- Контактная форма -->
        <section id="contact" class="section contact">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title fade-in">${t.contact_title || 'Связаться с нами'}</h2>
                    <div class="section-divider"></div>
                    <p class="section-subtitle fade-in">${t.contact_subtitle || 'Заполните форму ниже, чтобы получить бесплатную консультацию или задать вопрос.'}</p>
                </div>
                
                <div class="contact-form-container">
                    <div class="contact-info slide-in-left">
                        <h3>${t.contact_info_title || 'Контактная информация'}</h3>
                        <p>${t.contact_info_text || 'Мы всегда рады помочь вам и ответить на все ваши вопросы о медицинском туризме в Узбекистане.'}</p>
                        
                        <ul class="contact-info-list">
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>${t.contact_address_label || 'Адрес'}</h4>
                                    <p>${t.contact_address || 'г. Ташкент, ул. Амира Темура, 107Б'}</p>
                                </div>
                            </li>
                            <li>
                                <i class="fas fa-phone-alt"></i>
                                <div>
                                    <h4>${t.contact_phone_label || 'Телефон'}</h4>
                                    <p>+998 71 123-45-67</p>
                                    <p>+998 90 123-45-67</p>
                                </div>
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <h4>Email</h4>
                                    <p>info@meditour.uz</p>
                                </div>
                            </li>
                            <li>
                                <i class="fas fa-clock"></i>
                                <div>
                                    <h4>${t.contact_hours_label || 'Часы работы'}</h4>
                                    <p>${t.contact_hours || 'Пн-Пт: 9:00 - 18:00'}</p>
                                    <p>${t.contact_hours_weekend || 'Сб: 10:00 - 15:00'}</p>
                                </div>
                            </li>
                        </ul>
                        
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-telegram-plane"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-whatsapp"></i></a>
                        </div>
                    </div>
                    
                    <div class="contact-form slide-in-right">
                        <form id="contact-form">
                            <div class="form-group">
                                <label for="name" class="form-label">${t.contact_name || 'Ваше имя'} *</label>
                                <input type="text" id="name" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="email" class="form-label">Email *</label>
                                <input type="email" id="email" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone" class="form-label">${t.contact_phone || 'Телефон'} *</label>
                                <input type="tel" id="phone" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="service" class="form-label">${t.contact_service || 'Интересующая услуга'}</label>
                                <select id="service" class="form-control">
                                    <option value="">${t.contact_select_service || 'Выберите услугу'}</option>
                                    <option value="dental">${t.service_dental || 'Стоматология'}</option>
                                    <option value="plastic">${t.service_plastic || 'Пластическая хирургия'}</option>
                                    <option value="orthopedics">${t.service_orthopedics || 'Ортопедия'}</option>
                                    <option value="checkup">${t.service_checkup || 'Диагностика (Check-Up)'}</option>
                                    <option value="cardiology">${t.service_cardiology || 'Кардиология'}</option>
                                    <option value="spa">${t.service_spa || 'Санаторно-курортное лечение'}</option>
                                    <option value="other">${t.option_other || 'Другое'}</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="message" class="form-label">${t.contact_message || 'Сообщение'} *</label>
                                <textarea id="message" class="form-control" rows="5" required></textarea>
                            </div>
                            
                            <div class="form-group form-checkbox">
                                <input type="checkbox" id="consent" required>
                                <label for="consent">${t.contact_consent || 'Я согласен на обработку персональных данных'}</label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-ripple">${t.contact_submit || 'Отправить сообщение'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Get current language from localStorage or default to 'ru'
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'ru';
}

// Export the components
window.siteComponents = {
    renderHeader,
    renderFooter,
    renderContactSection,
    getCurrentLanguage
};