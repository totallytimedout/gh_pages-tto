import {projectNav} from '../../modules/projectNavUtil.mjs';
function initProjectNav() {
   
    const projectInstanceElements = document.querySelectorAll('.project[data-project-details]');
    projectInstanceElements.forEach((item) => {
        let project = Project.projectFromElement(item);
        projectNav.catalog.items.push(project);
        console.log(`${item} added to projectNav.catalog.items`);
    });
    return projectNav;
}

document.addEventListener('DOMContentLoaded', () => {
  
});