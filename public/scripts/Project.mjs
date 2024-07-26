import { GlobalProjectStore } from "./GlobalProjectStore.mjs";

export class Project {
    /**
     * @class Project
     * @classdesc A class for creating project objects
     * @export {Project}
     */
    static requiredDetails = ['title', 'description', 'image', 'link', 'tags', 'date', 'label'];
    #details;

    constructor() {
        this.#details = new Map();
    }

    set details(map) {
        if (!map) {
            console.error('Invalid project details. Project details must be a map.');
        } else if (map instanceof Map && Project.requiredDetails.every(key => map.has(key))) {
            this.#details = map;
        } else {
            console.error('Invalid project details. Project details must be a map and must contain the following keys: title, description, image, link, tags, date, label.');
        }
    }

    get details() {
        return this.#details;
    }

    getGlobalStore() {
        return GlobalProjectStore.getStoredProjects();
    }
}


