

const DomService = {
    
    elements: {
        form: document.getElementById('task-form'),
        titleInput: document.getElementById('task-title'),
        descInput: document.getElementById('task-desc'),
        prioritySelect: document.getElementById('task-priority'),

        cardsTodo: document.getElementById('cards-todo'),
        cardsProgress: document.getElementById('cards-progress'),
        cardsDone: document.getElementById('cards-done'),

        countTodo: document.getElementById('count-todo'),
        countProgress: document.getElementById('count-progress'),
        countDone: document.getElementById('count-done'),

        searchInput: document.getElementById('search-input'),

        errorBanner: document.getElementById('error-banner'),
        errorMessage: document.getElementById('error-message'),
        closeErrorBtn: document.getElementById('close-error-btn'),

        sessionCount: document.getElementById('session-count')
    },

    createTaskCardElement: (task) => {
        const { id, title, description, priority, status } = task;

        const card = document.createElement('div');
        card.className = 'task-card';
        card.dataset.id = id;
        card.dataset.priority = priority; 

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const cardTitle = document.createElement('h4');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;

        const priorityLabelMap = {
            low: 'Basse',
            medium: 'Moyenne',
            high: 'Haute'
        };
        const priorityBadge = document.createElement('span');
        priorityBadge.className = 'priority-badge';
        priorityBadge.textContent = priorityLabelMap[priority] || priority;

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(priorityBadge);

        const cardDesc = document.createElement('p');
        cardDesc.className = 'card-description';
        cardDesc.textContent = description;

        const cardActions = document.createElement('div');
        cardActions.className = 'card-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Supprimer cette tâche';
        deleteBtn.setAttribute('aria-label', 'Supprimer');
        deleteBtn.dataset.action = 'delete';

        cardActions.appendChild(deleteBtn);

        if (status !== 'done') {
            const moveBtn = document.createElement('button');
            moveBtn.className = 'btn-move';
            moveBtn.innerHTML = '<span>Suivant</span> <span>&rarr;</span>';
            moveBtn.title = 'Déplacer vers la colonne suivante';
            moveBtn.dataset.action = 'move';
            
            cardActions.appendChild(moveBtn);
        }

        card.appendChild(cardHeader);
        card.appendChild(cardDesc);
        card.appendChild(cardActions);

        return card;
    },

    renderBoard: (tasks, searchQuery = '') => {
        
        DomService.elements.cardsTodo.innerHTML = '';
        DomService.elements.cardsProgress.innerHTML = '';
        DomService.elements.cardsDone.innerHTML = '';

        const cleanQuery = searchQuery.trim().toLowerCase();
        const filteredTasks = tasks.filter(task => {
            if (!cleanQuery) return true;
            return task.title.toLowerCase().includes(cleanQuery) || 
                   task.description.toLowerCase().includes(cleanQuery);
        });

        filteredTasks.forEach(task => {
            const cardElement = DomService.createTaskCardElement(task);
            
            if (task.status === 'todo') {
                DomService.elements.cardsTodo.appendChild(cardElement);
            } else if (task.status === 'progress') {
                DomService.elements.cardsProgress.appendChild(cardElement);
            } else if (task.status === 'done') {
                DomService.elements.cardsDone.appendChild(cardElement);
            }
        });

        DomService.updateCounters(tasks);
    },

    updateCounters: (tasks) => {
        
        const todoCount = tasks.filter(t => t.status === 'todo').length;
        const progressCount = tasks.filter(t => t.status === 'progress').length;
        const doneCount = tasks.filter(t => t.status === 'done').length;

        DomService.elements.countTodo.textContent = todoCount;
        DomService.elements.countProgress.textContent = progressCount;
        DomService.elements.countDone.textContent = doneCount;

        const toggleBadgeState = (badge, count) => {
            if (count > 0) {
                badge.classList.add('has-items');
            } else {
                badge.classList.remove('has-items');
            }
        };

        toggleBadgeState(DomService.elements.countTodo, todoCount);
        toggleBadgeState(DomService.elements.countProgress, progressCount);
        toggleBadgeState(DomService.elements.countDone, doneCount);
    },

    validateAndGetFormData: () => {
        let isValid = true;

        const titleVal = DomService.elements.titleInput.value.trim();
        const descVal = DomService.elements.descInput.value.trim();
        const priorityVal = DomService.elements.prioritySelect.value;

        const titleGroup = DomService.elements.titleInput.closest('.form-group');
        if (!titleVal || titleVal.length > 50) {
            titleGroup.classList.add('invalid');
            isValid = false;
        } else {
            titleGroup.classList.remove('invalid');
        }

        const descGroup = DomService.elements.descInput.closest('.form-group');
        if (!descVal || descVal.length > 200) {
            descGroup.classList.add('invalid');
            isValid = false;
        } else {
            descGroup.classList.remove('invalid');
        }

        const priorityGroup = DomService.elements.prioritySelect.closest('.form-group');
        if (!priorityVal) {
            priorityGroup.classList.add('invalid');
            isValid = false;
        } else {
            priorityGroup.classList.remove('invalid');
        }

        if (isValid) {
            return {
                title: titleVal,
                description: descVal,
                priority: priorityVal
            };
        }
        return null;
    },

    resetForm: () => {
        DomService.elements.form.reset();

        const groups = DomService.elements.form.querySelectorAll('.form-group');
        groups.forEach(group => group.classList.remove('invalid'));
    },

    displayErrorMessage: (message) => {
        DomService.elements.errorMessage.textContent = message;
        DomService.elements.errorBanner.classList.remove('hidden');
    },

    hideErrorMessage: () => {
        DomService.elements.errorBanner.classList.add('hidden');
    },

    updateSessionCountDisplay: (count) => {
        DomService.elements.sessionCount.textContent = count;
    }
};
