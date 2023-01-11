//factory function to create blank project array list 
function projectLoad() {
    console.log("Called projectLoad module. creating project array now");
    let projectsArray = [];
    console.log("Pushing title name of project to projectsArray");
    let projectTitle = "Default Project";
    projectsArray.push({ projectTitle });
    console.log(projectsArray);
    return { projectsArray, projectTitle };
}

export {projectLoad};
