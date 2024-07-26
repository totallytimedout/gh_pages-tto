import { GlobalProjectStore } from "./GlobalProjectStore.mjs";
import { Project } from "./Project.mjs";

/**
 * @class ProjectFactory
 * @classdesc A class for producing project instances from different modes of data inputs
 * @exports ProjectFactory
 */

export class ProjectFactory {
    /**
     * @static
     * @method projectFromElementData
     * @param {HTMLElement} element - An HTML element containing project data
     * @example
     * // Assuming the Element contains any of the following data attributes
     * // data-title="Project Title"
     * // data-description="Project Description"
     * // data-image="Project Image"
     * // data-link="Project Link"
     * // data-tags="Project Tags"
     * // data-date="Project Date"
     * // data-label="Project Label"
     * // or data-project="Project JSON"
     */
    static projectFromElementData(element) {
        const project = new Project();
        const details = new Map();
        details.set('title', element.dataset.title);
        details.set('description', element.dataset.description);
        details.set('image', element.dataset.image);
        details.set('link', element.dataset.link);
        details.set('tags', element.dataset.tags.split(','));
        details.set('date', element.dataset.date);
        details.set('label', element.dataset.label);
        project.details = details;
        const store = new GlobalProjectStore();
        store.addProject(project);
        return project;
    }

    /**
     * @returns {GlobalProjectStore} The global project store
     * @description A method for accessing the global project store
     * @example
     * ProjectFactory.GlobalStore
     * //=> Set(1) {Project}
     */
    static getGlobalStore() {
        return new GlobalProjectStore().getStoredProjects();
    }
}
