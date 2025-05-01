/**
 * Основной JavaScript файл для сайта медицинского туризма в Узбекистане
 * MediTour - Узбекистан
 */

// Дождемся полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initScrollAnimation();
    initSmoothScroll();
    initCounterAnimation();
    initModalWindows();
    initGallery();
    setActiveNavLink();
  });
  
  /**
   * Инициализация мобильного меню
   */
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        // Изменяем иконку меню
        const iconElement = mobileMenuToggle.querySelector('i');
        if (iconElement) {
          if (mobileMenu.classList.contains('open')) {
            iconElement.classList.remove('fa-bars');
            iconElement.classList.add('fa-times');
          } else {
            iconElement.classList.remove('fa-times');
            iconElement.classList.add('fa-bars');
          }
        }
      });
      
      // Закрытие мобильного меню при клике на ссылку
      const mobileMenuLinks = mobileMenu.querySelectorAll('a');
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('open');
          // Возвращаем иконку в исходное состояние
          const iconElement = mobileMenuToggle.querySelector('i');
          if (iconElement) {
            iconElement.classList.remove('fa-times');
            iconElement.classList.add('fa-bars');
          }
        });
      });
      
      // Закрытие мобильного меню при клике вне его
      document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
          mobileMenu.classList.remove('open');
          // Возвращаем иконку в исходное состояние
          const iconElement = mobileMenuToggle.querySelector('i');
          if (iconElement) {
            iconElement.classList.remove('fa-times');
            iconElement.classList.add('fa-bars');
          }
        }
      });
    }
  }
  
  /**
   * Инициализация анимации при скролле
   */
  function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .slide-in-top, .slide-in-bottom, .staggered-item');
    
    if (animatedElements.length) {
      // Функция проверки видимости элемента в области видимости
      function checkIfInView() {
        animatedElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect();
          // Если элемент видим
          if (elementPosition.top < window.innerHeight - 50 && elementPosition.bottom > 0) {
            element.classList.add('appear');
          }
        });
      }
      
      // Вызываем функцию при загрузке страницы для элементов, видимых сразу
      checkIfInView();
      
      // Вызываем функцию при скролле
      window.addEventListener('scroll', checkIfInView);
    }
  }
  
  /**
   * Плавная прокрутка до якорей
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Получаем позицию элемента
          const elementPosition = targetElement.getBoundingClientRect().top;
          // Текущая позиция скролла
          const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px отступ сверху
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  /**
   * Инициализация анимации счетчиков
   */
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length) {
      counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'));
        
        if (!isNaN(targetValue)) {
          const duration = 2000; // Длительность анимации в миллисекундах
          const startTime = Date.now();
          const startValue = 0;
          
          function updateCounter() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Функция плавности (easing)
            const easingProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easingProgress);
            counter.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = targetValue.toLocaleString();
            }
          }
          
          // Запустить анимацию только когда элемент в поле зрения
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });
          
          observer.observe(counter);
        }
      });
    }
  }
  
  /**
   * Инициализация модальных окон
   */
  function initModalWindows() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
          // Открываем модальное окно
          modal.classList.add('active');
          
          // Блокируем прокрутку на body
          document.body.style.overflow = 'hidden';
          
          // Закрытие модального окна
          const closeButtons = modal.querySelectorAll('.modal-close');
          closeButtons.forEach(button => {
            button.addEventListener('click', function() {
              modal.classList.remove('active');
              document.body.style.overflow = '';
            });
          });
          
          // Закрытие при клике на затемненную область
          modal.addEventListener('click', function(event) {
            if (event.target === modal) {
              modal.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
          
          // Закрытие при нажатии Escape
          document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
              modal.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
        }
      });
    });
  }
  
  /**
   * Инициализация галереи изображений (лайтбокс)
   */
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length) {
      galleryItems.forEach(item => {
        item.addEventListener('click', function() {
          const imageUrl = this.querySelector('img').src;
          const title = this.querySelector('img').alt || '';
          
          // Создаем модальное окно для изображения
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          lightbox.innerHTML = `
            <div class="lightbox-content">
              <button class="lightbox-close">&times;</button>
              <img src="${imageUrl}" alt="${title}">
              <div class="lightbox-caption">${title}</div>
            </div>
          `;
          
          // Добавляем в body
          document.body.appendChild(lightbox);
          
          // Блокируем прокрутку
          document.body.style.overflow = 'hidden';
          
          // Анимация появления
          setTimeout(() => {
            lightbox.classList.add('active');
          }, 10);
          
          // Закрытие лайтбокса при клике на крестик
          const closeButton = lightbox.querySelector('.lightbox-close');
          closeButton.addEventListener('click', function() {
            lightbox.classList.remove('active');
            
            // Удаляем элемент после завершения анимации
            setTimeout(() => {
              document.body.removeChild(lightbox);
              document.body.style.overflow = '';
            }, 300);
          });
          
          // Закрытие при клике на затемненную область
          lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
              lightbox.classList.remove('active');
              
              // Удаляем элемент после завершения анимации
              setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
              }, 300);
            }
          });
        });
      });
    }
  }
  
  /**
   * Установка активной ссылки в навигации в зависимости от текущей страницы
   */
  function setActiveNavLink() {
    // Получаем текущий URL без домена
    const currentLocation = window.location.pathname;
    
    // Находим все ссылки в навигации
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      // Проверяем, совпадает ли путь ссылки с текущим URL
      if (currentLocation === linkPath || 
          (currentLocation === '/' && linkPath === 'index.html') ||
          (currentLocation.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  /**
   * Функция для отображения уведомлений
   * @param {string} message - Текст уведомления
   * @param {string} type - Тип уведомления ('success', 'error', 'warning', 'info')
   */
  function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="notification-icon fas ${getIconByType(type)}"></i>
        <p>${message}</p>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    // Добавляем в контейнер уведомлений или создаем его
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      document.body.appendChild(notificationContainer);
    }
    
    notificationContainer.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
      notification.classList.add('active');
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    const timerId = setTimeout(() => {
      removeNotification(notification);
    }, 5000);
    
    // Закрытие по клику на крестик
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      clearTimeout(timerId);
      removeNotification(notification);
    });
    
    // Функция для получения иконки в зависимости от типа уведомления
    function getIconByType(type) {
      switch (type) {
        case 'success':
          return 'fa-check-circle';
        case 'error':
          return 'fa-times-circle';
        case 'warning':
          return 'fa-exclamation-triangle';
        default:
          return 'fa-info-circle';
      }
    }
    
    // Функция для удаления уведомления с анимацией
    function removeNotification(notificationElement) {
      notificationElement.classList.remove('active');
      
      // Удаляем элемент после завершения анимации
      setTimeout(() => {
        if (notificationElement.parentNode) {
          notificationElement.parentNode.removeChild(notificationElement);
          
          // Если уведомлений больше нет, удаляем контейнер
          if (notificationContainer.children.length === 0) {
            document.body.removeChild(notificationContainer);
          }
        }
      }, 300);
    }
  }
  
  /**
   * Функция для валидации формы
   * @param {HTMLFormElement} form - Элемент формы
   * @returns {boolean} - Результат валидации
   */
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Очищаем предыдущие ошибки
      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
      input.classList.remove('error');
      
      // Валидация обязательных полей
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        showInputError(input, 'Это поле обязательно для заполнения');
      }
      
      // Валидация email
      if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          isValid = false;
          showInputError(input, 'Пожалуйста, введите корректный email');
        }
      }
      
      // Валидация телефона
      if (input.type === 'tel' && input.value.trim()) {
        const phonePattern = /^\+?[\d\s\-()]{10,}$/;
        if (!phonePattern.test(input.value.trim())) {
          isValid = false;
          showInputError(input, 'Пожалуйста, введите корректный номер телефона');
        }
      }
    });
    
    return isValid;
    
    // Функция для отображения ошибки под полем ввода
    function showInputError(input, message) {
      input.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      input.parentElement.appendChild(errorElement);
    }
  }
  
  /**
   * Отправка данных формы через AJAX
   * @param {HTMLFormElement} form - Элемент формы
   * @param {Function} successCallback - Callback функция при успешной отправке
   * @param {Function} errorCallback - Callback функция при ошибке
   */
  function submitForm(form, successCallback, errorCallback) {
    // Валидация формы перед отправкой
    if (!validateForm(form)) {
      return;
    }
    
    // Добавляем индикатор загрузки
    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Отправка...';
    
    // Собираем данные формы
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // В реальном проекте здесь был бы fetch запрос к API
    // Для демонстрации используем setTimeout для имитации запроса
    setTimeout(() => {
      // Имитация успешного ответа
      const success = Math.random() > 0.2; // 80% вероятность успеха для демонстрации
      
      if (success) {
        // Очищаем форму
        form.reset();
        
        // Вызываем callback при успехе
        if (typeof successCallback === 'function') {
          successCallback();
        }
      } else {
        // Вызываем callback при ошибке
        if (typeof errorCallback === 'function') {
          errorCallback();
        }
      }
      
      // Восстанавливаем кнопку
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }, 1500);
  }
  
  /**
   * Переключение языка сайта
   * @param {string} lang - Код языка (ru, en, uz)
   */
  function switchLanguage(lang) {
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // В реальном проекте здесь был бы код для переключения языка
    // Для демонстрации показываем уведомление и обновляем страницу
    showNotification(`Язык изменен на ${getLangName(lang)}`, 'success');
    
    // Перезагружаем страницу через 1 секунду
    setTimeout(() => {
      location.reload();
    }, 1000);
    
    // Функция для получения названия языка по коду
    function getLangName(code) {
      switch (code) {
        case 'ru':
          return "Русский";
        case 'en':
          return "English";
        case 'uz':
          return "O'zbek";
        default:
          return code;
      }
    }
  }
  
  // Экспортируем функции, которые могут использоваться в других js файлах
  export {
    showNotification,
    validateForm,
    submitForm,
    switchLanguage
  };