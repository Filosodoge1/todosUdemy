import { Todo } from "../todos/models/todo.models";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore =)');
}

const loadStore = () => {
    // throw new Error('not implemented');
    if (!localStorage.getItem('state')) return;

    // console.log(localStorage.getItem('state'));

    //con desestructuracion
    const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;

    //sin desestructuracion
    // const todosFilters = JSON.parse(localStorage.getItem('state'));
    // todosFilters.todo = [];
    // todosFilters.Filters = Filters.All;
    // state.todos = todosFilters.todos;
    // state.filter = todosFilters.Filters;
}

const getTodos = ( filter = Filters.All ) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];
    
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${filter} is not value.`);
    }

}

const saveStatetoLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('descripcion is required');

    state.todos.push( new Todo(description));

    saveStatetoLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    // throw new Error('not implemented');
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) todo.done = !todo.done;

        return todo;
    } );
    saveStatetoLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    // throw new Error('not implemented');
    state.todos = state.todos.filter( todo => todo.id !== todoId );

    saveStatetoLocalStorage();
}

const deleteCompleted = () => {
    // throw new Error('not implemented');
    state.todos = state.todos.filter( todo => !todo.done );
    saveStatetoLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter Si no se ingresa, se inserta por default "All" 
 */
const setFilter = ( newFilter = Filters.All ) => {
    // throw new Error('not implemented');
    state.filter = newFilter;
    saveStatetoLocalStorage();
}

const getCurrentFilter = () => {
    // throw new Error('not implemented');
    return state.filter;
}

export default {
    initStore,
    loadStore,
    addTodo,
    getTodos,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}