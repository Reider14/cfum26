// ===============================
// SISTEMA UNIFICADO DE EVENTOS
// Calendário e Roadmap sincronizados
// ===============================

// ===============================
// GLOBAL VARIABLES & DATA
// ===============================

let currentView = 'month';
let currentDate = new Date('2025-12-05');
let currentMainView = 'calendar'; // 'calendar' or 'roadmap'

// Roadmap Configuration
const ROADMAP_CONFIG = {
  nodeWidth: 200,
  nodeHeight: 180,
  padding: 60,
  rowHeight: 200,
  itemsPerRow: 4
};

// SISTEMA UNIFICADO DE EVENTOS
// Todos os eventos são armazenados aqui e sincronizados entre calendário e roadmap
let unifiedEvents = [
  {
    id: 1,
    name: 'Tarde Infantil',
    date: '2025-11-16',
    endDate: '2025-11-16',
    time: '16H - 21H',
    location: 'Praça Nova',
    icon: 'fa-child',
    status: 'completed',
    responsaveis: [
      { nome: 'Maria Silva', funcao: 'Coordenadora Geral' },
      { nome: 'João Santos', funcao: 'Logística' }
    ],
    participantes: [
      { nome: 'Ana Costa', funcao: 'Animadora' },
      { nome: 'Pedro Lima', funcao: 'Fotógrafo' },
      { nome: 'Sofia Mendes', funcao: 'Apoio Geral' }
    ],
    tarefas: [
      { id: 1, texto: 'Reservar local', concluida: true },
      { id: 2, texto: 'Comprar materiais de atividades', concluida: true },
      { id: 3, texto: 'Confirmar animadores', concluida: true },
      { id: 4, texto: 'Divulgar evento nas redes', concluida: true }
    ]
  },
  {
    id: 2,
    name: 'Torneio Inter-Instituições',
    date: '2025-12-05',
    endDate: '2025-12-20',
    time: '19H - 22H',
    location: 'Campo Desportivo UM',
    icon: 'fa-trophy',
    status: 'current',
    responsaveis: [
      { nome: 'Carlos Rodrigues', funcao: 'Coordenador Desportivo' }
    ],
    participantes: [
      { nome: 'Bruno Alves', funcao: 'Árbitro' },
      { nome: 'Diana Ferreira', funcao: 'Placar/Resultados' },
      { nome: 'Eduardo Gomes', funcao: 'Som e Música' }
    ],
    tarefas: [
      { id: 1, texto: 'Confirmar equipas participantes', concluida: true },
      { id: 2, texto: 'Preparar troféus e medalhas', concluida: false },
      { id: 3, texto: 'Montar estrutura no campo', concluida: false },
      { id: 4, texto: 'Testar equipamento de som', concluida: false }
    ]
  },
  {
    id: 3,
    name: 'Festa de Natal',
    date: '2025-12-20',
    endDate: '2025-12-20',
    time: '20H - 02H',
    location: 'Salão de Eventos',
    icon: 'fa-gift',
    status: 'pending',
    responsaveis: [
      { nome: 'Laura Martins', funcao: 'Decoração' },
      { nome: 'Ricardo Sousa', funcao: 'Catering' }
    ],
    participantes: [
      { nome: 'Mariana Oliveira', funcao: 'DJ' },
      { nome: 'Tiago Pereira', funcao: 'Bilheteira' }
    ],
    tarefas: [
      { id: 1, texto: 'Contratar DJ', concluida: false },
      { id: 2, texto: 'Encomendar decorações natalinas', concluida: false },
      { id: 3, texto: 'Definir menu de comidas/bebidas', concluida: false },
      { id: 4, texto: 'Criar convites digitais', concluida: false },
      { id: 5, texto: 'Reservar salão', concluida: true }
    ]
  },
  {
    id: 4,
    name: 'Semana Académica',
    date: '2026-03-15',
    endDate: '2026-03-20',
    time: '09H - 22H',
    location: 'Campus Universitário',
    icon: 'fa-graduation-cap',
    status: 'pending',
    responsaveis: [
      { nome: 'Fernando Costa', funcao: 'Coordenador Geral' },
      { nome: 'Beatriz Nunes', funcao: 'Programação' }
    ],
    participantes: [],
    tarefas: [
      { id: 1, texto: 'Definir cronograma de atividades', concluida: false },
      { id: 2, texto: 'Convidar palestrantes', concluida: false },
      { id: 3, texto: 'Reservar salas', concluida: false }
    ]
  },
  {
    id: 5,
    name: 'Gala de Finalistas',
    date: '2026-05-30',
    endDate: '2026-05-30',
    time: '19H - 00H',
    location: 'Hotel Porto Grande',
    icon: 'fa-star',
    status: 'pending',
    responsaveis: [
      { nome: 'Gabriela Reis', funcao: 'Cerimonial' }
    ],
    participantes: [],
    tarefas: [
      { id: 1, texto: 'Reservar hotel', concluida: false },
      { id: 2, texto: 'Definir dress code', concluida: false },
      { id: 3, texto: 'Criar lista de convidados VIP', concluida: false }
    ]
  },
  {
    id: 6,
    name: 'Dia de Finalista',
    date: '2026-07-18',
    endDate: '2026-07-18',
    time: 'Todo o dia',
    location: 'Universidade do Mindelo',
    icon: 'fa-crown',
    status: 'final',
    responsaveis: [
      { nome: 'Comissão Completa', funcao: 'Organização' }
    ],
    participantes: [],
    tarefas: [
      { id: 1, texto: 'Coordenar com reitoria', concluida: false },
      { id: 2, texto: 'Encomendar becas', concluida: false },
      { id: 3, texto: 'Organizar cerimónia', concluida: false },
      { id: 4, texto: 'Contratar fotógrafo oficial', concluida: false }
    ]
  }
];

// Current editing event
let currentEditingEvent = null;

// ===============================
// INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Load saved events
  loadEvents();

  // Show loading screen for 2 seconds
  setTimeout(() => {
    hideLoadingScreen();
  }, 2000);

  // Initialize components
  initializeNavigation();
  initializeCalendar();
  initializeGallery();
  initializeDashboard();
  updateStats();

  // Set current month as default
  const currentMonth = currentDate.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
  document.getElementById('calendar-title').textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
}

// ===============================
// DATA PERSISTENCE
// ===============================

function saveEvents() {
  localStorage.setItem('unifiedEvents', JSON.stringify(unifiedEvents));
}

function loadEvents() {
  const saved = localStorage.getItem('unifiedEvents');
  if (saved) {
    unifiedEvents = JSON.parse(saved);
  }
  // Sort by date
  unifiedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ===============================
// LOADING SCREEN
// ===============================

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}

// ===============================
// NAVIGATION
// ===============================

function initializeNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ===============================
// VIEW TOGGLE (Calendar / Roadmap)
// ===============================

function switchToCalendarView() {
  showCalendarView();
  scrollToSection('calendar');
}

function switchToRoadmapView() {
  showRoadmapView();
  scrollToSection('calendar');
}

function showCalendarView() {
  currentMainView = 'calendar';

  // Update toggle buttons
  document.getElementById('btn-calendar-view').classList.add('active');
  document.getElementById('btn-roadmap-view').classList.remove('active');

  // Show/hide containers
  document.getElementById('calendar-view-container').classList.add('active');
  document.getElementById('roadmap-view-container').classList.remove('active');

  // Re-render calendar
  renderCalendar();
}

function showRoadmapView() {
  currentMainView = 'roadmap';

  // Update toggle buttons
  document.getElementById('btn-calendar-view').classList.remove('active');
  document.getElementById('btn-roadmap-view').classList.add('active');

  // Show/hide containers
  document.getElementById('calendar-view-container').classList.remove('active');
  document.getElementById('roadmap-view-container').classList.add('active');

  // Render roadmap
  setTimeout(() => {
    generateInlineRoadmap();
    updateInlineProgressBar();
  }, 100);
}

// ===============================
// CALENDAR FUNCTIONALITY
// ===============================

function initializeCalendar() {
  renderCalendar();
  updateCalendarNavButtons();
}

function changeCalendarView(view) {
  currentView = view;
  renderCalendar();
  updateCalendarNavButtons();
}

function updateCalendarNavButtons() {
  // Remove active class from all buttons
  document.querySelectorAll('.calendar-navigation .nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to current view button
  const activeBtn = document.getElementById(`btn-${currentView}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

function renderCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  const calendarTitle = document.getElementById('calendar-title');

  if (!calendarGrid) return;

  calendarGrid.innerHTML = '';

  switch (currentView) {
    case 'month':
      renderMonthlyView(calendarGrid, calendarTitle);
      break;
    case 'quarter':
      renderQuarterlyView(calendarGrid, calendarTitle);
      break;
    case 'year':
      renderYearlyView(calendarGrid, calendarTitle);
      break;
  }
}

function renderMonthlyView(calendarGrid, calendarTitle) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update title
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  calendarTitle.textContent = `${monthNames[month]} ${year}`;

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // Create day headers
  const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const headerRow = document.createElement('div');
  headerRow.style.display = 'grid';
  headerRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
  headerRow.style.gap = 'var(--space-sm)';
  headerRow.style.marginBottom = 'var(--space-sm)';

  dayHeaders.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.textContent = day;
    dayHeader.style.textAlign = 'center';
    dayHeader.style.fontWeight = '600';
    dayHeader.style.color = 'var(--text-dim)';
    dayHeader.style.fontSize = '14px';
    headerRow.appendChild(dayHeader);
  });

  calendarGrid.appendChild(headerRow);

  // Create grid for days
  const daysGrid = document.createElement('div');
  daysGrid.style.display = 'grid';
  daysGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  daysGrid.style.gap = 'var(--space-sm)';

  // Add empty cells for days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    daysGrid.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day, month, year);
    daysGrid.appendChild(dayElement);
  }

  calendarGrid.appendChild(daysGrid);
}

function createDayElement(day, month, year) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';

  const dayHeader = document.createElement('div');
  dayHeader.className = 'day-header';

  const dayNumber = document.createElement('div');
  dayNumber.className = 'day-number';
  dayNumber.textContent = day;

  const addEventBtn = document.createElement('button');
  addEventBtn.innerHTML = '<i class="fas fa-plus"></i>';
  addEventBtn.style.cssText = `
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all var(--transition-fast);
  `;
  addEventBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEventModal();
  });
  addEventBtn.addEventListener('mouseenter', () => {
    addEventBtn.style.background = 'var(--accent-cyan-glow)';
    addEventBtn.style.color = 'var(--accent-cyan)';
  });
  addEventBtn.addEventListener('mouseleave', () => {
    addEventBtn.style.background = 'none';
    addEventBtn.style.color = 'var(--text-dim)';
  });

  dayHeader.appendChild(dayNumber);
  dayHeader.appendChild(addEventBtn);

  const dayEvents = document.createElement('div');
  dayEvents.className = 'day-events';

  // Add events for this day
  const dayEventsList = getEventsForDate(day, month, year);
  dayEventsList.forEach(event => {
    const eventElement = createCalendarEventElement(event);
    dayEvents.appendChild(eventElement);
  });

  dayElement.appendChild(dayHeader);
  dayElement.appendChild(dayEvents);

  return dayElement;
}

function createCalendarEventElement(event) {
  const statusLabels = {
    completed: 'Concluído',
    current: 'Em Andamento',
    pending: 'Pendente',
    final: 'Meta Final'
  };

  const statusColors = {
    completed: '#22C55E',
    current: '#00F2FF',
    pending: '#FACC15',
    final: '#FFD700'
  };

  const responsaveisText = (event.responsaveis || []).map(r => r.nome).join(', ') || 'Não definido';
  const tarefasCount = event.tarefas?.length || 0;
  const tarefasConcluidas = event.tarefas?.filter(t => t.concluida).length || 0;

  const eventElement = document.createElement('div');
  eventElement.className = `event-item status-${event.status}`;
  eventElement.innerHTML = `
    <div style="font-weight: 600; margin-bottom: 2px;">
      <i class="fas ${event.icon || 'fa-calendar'}" style="margin-right: 4px; font-size: 10px;"></i>
      ${event.name}
    </div>
    <div style="font-size: 11px; opacity: 0.8;">${event.time}</div>

    <div class="event-tooltip">
      <div class="event-tooltip-title">${event.name}</div>
      <div class="event-tooltip-info">
        <i class="fas fa-calendar-alt"></i>
        <span>${formatDate(event.date)}</span>
      </div>
      <div class="event-tooltip-info">
        <i class="fas fa-clock"></i>
        <span>${event.time}</span>
      </div>
      <div class="event-tooltip-info">
        <i class="fas fa-map-marker-alt"></i>
        <span>${event.location}</span>
      </div>
      <div class="event-tooltip-info">
        <i class="fas fa-user-tie"></i>
        <span>${responsaveisText}</span>
      </div>
      ${tarefasCount > 0 ? `
      <div class="event-tooltip-info">
        <i class="fas fa-tasks"></i>
        <span>${tarefasConcluidas}/${tarefasCount} tarefas concluídas</span>
      </div>
      ` : ''}
      <span class="event-tooltip-status" style="background: ${statusColors[event.status]}20; color: ${statusColors[event.status]};">
        ${statusLabels[event.status] || 'Pendente'}
      </span>
    </div>
  `;

  eventElement.addEventListener('click', (e) => {
    e.stopPropagation();
    openEventDetailModal(event);
  });

  return eventElement;
}

function getEventsForDate(day, month, year) {
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return unifiedEvents.filter(event => {
    return event.date <= dateString && (event.endDate || event.date) >= dateString;
  });
}

function renderQuarterlyView(calendarGrid, calendarTitle) {
  const year = currentDate.getFullYear();
  const quarter = Math.floor(currentDate.getMonth() / 3);
  const quarterNames = [
    ['Janeiro', 'Fevereiro', 'Março'],
    ['Abril', 'Maio', 'Junho'],
    ['Julho', 'Agosto', 'Setembro'],
    ['Outubro', 'Novembro', 'Dezembro']
  ];

  calendarTitle.textContent = `${quarterNames[quarter][0]} - ${quarterNames[quarter][2]} ${year}`;

  const monthsInQuarter = [quarter * 3, quarter * 3 + 1, quarter * 3 + 2];

  monthsInQuarter.forEach(monthIndex => {
    const monthContainer = document.createElement('div');
    monthContainer.style.marginBottom = 'var(--space-lg)';

    const monthTitle = document.createElement('h4');
    monthTitle.textContent = quarterNames[quarter][monthIndex - quarter * 3];
    monthTitle.style.color = 'var(--accent-cyan)';
    monthTitle.style.marginBottom = 'var(--space-sm)';
    monthTitle.style.fontSize = '18px';
    monthTitle.style.fontWeight = '600';

    monthContainer.appendChild(monthTitle);

    const monthEvents = getEventsForMonth(monthIndex, year);
    const monthEventsContainer = document.createElement('div');

    if (monthEvents.length > 0) {
      monthEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-item';
        eventCard.style.marginBottom = 'var(--space-xs)';
        eventCard.style.padding = 'var(--space-sm)';
        eventCard.style.borderRadius = 'var(--radius-sm)';
        eventCard.style.borderLeft = `4px solid var(--accent-cyan)`;
        eventCard.style.background = 'var(--bg-card)';
        eventCard.style.cursor = 'pointer';

        eventCard.innerHTML = `
          <div style="font-weight: 600;">${event.name}</div>
          <div style="font-size: 12px; opacity: 0.8;">
            ${formatDate(event.date)} - ${event.time} - ${event.location}
          </div>
        `;

        eventCard.addEventListener('click', () => openEventDetailModal(event));
        monthEventsContainer.appendChild(eventCard);
      });
    } else {
      const noEvents = document.createElement('div');
      noEvents.textContent = 'Nenhum evento neste mês';
      noEvents.style.color = 'var(--text-dim)';
      noEvents.style.fontStyle = 'italic';
      monthEventsContainer.appendChild(noEvents);
    }

    monthContainer.appendChild(monthEventsContainer);
    calendarGrid.appendChild(monthContainer);
  });
}

function renderYearlyView(calendarGrid, calendarTitle) {
  const year = currentDate.getFullYear();
  calendarTitle.textContent = year;

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  months.forEach((monthName, index) => {
    const monthContainer = document.createElement('div');
    monthContainer.className = 'calendar-day';

    const monthHeader = document.createElement('div');
    monthHeader.className = 'day-header';

    const monthTitle = document.createElement('h4');
    monthTitle.textContent = monthName;
    monthTitle.style.color = 'var(--accent-cyan)';
    monthTitle.style.fontSize = '16px';
    monthTitle.style.fontWeight = '600';

    const eventCount = getEventsForMonth(index, year).length;
    const eventCountBadge = document.createElement('div');
    eventCountBadge.textContent = eventCount;
    eventCountBadge.style.cssText = `
      background: var(--accent-cyan);
      color: var(--bg-page);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    `;

    monthHeader.appendChild(monthTitle);
    monthHeader.appendChild(eventCountBadge);

    const monthEvents = getEventsForMonth(index, year);
    const eventsContainer = document.createElement('div');

    if (monthEvents.length > 0) {
      monthEvents.slice(0, 3).forEach(event => {
        const eventElement = createCalendarEventElement(event);
        eventElement.style.fontSize = '12px';
        eventElement.style.padding = '4px';
        eventsContainer.appendChild(eventElement);
      });

      if (monthEvents.length > 3) {
        const moreEvents = document.createElement('div');
        moreEvents.textContent = `+${monthEvents.length - 3} mais eventos`;
        moreEvents.style.fontSize = '11px';
        moreEvents.style.color = 'var(--text-dim)';
        moreEvents.style.fontStyle = 'italic';
        eventsContainer.appendChild(moreEvents);
      }
    } else {
      const noEvents = document.createElement('div');
      noEvents.textContent = 'Sem eventos';
      noEvents.style.color = 'var(--text-dim)';
      noEvents.style.fontStyle = 'italic';
      noEvents.style.fontSize = '12px';
      eventsContainer.appendChild(noEvents);
    }

    monthContainer.appendChild(monthHeader);
    monthContainer.appendChild(eventsContainer);
    calendarGrid.appendChild(monthContainer);
  });
}

function getEventsForMonth(monthIndex, year) {
  return unifiedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year;
  });
}

function previousPeriod() {
  switch (currentView) {
    case 'month':
      currentDate.setMonth(currentDate.getMonth() - 1);
      break;
    case 'quarter':
      currentDate.setMonth(currentDate.getMonth() - 3);
      break;
    case 'year':
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      break;
  }
  renderCalendar();
}

function nextPeriod() {
  switch (currentView) {
    case 'month':
      currentDate.setMonth(currentDate.getMonth() + 1);
      break;
    case 'quarter':
      currentDate.setMonth(currentDate.getMonth() + 3);
      break;
    case 'year':
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      break;
  }
  renderCalendar();
}

// ===============================
// INLINE ROADMAP FUNCTIONALITY
// ===============================

function generateInlineRoadmap() {
  const pathContainer = document.getElementById('roadmap-path-inline');
  const milestonesContainer = document.getElementById('roadmap-milestones-inline');
  const scrollContainer = document.querySelector('#roadmap-view-container .roadmap-scroll-container');
  const roadmapContainer = document.getElementById('roadmap-inline-container');

  if (!pathContainer || !milestonesContainer) return;

  pathContainer.innerHTML = '';
  milestonesContainer.innerHTML = '';

  const milestones = unifiedEvents;
  if (milestones.length === 0) return;

  // Configuration for serpentine layout
  const isMobile = window.innerWidth < 768;
  const itemsPerRow = isMobile ? 2 : 3;
  const totalRows = Math.ceil(milestones.length / itemsPerRow);

  const horizontalSpacing = isMobile ? 180 : 300;
  const rowHeight = isMobile ? 200 : 280;
  const paddingX = isMobile ? 100 : 180;
  const paddingY = isMobile ? 100 : 140;
  const roadWidth = isMobile ? 45 : 60;

  // Calculate container dimensions
  const containerWidth = (itemsPerRow * horizontalSpacing) + (paddingX * 2) - horizontalSpacing + 100;
  const containerHeight = (totalRows * rowHeight) + (paddingY * 2);

  // Set container sizes
  if (scrollContainer) {
    scrollContainer.style.width = `${containerWidth}px`;
    scrollContainer.style.height = `${containerHeight}px`;
  }
  if (roadmapContainer) {
    roadmapContainer.style.width = `${containerWidth}px`;
    roadmapContainer.style.height = `${containerHeight}px`;
  }

  // Calculate serpentine positions
  const positions = [];
  milestones.forEach((milestone, index) => {
    const row = Math.floor(index / itemsPerRow);
    const colInRow = index % itemsPerRow;
    const isReversedRow = row % 2 === 1;

    // Alternate direction for serpentine effect
    const col = isReversedRow ? (itemsPerRow - 1 - colInRow) : colInRow;

    const x = paddingX + (col * horizontalSpacing);
    const y = paddingY + (row * rowHeight);

    positions.push({
      x,
      y,
      row,
      col: colInRow,
      isReversedRow,
      milestone,
      index
    });
  });

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', containerWidth);
  svg.setAttribute('height', containerHeight);
  svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';

  // Gradient definitions
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  // Road gradient (dark blue asphalt)
  const roadGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  roadGradient.setAttribute('id', 'roadGradient');
  roadGradient.setAttribute('x1', '0%');
  roadGradient.setAttribute('y1', '0%');
  roadGradient.setAttribute('x2', '100%');
  roadGradient.setAttribute('y2', '100%');
  [
    { offset: '0%', color: '#1a365d' },
    { offset: '50%', color: '#0c1929' },
    { offset: '100%', color: '#1a365d' }
  ].forEach(stop => {
    const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopEl.setAttribute('offset', stop.offset);
    stopEl.setAttribute('stop-color', stop.color);
    roadGradient.appendChild(stopEl);
  });
  defs.appendChild(roadGradient);

  // Neon glow gradient for edges
  const neonGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  neonGradient.setAttribute('id', 'neonGradient');
  neonGradient.setAttribute('x1', '0%');
  neonGradient.setAttribute('y1', '0%');
  neonGradient.setAttribute('x2', '100%');
  neonGradient.setAttribute('y2', '100%');
  [
    { offset: '0%', color: '#00ff88' },
    { offset: '20%', color: '#00F2FF' },
    { offset: '40%', color: '#7B68EE' },
    { offset: '60%', color: '#ff6b9d' },
    { offset: '80%', color: '#c084fc' },
    { offset: '100%', color: '#FFD700' }
  ].forEach(stop => {
    const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopEl.setAttribute('offset', stop.offset);
    stopEl.setAttribute('stop-color', stop.color);
    neonGradient.appendChild(stopEl);
  });
  defs.appendChild(neonGradient);

  // Glow filters
  const neonGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  neonGlow.setAttribute('id', 'neonGlow');
  neonGlow.setAttribute('x', '-50%');
  neonGlow.setAttribute('y', '-50%');
  neonGlow.setAttribute('width', '200%');
  neonGlow.setAttribute('height', '200%');
  neonGlow.innerHTML = `
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `;
  defs.appendChild(neonGlow);

  const softGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  softGlow.setAttribute('id', 'softGlow');
  softGlow.innerHTML = `
    <feGaussianBlur stdDeviation="12" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `;
  defs.appendChild(softGlow);

  svg.appendChild(defs);

  // Generate serpentine path
  if (positions.length > 1) {
    let pathData = `M ${positions[0].x} ${positions[0].y}`;

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];

      if (prev.row === curr.row) {
        // Same row - straight line
        pathData += ` L ${curr.x} ${curr.y}`;
      } else {
        // Different row - smooth U-turn curve
        const midY = (prev.y + curr.y) / 2;
        const curveIntensity = rowHeight * 0.4;

        pathData += ` C ${prev.x} ${prev.y + curveIntensity}, ${curr.x} ${curr.y - curveIntensity}, ${curr.x} ${curr.y}`;
      }
    }

    // Road outer glow
    const roadGlow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    roadGlow.setAttribute('d', pathData);
    roadGlow.setAttribute('fill', 'none');
    roadGlow.setAttribute('stroke', 'url(#neonGradient)');
    roadGlow.setAttribute('stroke-width', roadWidth + 30);
    roadGlow.setAttribute('stroke-linecap', 'round');
    roadGlow.setAttribute('stroke-linejoin', 'round');
    roadGlow.setAttribute('opacity', '0.2');
    roadGlow.setAttribute('filter', 'url(#softGlow)');
    svg.appendChild(roadGlow);

    // Road neon border
    const roadBorder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    roadBorder.setAttribute('d', pathData);
    roadBorder.setAttribute('fill', 'none');
    roadBorder.setAttribute('stroke', 'url(#neonGradient)');
    roadBorder.setAttribute('stroke-width', roadWidth + 12);
    roadBorder.setAttribute('stroke-linecap', 'round');
    roadBorder.setAttribute('stroke-linejoin', 'round');
    roadBorder.setAttribute('opacity', '0.7');
    roadBorder.setAttribute('filter', 'url(#neonGlow)');
    svg.appendChild(roadBorder);

    // Main road surface
    const roadSurface = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    roadSurface.setAttribute('d', pathData);
    roadSurface.setAttribute('fill', 'none');
    roadSurface.setAttribute('stroke', 'url(#roadGradient)');
    roadSurface.setAttribute('stroke-width', roadWidth);
    roadSurface.setAttribute('stroke-linecap', 'round');
    roadSurface.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(roadSurface);

    // Center dashed line (animated yellow road marking)
    const centerLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    centerLine.setAttribute('d', pathData);
    centerLine.setAttribute('fill', 'none');
    centerLine.setAttribute('stroke', '#FFD700');
    centerLine.setAttribute('stroke-width', '4');
    centerLine.setAttribute('stroke-linecap', 'round');
    centerLine.setAttribute('stroke-dasharray', '25 18');
    centerLine.setAttribute('filter', 'url(#neonGlow)');
    centerLine.style.animation = 'dashMove 1.5s linear infinite';
    svg.appendChild(centerLine);

    // Calculate progress - find last completed/current event
    let progressIndex = -1;
    for (let i = 0; i < positions.length; i++) {
      const status = positions[i].milestone.status;
      if (status === 'completed') {
        progressIndex = i;
      } else if (status === 'current') {
        progressIndex = i;
        break;
      }
    }

    // Progress overlay (glowing neon trail)
    if (progressIndex >= 0) {
      let progressPath = `M ${positions[0].x} ${positions[0].y}`;

      for (let i = 1; i <= progressIndex; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];

        if (prev.row === curr.row) {
          progressPath += ` L ${curr.x} ${curr.y}`;
        } else {
          const midY = (prev.y + curr.y) / 2;
          const curveIntensity = rowHeight * 0.4;
          progressPath += ` C ${prev.x} ${prev.y + curveIntensity}, ${curr.x} ${curr.y - curveIntensity}, ${curr.x} ${curr.y}`;
        }
      }

      // Progress glow trail
      const progressGlow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      progressGlow.setAttribute('d', progressPath);
      progressGlow.setAttribute('fill', 'none');
      progressGlow.setAttribute('stroke', '#00ff88');
      progressGlow.setAttribute('stroke-width', roadWidth - 15);
      progressGlow.setAttribute('stroke-linecap', 'round');
      progressGlow.setAttribute('stroke-linejoin', 'round');
      progressGlow.setAttribute('opacity', '0.35');
      progressGlow.setAttribute('filter', 'url(#neonGlow)');
      svg.appendChild(progressGlow);
    }

    // Draw milestone markers
    positions.forEach((pos, i) => {
      const status = pos.milestone.status;

      // Pulse ring for current event
      if (status === 'current') {
        const pulseRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulseRing.setAttribute('cx', pos.x);
        pulseRing.setAttribute('cy', pos.y);
        pulseRing.setAttribute('r', '30');
        pulseRing.setAttribute('fill', 'none');
        pulseRing.setAttribute('stroke', '#00F2FF');
        pulseRing.setAttribute('stroke-width', '3');
        pulseRing.setAttribute('opacity', '0.7');
        pulseRing.style.animation = 'pulse 2s ease-in-out infinite';
        pulseRing.style.transformOrigin = `${pos.x}px ${pos.y}px`;
        svg.appendChild(pulseRing);
      }

      // Outer glow circle
      const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glowCircle.setAttribute('cx', pos.x);
      glowCircle.setAttribute('cy', pos.y);
      glowCircle.setAttribute('r', '22');

      if (status === 'completed') {
        glowCircle.setAttribute('fill', 'rgba(0, 255, 136, 0.5)');
      } else if (status === 'current') {
        glowCircle.setAttribute('fill', 'rgba(0, 242, 255, 0.5)');
      } else if (status === 'final') {
        glowCircle.setAttribute('fill', 'rgba(255, 215, 0, 0.5)');
      } else {
        glowCircle.setAttribute('fill', 'rgba(100, 116, 139, 0.4)');
      }
      glowCircle.setAttribute('filter', 'url(#neonGlow)');
      svg.appendChild(glowCircle);

      // Inner marker
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      marker.setAttribute('cx', pos.x);
      marker.setAttribute('cy', pos.y);
      marker.setAttribute('r', '14');

      if (status === 'completed') {
        marker.setAttribute('fill', '#00ff88');
      } else if (status === 'current') {
        marker.setAttribute('fill', '#00F2FF');
      } else if (status === 'final') {
        marker.setAttribute('fill', '#FFD700');
      } else {
        marker.setAttribute('fill', '#64748b');
      }
      marker.setAttribute('stroke', '#ffffff');
      marker.setAttribute('stroke-width', '4');
      svg.appendChild(marker);

      // Connector line to pin
      const connector = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      connector.setAttribute('x1', pos.x);
      connector.setAttribute('y1', pos.y - 22);
      connector.setAttribute('x2', pos.x);
      connector.setAttribute('y2', pos.y - 60);

      if (status === 'completed') {
        connector.setAttribute('stroke', '#00ff88');
      } else if (status === 'current') {
        connector.setAttribute('stroke', '#00F2FF');
      } else if (status === 'final') {
        connector.setAttribute('stroke', '#FFD700');
      } else {
        connector.setAttribute('stroke', '#64748b');
      }
      connector.setAttribute('stroke-width', '3');
      connector.setAttribute('stroke-dasharray', '8 5');
      connector.setAttribute('opacity', '0.9');
      svg.appendChild(connector);
    });
  }

  pathContainer.appendChild(svg);

  // Create milestone pins
  positions.forEach((pos, index) => {
    const milestone = pos.milestone;
    const milestoneEl = document.createElement('div');
    milestoneEl.className = `milestone ${milestone.status}`;

    milestoneEl.style.position = 'absolute';
    milestoneEl.style.left = `${pos.x}px`;
    milestoneEl.style.top = `${pos.y - 95}px`;
    milestoneEl.style.transform = 'translateX(-50%)';
    milestoneEl.style.opacity = '0';
    milestoneEl.style.animation = `floatIn 0.6s ease-out ${index * 0.12}s forwards`;
    milestoneEl.style.display = 'flex';
    milestoneEl.style.flexDirection = 'column';
    milestoneEl.style.alignItems = 'center';
    milestoneEl.style.textAlign = 'center';
    milestoneEl.style.width = `${isMobile ? 130 : 180}px`;

    const totalTarefas = milestone.tarefas?.length || 0;
    const tarefasConcluidas = milestone.tarefas?.filter(t => t.concluida).length || 0;

    milestoneEl.innerHTML = `
      <div class="milestone-pin">
        <i class="fas ${milestone.icon || 'fa-calendar'}"></i>
      </div>
      <div class="milestone-info" style="position: absolute; top: ${isMobile ? 155 : 175}px; width: 100%;">
        <div class="milestone-name">${milestone.name}</div>
        <div class="milestone-date">${formatDate(milestone.date)}</div>
        ${totalTarefas > 0 ? `<div class="milestone-tasks-count">${tarefasConcluidas}/${totalTarefas} tarefas</div>` : ''}
      </div>
    `;

    milestoneEl.addEventListener('click', () => openEventDetailModal(milestone));
    milestonesContainer.appendChild(milestoneEl);
  });

  // Add animation styles
  if (!document.getElementById('roadmap-animations')) {
    const animStyle = document.createElement('style');
    animStyle.id = 'roadmap-animations';
    animStyle.textContent = `
      @keyframes dashMove {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: -43; }
      }
      @keyframes pulse {
        0%, 100% { r: 30; opacity: 0.7; }
        50% { r: 40; opacity: 0.2; }
      }
      @keyframes floatIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(25px) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(animStyle);
  }
}

function updateInlineProgressBar() {
  const progressFill = document.getElementById('roadmap-progress-inline');
  if (!progressFill || unifiedEvents.length === 0) return;

  const today = new Date();
  const startDate = new Date(unifiedEvents[0].date);
  const endDate = new Date(unifiedEvents[unifiedEvents.length - 1].date);

  const totalDuration = endDate - startDate;
  const elapsed = today - startDate;
  const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

  setTimeout(() => {
    progressFill.style.width = `${progress}%`;
  }, 300);
}

// ===============================
// UNIFIED EVENT MODAL
// ===============================

function openEventDetailModal(event) {
  currentEditingEvent = event;
  const modal = document.getElementById('roadmap-event-modal-overlay');
  const modalContent = document.querySelector('.roadmap-event-modal');

  modalContent.innerHTML = buildEventDetailModalHTML(event);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function buildEventDetailModalHTML(event) {
  const statusLabels = {
    completed: 'Concluído',
    current: 'Em Andamento',
    pending: 'Pendente',
    final: 'Meta Final'
  };

  const tarefasHTML = (event.tarefas || []).map(tarefa => `
    <label class="tarefa-item ${tarefa.concluida ? 'concluida' : ''}">
      <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="toggleTarefa(${event.id}, ${tarefa.id})">
      <span class="tarefa-checkbox"></span>
      <span class="tarefa-texto">${tarefa.texto}</span>
    </label>
  `).join('');

  const responsaveisHTML = (event.responsaveis || []).map(r => `
    <div class="pessoa-item">
      <i class="fas fa-user-tie"></i>
      <span class="pessoa-nome">${r.nome}</span>
      <span class="pessoa-funcao">${r.funcao}</span>
    </div>
  `).join('') || '<p class="sem-dados">Nenhum responsável definido</p>';

  const participantesHTML = (event.participantes || []).map(p => `
    <div class="pessoa-item">
      <i class="fas fa-user"></i>
      <span class="pessoa-nome">${p.nome}</span>
      <span class="pessoa-funcao">${p.funcao}</span>
    </div>
  `).join('') || '<p class="sem-dados">Nenhum participante definido</p>';

  return `
    <div class="event-modal-header ${event.status}">
      <div class="event-modal-icon">
        <i class="fas ${event.icon || 'fa-calendar'}"></i>
      </div>
      <button class="modal-close" onclick="closeEventDetailModal()">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="event-modal-content">
      <div class="event-modal-top">
        <h3 class="event-modal-title">${event.name}</h3>
        <span class="status-badge ${event.status}">${statusLabels[event.status] || 'Pendente'}</span>
      </div>

      <div class="event-info-grid">
        <div class="event-info-item">
          <i class="fas fa-calendar-alt"></i>
          <span>${formatDate(event.date)}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-clock"></i>
          <span>${event.time}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${event.location}</span>
        </div>
      </div>

      <div class="event-section">
        <h4><i class="fas fa-user-tie"></i> Responsáveis</h4>
        <div class="pessoas-list">${responsaveisHTML}</div>
      </div>

      <div class="event-section">
        <h4><i class="fas fa-users"></i> Participantes</h4>
        <div class="pessoas-list">${participantesHTML}</div>
      </div>

      <div class="event-section">
        <h4><i class="fas fa-tasks"></i> Pré-Tarefas</h4>
        <div class="tarefas-list">
          ${tarefasHTML || '<p class="sem-dados">Nenhuma tarefa definida</p>'}
        </div>
      </div>

      <div class="event-modal-actions">
        <button class="btn-edit" onclick="openEditEventModal(${event.id})">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete" onclick="deleteEvent(${event.id})">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `;
}

function closeEventDetailModal() {
  const modal = document.getElementById('roadmap-event-modal-overlay');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
  currentEditingEvent = null;
}

// ===============================
// TOGGLE TAREFA
// ===============================

function toggleTarefa(eventId, tarefaId) {
  const event = unifiedEvents.find(e => e.id === eventId);
  if (event) {
    const tarefa = event.tarefas.find(t => t.id === tarefaId);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      saveEvents();

      // Update modal content
      const modalContent = document.querySelector('.roadmap-event-modal');
      modalContent.innerHTML = buildEventDetailModalHTML(event);

      // Regenerate views
      renderCalendar();
      if (currentMainView === 'roadmap') {
        generateInlineRoadmap();
      }
      updateStats();
    }
  }
}

// ===============================
// EVENT CRUD OPERATIONS
// ===============================

function openEventModal() {
  currentEditingEvent = null;
  const editModal = document.getElementById('milestone-edit-modal-overlay');
  editModal.innerHTML = buildEditModalHTML(null);
  editModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function openEditEventModal(eventId) {
  const event = unifiedEvents.find(e => e.id === eventId);
  if (!event) return;

  closeEventDetailModal();

  const editModal = document.getElementById('milestone-edit-modal-overlay');
  editModal.innerHTML = buildEditModalHTML(event);
  editModal.classList.add('show');
}

function buildEditModalHTML(event) {
  const isNew = !event;
  const title = isNew ? 'Novo Evento' : 'Editar Evento';

  const data = event || {
    name: '',
    date: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    icon: 'fa-calendar',
    status: 'pending',
    responsaveis: [],
    participantes: [],
    tarefas: []
  };

  const responsaveisInputs = (data.responsaveis || []).map((r, i) => `
    <div class="input-group-row" data-index="${i}">
      <input type="text" value="${r.nome}" placeholder="Nome" class="resp-nome">
      <input type="text" value="${r.funcao}" placeholder="Função" class="resp-funcao">
      <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    </div>
  `).join('');

  const participantesInputs = (data.participantes || []).map((p, i) => `
    <div class="input-group-row" data-index="${i}">
      <input type="text" value="${p.nome}" placeholder="Nome" class="part-nome">
      <input type="text" value="${p.funcao}" placeholder="Função" class="part-funcao">
      <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    </div>
  `).join('');

  const tarefasInputs = (data.tarefas || []).map((t, i) => `
    <div class="input-group-row tarefa-row" data-index="${i}">
      <input type="checkbox" ${t.concluida ? 'checked' : ''} class="tarefa-check">
      <input type="text" value="${t.texto}" placeholder="Descrição da tarefa" class="tarefa-texto-input">
      <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    </div>
  `).join('');

  return `
    <div class="edit-modal" onclick="event.stopPropagation()">
      <div class="edit-modal-header">
        <h3><i class="fas fa-${isNew ? 'plus' : 'edit'}"></i> ${title}</h3>
        <button class="modal-close" onclick="closeEditModal()"><i class="fas fa-times"></i></button>
      </div>

      <form class="edit-form" onsubmit="saveEvent(event, ${event ? event.id : 'null'})">
        <div class="form-section">
          <label>Nome do Evento</label>
          <input type="text" id="edit-name" value="${data.name}" required>
        </div>

        <div class="form-row-2">
          <div class="form-section">
            <label>Data Início</label>
            <input type="date" id="edit-date" value="${data.date}" required>
          </div>
          <div class="form-section">
            <label>Data Fim</label>
            <input type="date" id="edit-end-date" value="${data.endDate || data.date}">
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-section">
            <label>Horário</label>
            <input type="text" id="edit-time" value="${data.time}" placeholder="19H - 22H" required>
          </div>
          <div class="form-section">
            <label>Local</label>
            <input type="text" id="edit-location" value="${data.location}" required>
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-section">
            <label>Ícone (FontAwesome)</label>
            <input type="text" id="edit-icon" value="${data.icon}" placeholder="fa-star">
          </div>
          <div class="form-section">
            <label>Status</label>
            <select id="edit-status">
              <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Pendente</option>
              <option value="current" ${data.status === 'current' ? 'selected' : ''}>Em Andamento</option>
              <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Concluído</option>
              <option value="final" ${data.status === 'final' ? 'selected' : ''}>Meta Final</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <label>Responsáveis</label>
          <div id="responsaveis-container">${responsaveisInputs}</div>
          <button type="button" class="btn-add-item" onclick="addResponsavelInput()">
            <i class="fas fa-plus"></i> Adicionar Responsável
          </button>
        </div>

        <div class="form-section">
          <label>Participantes</label>
          <div id="participantes-container">${participantesInputs}</div>
          <button type="button" class="btn-add-item" onclick="addParticipanteInput()">
            <i class="fas fa-plus"></i> Adicionar Participante
          </button>
        </div>

        <div class="form-section">
          <label>Pré-Tarefas</label>
          <div id="tarefas-container">${tarefasInputs}</div>
          <button type="button" class="btn-add-item" onclick="addTarefaInput()">
            <i class="fas fa-plus"></i> Adicionar Tarefa
          </button>
        </div>

        <div class="edit-modal-actions">
          <button type="button" class="btn-secondary" onclick="closeEditModal()">Cancelar</button>
          <button type="submit" class="btn-primary"><i class="fas fa-save"></i> Guardar</button>
        </div>
      </form>
    </div>
  `;
}

// Add input functions
function addResponsavelInput() {
  const container = document.getElementById('responsaveis-container');
  const div = document.createElement('div');
  div.className = 'input-group-row';
  div.innerHTML = `
    <input type="text" placeholder="Nome" class="resp-nome">
    <input type="text" placeholder="Função" class="resp-funcao">
    <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
}

function addParticipanteInput() {
  const container = document.getElementById('participantes-container');
  const div = document.createElement('div');
  div.className = 'input-group-row';
  div.innerHTML = `
    <input type="text" placeholder="Nome" class="part-nome">
    <input type="text" placeholder="Função" class="part-funcao">
    <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
}

function addTarefaInput() {
  const container = document.getElementById('tarefas-container');
  const div = document.createElement('div');
  div.className = 'input-group-row tarefa-row';
  div.innerHTML = `
    <input type="checkbox" class="tarefa-check">
    <input type="text" placeholder="Descrição da tarefa" class="tarefa-texto-input">
    <button type="button" class="btn-remove-item" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
}

function saveEvent(e, eventId) {
  e.preventDefault();

  const isNew = eventId === null;
  let event;

  if (isNew) {
    event = {
      id: Math.max(...unifiedEvents.map(ev => ev.id), 0) + 1
    };
  } else {
    event = unifiedEvents.find(ev => ev.id === eventId);
    if (!event) return;
  }

  // Update basic info
  event.name = document.getElementById('edit-name').value;
  event.date = document.getElementById('edit-date').value;
  event.endDate = document.getElementById('edit-end-date').value || event.date;
  event.time = document.getElementById('edit-time').value;
  event.location = document.getElementById('edit-location').value;
  event.icon = document.getElementById('edit-icon').value || 'fa-calendar';
  event.status = document.getElementById('edit-status').value;

  // Update responsaveis
  event.responsaveis = [];
  document.querySelectorAll('#responsaveis-container .input-group-row').forEach(row => {
    const nome = row.querySelector('.resp-nome').value.trim();
    const funcao = row.querySelector('.resp-funcao').value.trim();
    if (nome) event.responsaveis.push({ nome, funcao });
  });

  // Update participantes
  event.participantes = [];
  document.querySelectorAll('#participantes-container .input-group-row').forEach(row => {
    const nome = row.querySelector('.part-nome').value.trim();
    const funcao = row.querySelector('.part-funcao').value.trim();
    if (nome) event.participantes.push({ nome, funcao });
  });

  // Update tarefas
  event.tarefas = [];
  let tarefaId = 1;
  document.querySelectorAll('#tarefas-container .tarefa-row').forEach(row => {
    const texto = row.querySelector('.tarefa-texto-input').value.trim();
    const concluida = row.querySelector('.tarefa-check').checked;
    if (texto) {
      event.tarefas.push({ id: tarefaId++, texto, concluida });
    }
  });

  if (isNew) {
    unifiedEvents.push(event);
  }

  // Sort by date
  unifiedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  saveEvents();
  closeEditModal();

  // Refresh views
  renderCalendar();
  if (currentMainView === 'roadmap') {
    generateInlineRoadmap();
    updateInlineProgressBar();
  }
  updateStats();

  if (window.notificationSystem) {
    window.notificationSystem.show(isNew ? 'Evento criado com sucesso!' : 'Evento atualizado com sucesso!', 'success');
  }
}

function deleteEvent(eventId) {
  if (!confirm('Tem certeza que deseja eliminar este evento?')) return;

  unifiedEvents = unifiedEvents.filter(e => e.id !== eventId);
  saveEvents();
  closeEventDetailModal();

  // Refresh views
  renderCalendar();
  if (currentMainView === 'roadmap') {
    generateInlineRoadmap();
    updateInlineProgressBar();
  }
  updateStats();

  if (window.notificationSystem) {
    window.notificationSystem.show('Evento eliminado com sucesso!', 'success');
  }
}

function closeEditModal() {
  const modal = document.getElementById('milestone-edit-modal-overlay');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
}

function filterEvents() {
  const statusFilter = document.getElementById('status-filter').value;
  renderCalendar();
}

// ===============================
// GALLERY FUNCTIONALITY
// ===============================

function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      openGalleryModal(img.src, img.alt);
    });
  });
}

function openGalleryModal(src, alt) {
  const modal = document.getElementById('gallery-modal-overlay');
  const modalImg = document.getElementById('gallery-modal-image');

  modalImg.src = src;
  modalImg.alt = alt;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  const modal = document.getElementById('gallery-modal-overlay');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// ===============================
// DASHBOARD FUNCTIONALITY
// ===============================

function initializeDashboard() {
  const dashboardSection = document.getElementById('dashboard');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        createCharts();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(dashboardSection);
}

function createCharts() {
  // Monthly Progress Chart
  const monthlyCtx = document.getElementById('monthlyProgressChart');
  if (monthlyCtx) {
    new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Eventos Concluídos',
          data: getMonthlyCompletedEvents(),
          borderColor: '#00F2FF',
          backgroundColor: 'rgba(0, 242, 255, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#E4E4E7'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#A1A1AA' },
            grid: { color: '#27272A' }
          },
          x: {
            ticks: { color: '#A1A1AA' },
            grid: { color: '#27272A' }
          }
        }
      }
    });
  }

  // Status Chart
  const statusCtx = document.getElementById('statusChart');
  if (statusCtx) {
    const statusCounts = getStatusCounts();
    new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Pendente', 'Em Progresso', 'Concluído'],
        datasets: [{
          data: [statusCounts.pending, statusCounts.current, statusCounts.completed],
          backgroundColor: ['#FACC15', '#00F2FF', '#22C55E'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#E4E4E7', padding: 20 }
          }
        }
      }
    });
  }

  // Workload Chart
  const workloadCtx = document.getElementById('workloadChart');
  if (workloadCtx) {
    const workloadData = getWorkloadData();
    new Chart(workloadCtx, {
      type: 'bar',
      data: {
        labels: workloadData.labels,
        datasets: [{
          label: 'Eventos Atribuídos',
          data: workloadData.data,
          backgroundColor: '#7B68EE',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#E4E4E7' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#A1A1AA' },
            grid: { color: '#27272A' }
          },
          x: {
            ticks: { color: '#A1A1AA' },
            grid: { color: '#27272A' }
          }
        }
      }
    });
  }
}

function getMonthlyCompletedEvents() {
  const monthlyData = new Array(12).fill(0);
  unifiedEvents.forEach(event => {
    if (event.status === 'completed') {
      const month = new Date(event.date).getMonth();
      monthlyData[month]++;
    }
  });
  return monthlyData;
}

function getStatusCounts() {
  return {
    pending: unifiedEvents.filter(e => e.status === 'pending').length,
    current: unifiedEvents.filter(e => e.status === 'current').length,
    completed: unifiedEvents.filter(e => e.status === 'completed').length
  };
}

function getWorkloadData() {
  const responsibleMap = {};
  unifiedEvents.forEach(event => {
    (event.responsaveis || []).forEach(r => {
      responsibleMap[r.nome] = (responsibleMap[r.nome] || 0) + 1;
    });
  });

  return {
    labels: Object.keys(responsibleMap).slice(0, 6),
    data: Object.values(responsibleMap).slice(0, 6)
  };
}

// ===============================
// STATISTICS
// ===============================

function updateStats() {
  const totalEvents = unifiedEvents.length;
  const completedEvents = unifiedEvents.filter(e => e.status === 'completed').length;
  const upcomingEvents = unifiedEvents.filter(e => new Date(e.date) >= new Date()).length;

  document.getElementById('total-events').textContent = totalEvents;
  document.getElementById('completed-events').textContent = completedEvents;
  document.getElementById('upcoming-events').textContent = upcomingEvents;
}

// ===============================
// KEYBOARD SHORTCUTS
// ===============================

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const editModal = document.getElementById('milestone-edit-modal-overlay');
    const eventModal = document.getElementById('roadmap-event-modal-overlay');
    const galleryModal = document.getElementById('gallery-modal-overlay');

    if (editModal && editModal.classList.contains('show')) {
      closeEditModal();
    } else if (eventModal && eventModal.classList.contains('show')) {
      closeEventDetailModal();
    } else if (galleryModal && galleryModal.classList.contains('show')) {
      closeGalleryModal();
    }
  }

  if (event.ctrlKey && event.key === 'n') {
    event.preventDefault();
    openEventModal();
  }
});

// ===============================
// WINDOW RESIZE HANDLER
// ===============================

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (currentMainView === 'roadmap') {
      generateInlineRoadmap();
    }
  }, 250);
});

// ===============================
// CSS ANIMATIONS
// ===============================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
