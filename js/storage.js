

const StorageService = {
    
    KEYS: {
        TASKS: 'task_board_tasks',
        SESSION_ACTIONS: 'task_board_actions_count'
    },

    saveBoardState: (tasks) => {
        try {
            localStorage.setItem(StorageService.KEYS.TASKS, JSON.stringify(tasks));
        } catch (error) {
            console.error("Erreur lors de la sauvegarde dans le localStorage :", error);
        }
    },

    loadBoardState: () => {
        try {
            const rawTasks = localStorage.getItem(StorageService.KEYS.TASKS);
            return rawTasks ? JSON.parse(rawTasks) : null;
        } catch (error) {
            console.error("Erreur lors du chargement depuis le localStorage :", error);
            return null;
        }
    },

    clearBoardState: () => {
        try {
            localStorage.removeItem(StorageService.KEYS.TASKS);
        } catch (error) {
            console.error("Erreur lors de la suppression du localStorage :", error);
        }
    },

    getSessionActionsCount: () => {
        try {
            const count = sessionStorage.getItem(StorageService.KEYS.SESSION_ACTIONS);
            return count ? parseInt(count, 10) : 0;
        } catch (error) {
            console.error("Erreur lors de la lecture du sessionStorage :", error);
            return 0;
        }
    },

    incrementSessionActions: () => {
        try {
            const currentCount = StorageService.getSessionActionsCount();
            const newCount = currentCount + 1;
            sessionStorage.setItem(StorageService.KEYS.SESSION_ACTIONS, newCount.toString());
            return newCount;
        } catch (error) {
            console.error("Erreur lors de l'incrémentation dans le sessionStorage :", error);
            return 0;
        }
    },

    resetSessionActions: () => {
        try {
            sessionStorage.setItem(StorageService.KEYS.SESSION_ACTIONS, '0');
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du sessionStorage :", error);
        }
    }
};
