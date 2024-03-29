import {projectLoad} from "./project-load";

//DOM manipulation to display the UI components
function displayDefaultProject() {
    //dom for default project load
    const projectsInfoDiv = document.createElement("div");
    projectsInfoDiv.textContent = projectLoad().projectTitle;
    contentDiv.appendChild(projectsInfoDiv);
}

function displayForm() {
    document.getElementById("add-todo-form").style.display = "";
} 

function addItemToCheckList() {
    const addItem = document.getElementById("add-to-checklist").value;

    //run check to see if the input box is empty and button was clicked 
    //if so, return out of this function gracefully do nothing 
    //if not, apply contents to new li in DOM 
    if (addItem !== "") {
        const ul = document.querySelector(".todo-ul");
        const li = document.createElement("li");
        li.className = "form-li";
        li.textContent = addItem; 
        const span = document.createElement("span");
        span.className = "remove-checklist-item";
        const removeIcon = document.createTextNode("\u00D7");
        li.appendChild(span);
        span.appendChild(removeIcon);
        ul.appendChild(li);
        document.getElementById("add-to-checklist").value = "";

        //DOM check for existing check list items already present
        if(document.querySelectorAll(".form-li").length > 0) {
            console.log("inside module if..", document.querySelectorAll(".form-li").length);
            const nodeListCheckList = document.querySelectorAll(".form-li");
            console.log(nodeListCheckList);

            //DOM to bind click event to each node in nodelist and remove node if clicked
            nodeListCheckList.forEach(checkListItem => {
                checkListItem.addEventListener("click", function removeItemFromChecklist() {
                    checkListItem.remove();
                });
            })
        }
    } else return;
}

function clearForm() {
    const nodeListCheckList = document.querySelectorAll(".form-li");
    for (let i = 0; i < nodeListCheckList.length; i++) {
        nodeListCheckList[i].remove();
    }
    document.getElementById("add-todo").reset();
}

function displayToDo() {

    //gather data from local backend storage and initialize
    let Title = localStorage.getItem("Title");
    let Description = localStorage.getItem("Description");
    let DueDate = localStorage.getItem("DueDate");
    let Priority = localStorage.getItem("Priority");
    let CheckList = localStorage.getItem("CheckList");

    // check to ensure local storage is present to load, otherwise return out -avoid crash
    if (Title == null || Description == null || DueDate == null || Priority == null) {
        return;
    }

    //check and clear current display DOM, if any 
    const removeDivs = document.querySelectorAll(".card");
    for (let i = 0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    }

    //create the display card for the display DOM
    console.log("display to screen");
    const projects = document.querySelector(".projects");
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);

    //create delete todo card button/event listener to remove card from display
    const deleteToDoButton = document.createElement("button");
    deleteToDoButton.classList.add("remove-todo-button");
    deleteToDoButton.textContent = "Delete/Complete ToDo";
    card.appendChild(deleteToDoButton);
    deleteToDoButton.addEventListener("click", function deleteToDo() {
        card.remove();
        localStorage.clear();
    });

    //place data in local temp array and loop over key/value pairs and display to DOM 
    let _displayArray = {Title, Description, DueDate, Priority, CheckList};
    console.log(_displayArray);

    for (let key in _displayArray) {
        console.log(`${key}: ${_displayArray[key]}`);
        const para = document.createElement("p");
        para.textContent = (`${key}: ${_displayArray[key]}`);
        card.appendChild(para);
    }

    //dom for checklist items to present to right side display area
    const para = document.querySelectorAll("p");
    const CheckListLabel = document.createElement("p");
    CheckListLabel.textContent = "CheckList Items (Click item once completed):";
    const ul = document.createElement("ul");
    CheckListLabel.classList.add("check-list-label");
    para[para.length - 1].appendChild(ul);
    ul.appendChild(CheckListLabel);

    console.log("show me the contents of checklist from local storage...", CheckList);
    let _checkListArray = CheckList.split(",");
    console.log("contents of temp checklistarray...", _checkListArray);

    if (CheckList !== "") {
        //loop through the temp checklist array to create an li and display to DOM for each 
        for (let i = 0; i < _checkListArray.length; i++) {
            console.log(_checkListArray[i]);
            const li = document.createElement("li");
            li.className = "display-li";
            li.textContent = _checkListArray[i];

            //add listener onto each li and toggle css class to strike through text on display 
            li.addEventListener("click", function strikeOutCheckListItem() {
                if (li.classList.toggle("done")) {
                    localStorage.setItem(li.textContent, "true");
                } else if (li.classList.toggle("display-li")){
                    localStorage.setItem(li.textContent, "false");
                }
            });
            
            ul.appendChild(li);
        }
    } else return;

    //call on page refresh to check for existing strike throughs
    window.onload = function() {
        //loop through current display li's on DOM and assign strike through css if local storage API flag is set 
        const liNodes = document.querySelectorAll(".display-li");
        liNodes.forEach(liNode => {
            if (localStorage.getItem(liNode.textContent) == "true") {
                console.log("inside the onload if....");
                liNode.className = "done";
            }
        })
    }
}

export {displayDefaultProject, displayForm, addItemToCheckList, clearForm, displayToDo};