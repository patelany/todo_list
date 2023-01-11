import { createToDo } from "./create-to-do";
import { projectLoad } from "./project-load";
import { displayDefaultProject, displayForm, addItemToCheckList, clearForm, displayToDo } from "./dom-manip";


//call projectLoad on first land
projectLoad();

//call DOM manipulation module to load default project
//displayDefaultProject();

displayToDo();

//click events module
let clickEventsModule = (function() {
    //click event for displaying the form 
    const addNewToDo = document.querySelector(".add-todo-button");
    addNewToDo.addEventListener("click", displayForm);

    //click event for adding an item to the checklist on the form 
    const addToChecklist = document.querySelector(".add-to-checklist");
    addToChecklist.addEventListener("click", addItemToCheckList);

    //click event to clear form 
    const clearButton = document.querySelector(".reset-button");
    clearButton.addEventListener("click", clearForm);

    //click event to submit a new todo form to project
    const submitButton = document.querySelector(".submit-button");
    submitButton.addEventListener("click", createToDo);
})();

