import { ProjectFactory } from "./ProjectFactory.mjs";

const projectInstanceElements = document.querySelectorAll('.project');
for(const item of projectInstanceElements) {
    let project = ProjectFactory.projectFromElementData(item);
    console.log(project);
}