

const ApiService = {
    
    API_URL: 'https://jsonplaceholder.typicode.com/todos?_limit=6',

    fetchInitialTodos: async () => {
        try {
            const response = await fetch(ApiService.API_URL);

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status} (${response.statusText})`);
            }

            const rawTodos = await response.json();

            const priorities = ['low', 'medium', 'high'];
            
            return rawTodos.map((todo, index) => ({
                id: `api-${todo.id}-${Date.now()}`, 
                title: todo.title,
                description: `Tâche importée automatiquement de l'API (ID: ${todo.id}).`,
                
                priority: priorities[index % 3], 
                status: 'todo' 
            }));

        } catch (error) {
            console.error("Erreur détectée dans ApiService.fetchInitialTodos :", error);
            
            throw new Error("Impossible de se connecter au serveur pour charger les tâches.");
        }
    }
};
