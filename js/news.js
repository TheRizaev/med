/**
 * JavaScript файл для работы с новостями сайта медицинского туризма в Узбекистане
 * MediTour - Узбекистан
 */

// Импортируем необходимые функции из основного файла
import { showNotification, validateForm } from './main.js';

// Дождемся полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  // Подключаем обработчики событий для новостей
  initNewsLoad();
  initNewsFilter();
  initNewsSearch();
});

/**
 * Загрузка новостей
 */
function initNewsLoad() {
  const newsContainer = document.getElementById('news-container');
  
  if (newsContainer) {
    loadNews()
      .then(news => {
        renderNews(news, newsContainer);
      })
      .catch(error => {
        console.error('Ошибка загрузки новостей:', error);
        newsContainer.innerHTML = `
          <div class="alert alert-danger">
            <p>Произошла ошибка при загрузке новостей. Пожалуйста, попробуйте позже.</p>
          </div>
        `;
      });
  }
}

/**
 * Получение данных новостей
 * @returns {Promise<Array>} Массив новостей
 */
function loadNews() {
  return new Promise((resolve, reject) => {
    // В реальном проекте здесь был бы fetch запрос к API
    // Для демонстрации используем localStorage или включенные данные
    
    // Сначала пробуем получить новости из localStorage (если они были добавлены через админку)
    const storedNews = localStorage.getItem('news');
    
    if (storedNews) {
      try {
        const newsData = JSON.parse(storedNews);
        resolve(newsData);
      } catch (error) {
        reject(error);
      }
    } else {
      // Если в localStorage ничего нет, используем демонстрационные данные
      const demoNews = [
        {
          id: 1,
          title: 'Узбекистан открывает новый медицинский центр для иностранных пациентов',
          content: 'В Ташкенте открылся современный медицинский центр, специализирующийся на обслуживании иностранных пациентов. Центр оснащен новейшим оборудованием и предлагает широкий спектр медицинских услуг.',
          category: 'Инфраструктура',
          image: 'img/news/news-1.jpg',
          date: '2025-04-15',
          author: 'Администратор'
        },
        {
          id: 2,
          title: 'Международная конференция по медицинскому туризму пройдет в Самарканде',
          content: 'В сентябре 2025 года в историческом городе Самарканд состоится международная конференция по медицинскому туризму. Эксперты из разных стран обсудят перспективы развития этой отрасли в Узбекистане.',
          category: 'События',
          image: 'img/news/news-2.jpg',
          date: '2025-04-10',
          author: 'Администратор'
        },
        {
          id: 3,
          title: 'Новый санаторий в Чарваке: лечение и отдых на берегу водохранилища',
          content: 'В живописном районе Чарвакского водохранилища открылся новый санаторий, предлагающий комплексное лечение и реабилитацию пациентов в сочетании с отдыхом на природе.',
          category: 'Курорты',
          image: 'img/news/news-3.jpg',
          date: '2025-04-05',
          author: 'Администратор'
        },
        {
          id: 4,
          title: 'Узбекистан упрощает визовый режим для медицинских туристов',
          content: 'Правительство Узбекистана приняло решение об упрощении процедуры получения виз для иностранцев, приезжающих в страну с целью лечения. Теперь получить визу можно будет в течение 3 дней по электронной системе.',
          category: 'Законодательство',
          image: 'img/news/news-4.jpg',
          date: '2025-03-28',
          author: 'Администратор'
        },
        {
          id: 5,
          title: 'Стоматологический туризм в Узбекистане: качество по доступным ценам',
          content: 'Узбекистан становится популярным направлением для стоматологического туризма. Современные клиники, квалифицированные врачи и доступные цены привлекают пациентов из соседних стран и Европы.',
          category: 'Услуги',
          image: 'img/news/news-5.jpg',
          date: '2025-03-20',
          author: 'Администратор'
        },
        {
          id: 6,
          title: 'Традиционная медицина Узбекистана: от древних знаний к современным методикам',
          content: 'Новый центр традиционной медицины в Бухаре предлагает лечение по старинным рецептам в сочетании с современными подходами. Центр уже привлек внимание иностранных пациентов, интересующихся альтернативной медициной.',
          category: 'Традиции',
          image: 'img/news/news-6.jpg',
          date: '2025-03-15',
          author: 'Администратор'
        }
      ];
      
      // Сохраняем демо-новости в localStorage для дальнейшего использования
      localStorage.setItem('news', JSON.stringify(demoNews));
      
      resolve(demoNews);
    }
  });
}

/**
 * Отрисовка новостей на странице
 * @param {Array} news - Массив новостей для отображения
 * @param {HTMLElement} container - Контейнер для вставки новостей
 */
function renderNews(news, container) {
  if (!news || news.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info">
        <p>Новости не найдены.</p>
      </div>
    `;
    return;
  }
  
  // Очищаем контейнер
  container.innerHTML = '';
  
  // Сортируем новости по дате (самые новые в начале)
  news.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Создаем HTML для каждой новости
  news.forEach(item => {
    // Форматируем дату
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Создаем элемент новости
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <div class="news-image-container">
        <img src="${item.image || 'img/news/placeholder.jpg'}" alt="${item.title}" class="news-image">
        <div class="news-category">${item.category}</div>
      </div>
      <div class="news-content">
        <div class="news-date">${formattedDate}</div>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-text">${truncateText(item.content, 150)}</p>
        <a href="news-detail.html?id=${item.id}" class="news-link">Читать далее <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    
    container.appendChild(newsItem);
  });
}

/**
 * Обрезка текста до указанной длины
 * @param {string} text - Исходный текст
 * @param {number} maxLength - Максимальная длина
 * @returns {string} Обрезанный текст
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Инициализация фильтра новостей по категориям
 */
function initNewsFilter() {
  const filterButtons = document.querySelectorAll('.news-filter-btn');
  const newsContainer = document.getElementById('news-container');
  
  if (filterButtons.length && newsContainer) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Загружаем новости
        loadNews()
          .then(news => {
            // Фильтруем новости по категории
            let filteredNews = news;
            if (category && category !== 'all') {
              filteredNews = news.filter(item => item.category === category);
            }
            
            // Отображаем отфильтрованные новости
            renderNews(filteredNews, newsContainer);
          })
          .catch(error => {
            console.error('Ошибка загрузки новостей для фильтрации:', error);
          });
      });
    });
  }
}

/**
 * Инициализация поиска по новостям
 */
function initNewsSearch() {
  const searchForm = document.getElementById('news-search-form');
  const newsContainer = document.getElementById('news-container');
  
  if (searchForm && newsContainer) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const searchInput = this.querySelector('input[type="search"]');
      if (!searchInput) return;
      
      const searchQuery = searchInput.value.trim().toLowerCase();
      
      // Если запрос пустой, показываем все новости
      if (!searchQuery) {
        initNewsLoad();
        return;
      }
      
      // Загружаем новости и фильтруем по запросу
      loadNews()
        .then(news => {
          // Фильтруем новости по запросу
          const filteredNews = news.filter(item => {
            return item.title.toLowerCase().includes(searchQuery) || 
                  item.content.toLowerCase().includes(searchQuery) ||
                  item.category.toLowerCase().includes(searchQuery);
          });
          
          // Отображаем результаты поиска
          renderNews(filteredNews, newsContainer);
          
          // Сбрасываем активные фильтры
          const filterButtons = document.querySelectorAll('.news-filter-btn');
          filterButtons.forEach(btn => btn.classList.remove('active'));
          document.querySelector('.news-filter-btn[data-category="all"]')?.classList.add('active');
        })
        .catch(error => {
          console.error('Ошибка загрузки новостей для поиска:', error);
        });
    });
  }
}

/**
 * Инициализация страницы деталей новости
 */
function initNewsDetail() {
  const newsDetailContainer = document.getElementById('news-detail-container');
  
  if (newsDetailContainer) {
    // Получаем ID новости из URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'));
    
    if (!newsId) {
      newsDetailContainer.innerHTML = `
        <div class="alert alert-danger">
          <p>Новость не найдена.</p>
          <a href="news.html" class="btn btn-primary mt-3">Вернуться к списку новостей</a>
        </div>
      `;
      return;
    }
    
    // Загружаем новости
    loadNews()
      .then(news => {
        // Находим нужную новость по ID
        const newsItem = news.find(item => item.id === newsId);
        
        if (!newsItem) {
          newsDetailContainer.innerHTML = `
            <div class="alert alert-danger">
              <p>Новость не найдена.</p>
              <a href="news.html" class="btn btn-primary mt-3">Вернуться к списку новостей</a>
            </div>
          `;
          return;
        }
        
        // Форматируем дату
        const date = new Date(newsItem.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        // Отображаем детали новости
        newsDetailContainer.innerHTML = `
          <div class="news-detail">
            <div class="news-detail-header">
              <h1 class="news-detail-title">${newsItem.title}</h1>
              <div class="news-detail-meta">
                <span class="news-detail-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                <span class="news-detail-category"><i class="fas fa-tag"></i> ${newsItem.category}</span>
                <span class="news-detail-author"><i class="far fa-user"></i> ${newsItem.author}</span>
              </div>
            </div>
            
            <div class="news-detail-image-container">
              <img src="${newsItem.image || 'img/news/placeholder.jpg'}" alt="${newsItem.title}" class="news-detail-image">
            </div>
            
            <div class="news-detail-content">
              ${newsItem.content}
            </div>
            
            <div class="news-detail-footer">
              <a href="news.html" class="btn btn-outline"><i class="fas fa-arrow-left"></i> Назад к новостям</a>
              
              <div class="news-share">
                <span>Поделиться:</span>
                <a href="#" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          
          <div class="related-news mt-5">
            <h2>Похожие новости</h2>
            <div class="related-news-container" id="related-news-container"></div>
          </div>
        `;
        
        // Загружаем похожие новости
        loadRelatedNews(newsItem, news);
      })
      .catch(error => {
        console.error('Ошибка загрузки деталей новости:', error);
        newsDetailContainer.innerHTML = `
          <div class="alert alert-danger">
            <p>Произошла ошибка при загрузке новости. Пожалуйста, попробуйте позже.</p>
            <a href="news.html" class="btn btn-primary mt-3">Вернуться к списку новостей</a>
          </div>
        `;
      });
  }
}

/**
 * Загрузка похожих новостей
 * @param {Object} currentNews - Текущая новость
 * @param {Array} allNews - Массив всех новостей
 */
function loadRelatedNews(currentNews, allNews) {
  const relatedNewsContainer = document.getElementById('related-news-container');
  
  if (relatedNewsContainer) {
    // Фильтруем новости той же категории, исключая текущую
    let relatedNews = allNews.filter(item => 
      item.category === currentNews.category && item.id !== currentNews.id
    );
    
    // Если похожих новостей мало, добавляем другие
    if (relatedNews.length < 3) {
      const otherNews = allNews.filter(item => 
        item.category !== currentNews.category && item.id !== currentNews.id
      );
      
      // Перемешиваем другие новости
      otherNews.sort(() => Math.random() - 0.5);
      
      // Добавляем к похожим, но не более 3 в итоге
      relatedNews = relatedNews.concat(otherNews.slice(0, 3 - relatedNews.length));
    } else {
      // Если похожих новостей много, выбираем 3 случайные
      relatedNews.sort(() => Math.random() - 0.5);
      relatedNews = relatedNews.slice(0, 3);
    }
    
    // Если похожих новостей нет
    if (relatedNews.length === 0) {
      relatedNewsContainer.innerHTML = `
        <p>Похожие новости не найдены.</p>
      `;
      return;
    }
    
    // Создаем HTML для похожих новостей
    const relatedNewsHTML = document.createElement('div');
    relatedNewsHTML.className = 'grid grid-3';
    
    relatedNews.forEach(item => {
      // Форматируем дату
      const date = new Date(item.date);
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Создаем элемент новости
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <div class="news-image-container">
          <img src="${item.image || 'img/news/placeholder.jpg'}" alt="${item.title}" class="news-image">
          <div class="news-category">${item.category}</div>
        </div>
        <div class="news-content">
          <div class="news-date">${formattedDate}</div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-text">${truncateText(item.content, 100)}</p>
          <a href="news-detail.html?id=${item.id}" class="news-link">Читать далее <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      
      relatedNewsHTML.appendChild(newsItem);
    });
    
    relatedNewsContainer.appendChild(relatedNewsHTML);
  }
}

// Функции для административной панели

/**
 * Инициализация админ-панели для управления новостями
 */
function initAdminPanel() {
  // Загрузка списка новостей в админке
  loadAdminNewsList();
  
  // Обработчик формы добавления/редактирования новости
  const newsForm = document.getElementById('news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        saveNewsItem(this);
      }
    });
    
    // Обработчик предпросмотра изображения
    const imageInput = document.getElementById('news-image');
    const imagePreview = document.getElementById('image-preview');
    
    if (imageInput && imagePreview) {
      imageInput.addEventListener('change', function() {
        previewImage(this, imagePreview);
      });
    }
  }
  
  // Обработчик кнопки "Добавить новость"
  const addNewsBtn = document.getElementById('add-news-btn');
  if (addNewsBtn) {
    addNewsBtn.addEventListener('click', function() {
      openNewsForm();
    });
  }
  
  // Обработчик кнопки "Отмена" в форме
  const cancelBtn = document.querySelector('#news-form .btn-secondary');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeNewsForm();
    });
  }
}

/**
 * Загрузка списка новостей в админ-панель
 */
function loadAdminNewsList() {
  const newsTable = document.getElementById('news-table-body');
  
  if (newsTable) {
    loadNews()
      .then(news => {
        // Очищаем таблицу
        newsTable.innerHTML = '';
        
        // Сортируем новости по дате (самые новые в начале)
        news.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Если новостей нет
        if (news.length === 0) {
          newsTable.innerHTML = `
            <tr>
              <td colspan="5" class="text-center">Новости не найдены</td>
            </tr>
          `;
          return;
        }
        
        // Создаем строки таблицы для каждой новости
        news.forEach((item, index) => {
          // Форматируем дату
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          
          // Создаем строку таблицы
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>
              <div class="news-title-preview">
                <img src="${item.image || 'img/news/placeholder.jpg'}" alt="" class="news-thumbnail">
                <span>${item.title}</span>
              </div>
            </td>
            <td>${item.category}</td>
            <td>${formattedDate}</td>
            <td>
              <button type="button" class="action-btn edit" data-id="${item.id}" title="Редактировать">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="action-btn delete" data-id="${item.id}" title="Удалить">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          `;
          
          newsTable.appendChild(row);
        });
        
        // Добавляем обработчики событий для кнопок редактирования и удаления
        addAdminButtonsHandlers();
      })
      .catch(error => {
        console.error('Ошибка загрузки новостей в админ-панель:', error);
        newsTable.innerHTML = `
          <tr>
            <td colspan="5" class="text-center">Ошибка загрузки новостей</td>
          </tr>
        `;
      });
  }
}

/**
 * Добавление обработчиков для кнопок в админ-панели
 */
function addAdminButtonsHandlers() {
  // Обработчики для кнопок редактирования
  const editButtons = document.querySelectorAll('.action-btn.edit');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const newsId = parseInt(this.getAttribute('data-id'));
      editNewsItem(newsId);
    });
  });
  
  // Обработчики для кнопок удаления
  const deleteButtons = document.querySelectorAll('.action-btn.delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const newsId = parseInt(this.getAttribute('data-id'));
      deleteNewsItem(newsId);
    });
  });
}

/**
 * Открытие формы для добавления новости
 */
function openNewsForm() {
  const newsForm = document.getElementById('news-form-container');
  const newsListContainer = document.getElementById('news-list-container');
  
  if (newsForm && newsListContainer) {
    // Очищаем форму
    document.getElementById('news-form').reset();
    document.getElementById('news-id').value = '';
    document.getElementById('image-preview').innerHTML = 'Изображение не выбрано';
    
    // Показываем форму и скрываем список
    newsForm.classList.remove('hidden');
    newsListContainer.classList.add('hidden');
    
    // Меняем заголовок формы
    document.querySelector('#news-form-container h2').textContent = 'Добавление новости';
  }
}

/**
 * Открытие формы для редактирования новости
 * @param {number} newsId - ID новости для редактирования
 */
function editNewsItem(newsId) {
  // Загружаем новости
  loadNews()
    .then(news => {
      // Находим нужную новость по ID
      const newsItem = news.find(item => item.id === newsId);
      
      if (!newsItem) {
        showNotification('Новость не найдена', 'error');
        return;
      }
      
      // Показываем форму и заполняем её данными
      const newsForm = document.getElementById('news-form-container');
      const newsListContainer = document.getElementById('news-list-container');
      
      if (newsForm && newsListContainer) {
        // Заполняем форму данными
        document.getElementById('news-id').value = newsItem.id;
        document.getElementById('news-title').value = newsItem.title;
        document.getElementById('news-content').value = newsItem.content;
        document.getElementById('news-category').value = newsItem.category;
        document.getElementById('news-date').value = newsItem.date;
        
        // Показываем изображение, если оно есть
        const imagePreview = document.getElementById('image-preview');
        if (newsItem.image) {
          imagePreview.innerHTML = `<img src="${newsItem.image}" alt="">`;
        } else {
          imagePreview.innerHTML = 'Изображение не выбрано';
        }
        
        // Показываем форму и скрываем список
        newsForm.classList.remove('hidden');
        newsListContainer.classList.add('hidden');
        
        // Меняем заголовок формы
        document.querySelector('#news-form-container h2').textContent = 'Редактирование новости';
      }
    })
    .catch(error => {
      console.error('Ошибка загрузки новости для редактирования:', error);
      showNotification('Ошибка загрузки новости', 'error');
    });
}

/**
 * Закрытие формы и возврат к списку новостей
 */
function closeNewsForm() {
  const newsForm = document.getElementById('news-form-container');
  const newsListContainer = document.getElementById('news-list-container');
  
  if (newsForm && newsListContainer) {
    // Скрываем форму и показываем список
    newsForm.classList.add('hidden');
    newsListContainer.classList.remove('hidden');
  }
}

/**
 * Сохранение новости (добавление или обновление)
 * @param {HTMLFormElement} form - Форма с данными новости
 */
function saveNewsItem(form) {
  // Получаем данные из формы
  const newsId = form.querySelector('#news-id').value;
  const title = form.querySelector('#news-title').value;
  const content = form.querySelector('#news-content').value;
  const category = form.querySelector('#news-category').value;
  const date = form.querySelector('#news-date').value;
  const imageInput = form.querySelector('#news-image');
  
  // Загружаем текущие новости
  loadNews()
    .then(news => {
      // Определяем, добавляем новую новость или обновляем существующую
      const isUpdate = newsId !== '';
      
      if (isUpdate) {
        // Обновляем существующую новость
        const index = news.findIndex(item => item.id === parseInt(newsId));
        
        if (index === -1) {
          showNotification('Новость не найдена', 'error');
          return;
        }
        
        // Обновляем данные
        news[index].title = title;
        news[index].content = content;
        news[index].category = category;
        news[index].date = date;
        
        // Если выбрано новое изображение
        if (imageInput.files && imageInput.files[0]) {
          // В реальном проекте здесь был бы код для загрузки файла на сервер
          // Для демонстрации просто сообщаем, что изображение "загружено"
          showNotification('Изображение успешно загружено', 'success');
        }
        
        // Сохраняем обновленные новости
        localStorage.setItem('news', JSON.stringify(news));
        
        showNotification('Новость успешно обновлена', 'success');
      } else {
        // Добавляем новую новость
        
        // Генерируем новый ID (в реальном проекте ID бы генерировался на сервере)
        const newId = news.length > 0 ? Math.max(...news.map(item => item.id)) + 1 : 1;
        
        // Создаем объект новости
        const newNews = {
          id: newId,
          title: title,
          content: content,
          category: category,
          date: date,
          author: 'Администратор', // В реальном проекте это был бы текущий пользователь
          image: 'img/news/placeholder.jpg' // Временный плейсхолдер
        };
        
                  // Если выбрано изображение
        if (imageInput.files && imageInput.files[0]) {
          // В реальном проекте здесь был бы код для загрузки файла на сервер
          // Для демонстрации просто сообщаем, что изображение "загружено"
          showNotification('Изображение успешно загружено', 'success');
        }
        
        // Добавляем новость в массив
        news.push(newNews);
        
        // Сохраняем обновленные новости
        localStorage.setItem('news', JSON.stringify(news));
        
        showNotification('Новость успешно добавлена', 'success');
      }
      
      // Обновляем список новостей и закрываем форму
      loadAdminNewsList();
      closeNewsForm();
    })
    .catch(error => {
      console.error('Ошибка сохранения новости:', error);
      showNotification('Ошибка сохранения новости', 'error');
    });
}

/**
 * Удаление новости
 * @param {number} newsId - ID новости для удаления
 */
function deleteNewsItem(newsId) {
  // Подтверждение удаления
  if (!confirm('Вы уверены, что хотите удалить эту новость?')) {
    return;
  }
  
  // Загружаем текущие новости
  loadNews()
    .then(news => {
      // Находим индекс новости
      const index = news.findIndex(item => item.id === newsId);
      
      if (index === -1) {
        showNotification('Новость не найдена', 'error');
        return;
      }
      
      // Удаляем новость из массива
      news.splice(index, 1);
      
      // Сохраняем обновленные новости
      localStorage.setItem('news', JSON.stringify(news));
      
      // Обновляем список
      loadAdminNewsList();
      
      showNotification('Новость успешно удалена', 'success');
    })
    .catch(error => {
      console.error('Ошибка удаления новости:', error);
      showNotification('Ошибка удаления новости', 'error');
    });
}

/**
 * Предпросмотр выбранного изображения
 * @param {HTMLInputElement} input - Элемент ввода файла
 * @param {HTMLElement} previewContainer - Контейнер для предпросмотра
 */
function previewImage(input, previewContainer) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="">`;
    };
    
    reader.readAsDataURL(input.files[0]);
  } else {
    previewContainer.innerHTML = 'Изображение не выбрано';
  }
}

/**
 * Экспорт данных новостей
 */
function exportNewsData() {
  loadNews()
    .then(news => {
      // Преобразуем данные в JSON-строку
      const jsonData = JSON.stringify(news, null, 2);
      
      // Создаем Blob для скачивания
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Создаем ссылку для скачивания
      const a = document.createElement('a');
      a.href = url;
      a.download = `news_export_${new Date().toISOString().slice(0, 10)}.json`;
      
      // Добавляем ссылку в DOM, кликаем по ней и удаляем
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Освобождаем URL
      URL.revokeObjectURL(url);
      
      showNotification('Данные успешно экспортированы', 'success');
    })
    .catch(error => {
      console.error('Ошибка экспорта данных:', error);
      showNotification('Ошибка экспорта данных', 'error');
    });
}

/**
 * Импорт данных новостей
 * @param {File} file - Файл для импорта
 */
function importNewsData(file) {
  if (!file) {
    showNotification('Файл не выбран', 'error');
    return;
  }
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      // Пытаемся разобрать JSON
      const newsData = JSON.parse(e.target.result);
      
      // Проверяем, что это массив
      if (!Array.isArray(newsData)) {
        throw new Error('Неверный формат данных');
      }
      
      // Проверяем структуру данных
      const isValid = newsData.every(item => 
        item.id && item.title && item.content && item.category && item.date
      );
      
      if (!isValid) {
        throw new Error('Неверная структура данных');
      }
      
      // Сохраняем данные в localStorage
      localStorage.setItem('news', JSON.stringify(newsData));
      
      // Обновляем список
      loadAdminNewsList();
      
      showNotification('Данные успешно импортированы', 'success');
    } catch (error) {
      console.error('Ошибка импорта данных:', error);
      showNotification('Ошибка импорта данных: ' + error.message, 'error');
    }
  };
  
  reader.onerror = function() {
    showNotification('Ошибка чтения файла', 'error');
  };
  
  reader.readAsText(file);
}

/**
 * Инициализация импорта данных
 */
function initImportData() {
  const importBtn = document.getElementById('import-data-btn');
  const importInput = document.getElementById('import-file');
  
  if (importBtn && importInput) {
    importBtn.addEventListener('click', function() {
      importInput.click();
    });
    
    importInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        importNewsData(this.files[0]);
      }
    });
  }
}

/**
 * Инициализация экспорта данных
 */
function initExportData() {
  const exportBtn = document.getElementById('export-data-btn');
  
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      exportNewsData();
    });
  }
}

// Экспортируем функции для использования в других файлах
export {
  initNewsLoad,
  initNewsFilter,
  initNewsSearch,
  initNewsDetail,
  initAdminPanel,
  initImportData,
  initExportData
};/**
 * JavaScript файл для работы с новостями сайта медицинского туризма в Узбекистане
 * MediTour - Узбекистан
 */

// Импортируем необходимые функции из основного файла
import { showNotification, validateForm } from './main.js';

// Дождемся полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  // Подключаем обработчики событий для новостей
  initNewsLoad();
  initNewsFilter();
  initNewsSearch();
});

/**
 * Загрузка новостей
 */
function initNewsLoad() {
  const newsContainer = document.getElementById('news-container');
  
  if (newsContainer) {
    loadNews()
      .then(news => {
        renderNews(news, newsContainer);
      })
      .catch(error => {
        console.error('Ошибка загрузки новостей:', error);
        newsContainer.innerHTML = `
          <div class="alert alert-danger">
            <p>Произошла ошибка при загрузке новостей. Пожалуйста, попробуйте позже.</p>
          </div>
        `;
      });
  }
}

/**
 * Получение данных новостей
 * @returns {Promise<Array>} Массив новостей
 */
function loadNews() {
  return new Promise((resolve, reject) => {
    // В реальном проекте здесь был бы fetch запрос к API
    // Для демонстрации используем localStorage или включенные данные
    
    // Сначала пробуем получить новости из localStorage (если они были добавлены через админку)
    const storedNews = localStorage.getItem('news');
    
    if (storedNews) {
      try {
        const newsData = JSON.parse(storedNews);
        resolve(newsData);
      } catch (error) {
        reject(error);
      }
    } else {
      // Если в localStorage ничего нет, используем демонстрационные данные
      const demoNews = [
        {
          id: 1,
          title: 'Узбекистан открывает новый медицинский центр для иностранных пациентов',
          content: 'В Ташкенте открылся современный медицинский центр, специализирующийся на обслуживании иностранных пациентов. Центр оснащен новейшим оборудованием и предлагает широкий спектр медицинских услуг.',
          category: 'Инфраструктура',
          image: 'img/news/news-1.jpg',
          date: '2025-04-15',
          author: 'Администратор'
        },
        {
          id: 2,
          title: 'Международная конференция по медицинскому туризму пройдет в Самарканде',
          content: 'В сентябре 2025 года в историческом городе Самарканд состоится международная конференция по медицинскому туризму. Эксперты из разных стран обсудят перспективы развития этой отрасли в Узбекистане.',
          category: 'События',
          image: 'img/news/news-2.jpg',
          date: '2025-04-10',
          author: 'Администратор'
        },
        {
          id: 3,
          title: 'Новый санаторий в Чарваке: лечение и отдых на берегу водохранилища',
          content: 'В живописном районе Чарвакского водохранилища открылся новый санаторий, предлагающий комплексное лечение и реабилитацию пациентов в сочетании с отдыхом на природе.',
          category: 'Курорты',
          image: 'img/news/news-3.jpg',
          date: '2025-04-05',
          author: 'Администратор'
        },
        {
          id: 4,
          title: 'Узбекистан упрощает визовый режим для медицинских туристов',
          content: 'Правительство Узбекистана приняло решение об упрощении процедуры получения виз для иностранцев, приезжающих в страну с целью лечения. Теперь получить визу можно будет в течение 3 дней по электронной системе.',
          category: 'Законодательство',
          image: 'img/news/news-4.jpg',
          date: '2025-03-28',
          author: 'Администратор'
        },
        {
          id: 5,
          title: 'Стоматологический туризм в Узбекистане: качество по доступным ценам',
          content: 'Узбекистан становится популярным направлением для стоматологического туризма. Современные клиники, квалифицированные врачи и доступные цены привлекают пациентов из соседних стран и Европы.',
          category: 'Услуги',
          image: 'img/news/news-5.jpg',
          date: '2025-03-20',
          author: 'Администратор'
        },
        {
          id: 6,
          title: 'Традиционная медицина Узбекистана: от древних знаний к современным методикам',
          content: 'Новый центр традиционной медицины в Бухаре предлагает лечение по старинным рецептам в сочетании с современными подходами. Центр уже привлек внимание иностранных пациентов, интересующихся альтернативной медициной.',
          category: 'Традиции',
          image: 'img/news/news-6.jpg',
          date: '2025-03-15',
          author: 'Администратор'
        }
      ];
      
      // Сохраняем демо-новости в localStorage для дальнейшего использования
      localStorage.setItem('news', JSON.stringify(demoNews));
      
      resolve(demoNews);
    }
  });
}

/**
 * Отрисовка новостей на странице
 * @param {Array} news - Массив новостей для отображения
 * @param {HTMLElement} container - Контейнер для вставки новостей
 */
function renderNews(news, container) {
  if (!news || news.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info">
        <p>Новости не найдены.</p>
      </div>
    `;
    return;
  }
  
  // Очищаем контейнер
  container.innerHTML = '';
  
  // Сортируем новости по дате (самые новые в начале)
  news.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Создаем HTML для каждой новости
  news.forEach(item => {
    // Форматируем дату
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Создаем элемент новости
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <div class="news-image-container">
        <img src="${item.image || 'img/news/placeholder.jpg'}" alt="${item.title}" class="news-image">
        <div class="news-category">${item.category}</div>
      </div>
      <div class="news-content">
        <div class="news-date">${formattedDate}</div>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-text">${truncateText(item.content, 150)}</p>
        <a href="news-detail.html?id=${item.id}" class="news-link">Читать далее <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    
    container.appendChild(newsItem);
  });
}

/**
 * Обрезка текста до указанной длины
 * @param {string} text - Исходный текст
 * @param {number} maxLength - Максимальная длина
 * @returns {string} Обрезанный текст
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Инициализация фильтра новостей по категориям
 */
function initNewsFilter() {
  const filterButtons = document.querySelectorAll('.news-filter-btn');
  const newsContainer = document.getElementById('news-container');
  
  if (filterButtons.length && newsContainer) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Загружаем новости
        loadNews()
          .then(news => {
            // Фильтруем новости по категории
            let filteredNews = news;
            if (category && category !== 'all') {
              filteredNews = news.filter(item => item.category === category);
            }
            
            // Отображаем отфильтрованные новости
            renderNews(filteredNews, newsContainer);
          })
          .catch(error => {
            console.error('Ошибка загрузки новостей для фильтрации:', error);
          });
      });
    });
  }
}

/**
 * Инициализация поиска по новостям
 */
function initNewsSearch() {
    const searchForm = document.getElementById('news-search-form');
    const newsContainer = document.getElementById('news-container');
    
    if (searchForm && newsContainer) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = this.querySelector('input[type="search"]');
        if (!searchInput) return;
        
        const searchQuery = searchInput.value.trim().toLowerCase();
        
        // Если запрос пустой, показываем все новости
        if (!searchQuery) {
          initNewsLoad();
          return;
        }
        
        // Загружаем новости и фильтруем по запросу
        loadNews()
          .then(news => {
            // Фильтруем новости по запросу
            const filteredNews = news.filter(item => {
              return item.title.toLowerCase().includes(searchQuery) || 
                    item.content.toLowerCase().includes(searchQuery) ||
                    item.category.toLowerCase().includes(searchQuery);
            });
            
            // Отображаем результаты поиска
            renderNews(filteredNews, newsContainer);
            
            // Сбрасываем активные фильтры
            const filterButtons = document.querySelectorAll('.news-filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.news-filter-btn[data-category="all"]')?.classList.add('active');
            
            // Показываем количество найденных новостей
            const searchResultsInfo = document.getElementById('search-results-info');
            if (searchResultsInfo) {
              searchResultsInfo.textContent = `Найдено: ${filteredNews.length} новостей`;
              searchResultsInfo.classList.remove('hidden');
            }
            
            // Показываем кнопку сброса поиска
            const resetSearchBtn = document.getElementById('reset-search-btn');
            if (resetSearchBtn) {
              resetSearchBtn.classList.remove('hidden');
            }
          })
          .catch(error => {
            console.error('Ошибка поиска новостей:', error);
            newsContainer.innerHTML = `
              <div class="alert alert-danger">
                <p>Произошла ошибка при поиске новостей. Пожалуйста, попробуйте позже.</p>
              </div>
            `;
          });
      });
      
      // Обработчик для кнопки сброса поиска
      const resetSearchBtn = document.getElementById('reset-search-btn');
      if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', function() {
          // Сбрасываем поле поиска
          const searchInput = searchForm.querySelector('input[type="search"]');
          if (searchInput) {
            searchInput.value = '';
          }
          
          // Загружаем все новости
          initNewsLoad();
          
          // Скрываем информацию о результатах поиска
          const searchResultsInfo = document.getElementById('search-results-info');
          if (searchResultsInfo) {
            searchResultsInfo.classList.add('hidden');
          }
          
          // Скрываем кнопку сброса
          this.classList.add('hidden');
          
          // Устанавливаем активный фильтр "Все"
          const filterButtons = document.querySelectorAll('.news-filter-btn');
          filterButtons.forEach(btn => btn.classList.remove('active'));
          document.querySelector('.news-filter-btn[data-category="all"]')?.classList.add('active');
        });
      }
      
      // Обработка живого поиска (поиск при вводе)
      const searchInput = searchForm.querySelector('input[type="search"]');
      if (searchInput) {
        let debounceTimer;
        
        searchInput.addEventListener('input', function() {
          // Очищаем предыдущий таймер
          clearTimeout(debounceTimer);
          
          // Устанавливаем задержку для поиска (300 мс после окончания ввода)
          debounceTimer = setTimeout(() => {
            const searchQuery = this.value.trim().toLowerCase();
            
            // Если запрос пустой или слишком короткий, не выполняем поиск
            if (!searchQuery || searchQuery.length < 3) {
              return;
            }
            
            // Загружаем новости и фильтруем по запросу
            loadNews()
              .then(news => {
                // Фильтруем новости по запросу
                const filteredNews = news.filter(item => {
                  return item.title.toLowerCase().includes(searchQuery) || 
                        item.content.toLowerCase().includes(searchQuery) ||
                        item.category.toLowerCase().includes(searchQuery);
                });
                
                // Отображаем результаты поиска
                renderNews(filteredNews, newsContainer);
                
                // Показываем количество найденных новостей
                const searchResultsInfo = document.getElementById('search-results-info');
                if (searchResultsInfo) {
                  searchResultsInfo.textContent = `Найдено: ${filteredNews.length} новостей`;
                  searchResultsInfo.classList.remove('hidden');
                }
                
                // Показываем кнопку сброса поиска
                const resetSearchBtn = document.getElementById('reset-search-btn');
                if (resetSearchBtn) {
                  resetSearchBtn.classList.remove('hidden');
                }
              })
              .catch(error => {
                console.error('Ошибка поиска новостей:', error);
              });
          }, 300);
        });
      }
    }
  }
  
  /**
   * Выделение поискового запроса в тексте
   * @param {string} text - Исходный текст
   * @param {string} query - Поисковый запрос
   * @returns {string} Текст с выделенным запросом
   */
  function highlightSearchQuery(text, query) {
    if (!query || query.trim() === '') {
      return text;
    }
    
    const regex = new RegExp(query.trim(), 'gi');
    return text.replace(regex, match => `<span class="search-highlight">${match}</span>`);
  }
  
  /**
   * Экспортируем функции
   */
  export {
    initNewsSearch,
    highlightSearchQuery
  };