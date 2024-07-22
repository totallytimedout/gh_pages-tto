import {projectNavUtil} from '../../modules/projectNavUtil.mjs';
function initProjectNav() {
    const projectNav = new projectNavUtil();
    const projectInstanceElements = document.querySelectorAll('.project[data-project-details]');
    projectInstanceElements.forEach((item) => {
        let project = projectNavUtil.projectFromElement(item);
        projectNav.catalog.items.push(project);
        console.log(`${item} added to projectNav.catalog.items`);
    });
    return projectNav;
}

document.addEventListener('DOMContentLoaded', () => {
    window.projectNav = initProjectNav();
    const projectNav = window.projectNav;
    console.log(projectNav.catalog);
});