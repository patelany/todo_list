import {compareAsc, format, parseISO, startOfToday} from "date-fns";
import {clearForm} from "./dom-manip";
import {saveToDoToLocal} from "./manage-local-storage";

//array for todo
let toDoArray = [];

//factory function to create todo list
const createToDo = () => {
    let Title = document.getElementById("Title").value;
    let Description = document.getElementById("Description").value;
    let DueDate = document.getElementById("DueDate").value;
    let Priority = document.getElementById("Priority").value;

    //check to see if empty fields exist 
    if (Title == "" || Description == "" || DueDate == "") {
        alert("Title, Description, and Due Date are required fields");
        return;
    }
    
    //check to see if a pre-date was entered
    if (parseISO(DueDate) < startOfToday()) {
        alert("You have entered a date that has already passed!");
        console.log("due date", parseISO(DueDate));
        console.log("date now", startOfToday());
        return;
    }
  
    //loop over ndoelist for checklist items from dom and format to string 
    const nodeListCheckList = document.querySelectorAll(".form-li");
    let _CheckListArray = [];
    for (let i = 0; i < nodeListCheckList.length; i++) {
        //strip off the "x" from end of each li then push to temp array 
        let strippedCheckList = nodeListCheckList[i].textContent.replace("\u00D7", '');
        _CheckListArray.push(strippedCheckList);
    }

    //strip off checklist array and convert to string with commas
    let CheckList = _CheckListArray.join(", ");

    console.log("Called createToDo module...creating todo now");
    console.log({Title, Description, DueDate, Priority, CheckList});
    console.log("Pushing this object to the toDoArray....");
    //TODO: remove below two lines of code if array is not needed
    toDoArray.push({Title, Description, DueDate, Priority, CheckList});
    console.log(toDoArray);

    //call storage module and push object to local storage
    saveToDoToLocal({Title, Description, DueDate, Priority}, CheckList);

    //reset the form after successful submission 
    clearForm();

    return {Title, Description, DueDate, Priority}, CheckList;
}

export {createToDo};