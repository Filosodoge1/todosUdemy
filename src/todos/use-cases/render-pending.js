import todosStore, { Filters } from "../../store/todos.store";

let element;


export const renderPending = ( elementId ) => {
    if ( !element ) {
        element = document.querySelector( elementId );
    }
    if ( !element) {
        throw new Error(`Element ${ elementId } not found`);
    }

    element.innerHTML = todosStore.getTodos( Filters.Pending ).length;
}