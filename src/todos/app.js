import todosStore, { Filters } from "../store/todos.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./use-cases";

const elementsId = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count'
}

const elementsClass = {
    TodoList: '.todo-list',
    FiltersLI: '.filtro',
    ClearCompleted: '.clear-completed',
    DestroyElement: '.destroy'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todosStore.getTodos( todosStore.getCurrentFilter() );
        renderTodos(elementsClass.TodoList, todos);
        updatePendingCounting();
    }

    const updatePendingCounting = () => {
        renderPending(elementsId.PendingCountLabel);
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementsId.NewTodoInput);
    const todoListUL = document.querySelector(elementsClass.TodoList);
    const destroyElement = document.querySelector(elementsClass.TodoList);
    const ClearCompletedButton = document.querySelector(elementsClass.ClearCompleted);
    const FiltrosLI = document.querySelectorAll(elementsClass.FiltersLI);

    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        
        if (event.keyCode !== 13) return ;
        if (event.target.value.trim().length === 0 ) return;

        todosStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todosStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    // todoListUL.addEventListener('click', (event) => {
    //     const isDestroy = event.target.className === 'destroy';
    //     const element = event.target.closest('[data-id]');
    //     if( !element || !isDestroy ) return;
    //     todosStore.deleteTodo(element.getAttribute('data-id'));
    //     displayTodos();
    // });
    destroyElement.addEventListener('click', (event) => {
        
        const isDestroy = event.target.className === 'destroy';
        
        const element = event.target.closest('[data-id]');

        if( !element || !isDestroy ) return;

        todosStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    ClearCompletedButton.addEventListener('click', (event) => {
        
        todosStore.deleteCompleted();
        displayTodos();
    }); 

    FiltrosLI.forEach( element => {
        element.addEventListener('click', ( element => {
            FiltrosLI.forEach( ele => ele.classList.remove('selected'));
            element.target.classList.add('selected');
            console.log('imbecil: ', element.target.text);
            switch (element.target.text) {
                case 'Todos':
                    todosStore.setFilter( Filters.All );
                    break;
            
                case 'Completados':
                    todosStore.setFilter( Filters.Completed );
                    break;
                
                case 'Pendientes':
                    todosStore.setFilter( Filters.Pending );
                    break;
            }
            displayTodos();
        }));
    });
}