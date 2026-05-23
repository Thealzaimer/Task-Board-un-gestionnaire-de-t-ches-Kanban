

const state = {
    tasks: [],        
    searchQuery: ''   
};

const initApp = async () => {
    
    const actionsCount = StorageService.getSessionActionsCount();
    DomService.updateSessionCountDisplay(actionsCount);

    const savedTasks = StorageService.loadBoardState();

    if (savedTasks && savedTasks.length > 0) {
        
        state.tasks = savedTasks;
        DomService.renderBoard(state.tasks);
    } else {
        
        await loadFromApi();
    }
};

const loadFromApi = async () => {
    try {
        DomService.hideErrorMessage(); 

        const apiTasks = await ApiService.fetchInitialTodos();
        state.tasks = apiTasks;

        StorageService.saveBoardState(state.tasks);
        DomService.renderBoard(state.tasks);
    } catch (error) {
        
        DomService.displayErrorMessage(error.message);
        
        state.tasks = [];
        DomService.renderBoard(state.tasks);
    }
};

const setupEventListeners = () => {

    DomService.elements.form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const taskData = DomService.validateAndGetFormData();

        if (taskData) {
            
            const newTask = {
                id: `task-${Date.now()}`,
                title: taskData.title,
                description: taskData.description,
                priority: taskData.priority,
                status: 'todo' 
            };

            state.tasks.push(newTask);

            StorageService.saveBoardState(state.tasks);

            const newCount = StorageService.incrementSessionActions();
            DomService.updateSessionCountDisplay(newCount);

            DomService.renderBoard(state.tasks, state.searchQuery);

            DomService.resetForm();
        }
    });

    DomService.elements.searchInput.addEventListener('input', (event) => {
        state.searchQuery = event.target.value;
        DomService.renderBoard(state.tasks, state.searchQuery);
    });

    const boardContainer = document.querySelector('.kanban-board');
    if (boardContainer) {
        boardContainer.addEventListener('click', (event) => {
            
            const actionBtn = event.target.closest('button[data-action]');
            if (!actionBtn) return; 

            const cardElement = actionBtn.closest('.task-card');
            if (!cardElement) return;

            const taskId = cardElement.dataset.id;
            const action = actionBtn.dataset.action;

            if (action === 'move') {
                handleMoveTask(taskId);
            } else if (action === 'delete') {
                handleDeleteTask(taskId, cardElement);
            }
        });
    }

    const resetBtn = document.getElementById('reset-board-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
            
            StorageService.clearBoardState();

            DomService.elements.searchInput.value = '';
            state.searchQuery = '';

            await loadFromApi();
        });
    }

    if (DomService.elements.closeErrorBtn) {
        DomService.elements.closeErrorBtn.addEventListener('click', () => {
            DomService.hideErrorMessage();
        });
    }
};

const handleMoveTask = (taskId) => {
    
    const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = state.tasks[taskIndex];

    if (task.status === 'todo') {
        task.status = 'progress';
    } else if (task.status === 'progress') {
        task.status = 'done';
    } else {
        return; 
    }

    StorageService.saveBoardState(state.tasks);

    const newCount = StorageService.incrementSessionActions();
    DomService.updateSessionCountDisplay(newCount);

    DomService.renderBoard(state.tasks, state.searchQuery);
};

const handleDeleteTask = (taskId, cardElement) => {
    
    cardElement.classList.add('fade-out');

    setTimeout(() => {
        
        state.tasks = state.tasks.filter(t => t.id !== taskId);

        StorageService.saveBoardState(state.tasks);

        const newCount = StorageService.incrementSessionActions();
        DomService.updateSessionCountDisplay(newCount);

        DomService.renderBoard(state.tasks, state.searchQuery);
    }, 250);
};

document.addEventListener('DOMContentLoaded', () => {
    
    setupEventListeners();

    initApp();
});
