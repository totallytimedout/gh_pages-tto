import { Project } from "./Project.mjs";

export class GlobalProjectStore {
    /**
     * @classdesc A class for storing project instances across the workspace
     * @extends Set
     * @returns {GlobalProjectStore} An instance of GlobalProjectStore
     * @hideconstructor
     * @description A singleton class for managing stored project instances across the workspace
     */
    static #instance;

    constructor() {
        if (GlobalProjectStore.#instance) {
            return GlobalProjectStore.#instance;
        }
        this.storedProjects = [];
        GlobalProjectStore.#instance = this;
    }

    content() {
        return Array.from(this.storedProjects);
    }

    addProject(project) {
        if (project instanceof Project) {
            this.storedProjects.push(project);
        } else {
            console.error('Invalid project. Project must be an instance of Project class.');
        }
    }

    removeProject(project) {
        if (project instanceof Project) {
            const index = this.storedProjects.indexOf(project);
            if (index > -1) {
                this.storedProjects.splice(index, 1);
            }
        } else {
            console.error('Invalid project. Project must be an instance of Project class.');
        }
    }

    getProjectById(id) {
        return this.storedProjects.filter(project => project.details.get('id') === id);
    }

    getProjectsByTag(tag) {
        return this.storedProjects.filter(project => project.details.get('tags').includes(tag));
    }

    clearProjects() {
        this.storedProjects = [];
    }

    getStoredProjects() {
        return this.storedProjects;
    }
}
