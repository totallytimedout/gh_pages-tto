/**
 * @author Caleb Hess
 * @version 1.0
 * @description A utility class for managing project navigation and cataloging
 */

/**
 * @class projectNavUtil
 * @classdesc A utility class for managing project navigation and cataloging
 * @requires Project
 * @exports projectNavUtil
 */
export class projectNavUtil {
  /**
   * @private
   * @property {object} catalog - An object containing an array of project items and methods for navigating the catalog
   *
   * @property {Array} catalog.items - An array of cataloged project items
   * @property {Number} catalog.current - The current project index
   * @property {Function} catalog.next - A function that returns the next project index
   * @property {Function} catalog.prev - A function that returns the previous project index
   * @property {Function} catalog.currentProject - A function that returns the current project object
   * @property {Function} catalog.find - A function that returns the project object with the detail requested
   */
  catalog = {
    items: [], // array of cataloged project items
    current: 0, // current project index
    next: () => {
      (this.catalog.current + 1) % this.catalog.items.length;
    },
    prev: () => {
      (this.catalog.current - 1) % this.catalog.items.length;
    },
    currentProject: () => {
      return this.catalog.items[this.catalog.current];
    },
    find: (detail) => {
      return this.catalog.items.find((item) => item.details[detail]);
    },
  };

  get catalog() {
    return [this.catalog || []];
  }

  set catalog(array) {
    if (Array.isArray(array)) {
      array.forEach((item) => {
        if (item instanceof Project) {
          this.catalog.items.push(item);
        } else {
          console.error(
            `Invalid project object @ ${item}. Project objects must be instances of the project class.`
          );
        }
      });
    }
  }
}

/**
 * @class Project
 * @classdesc A class for creating project objects
 * @exports Project
 * 
 */
/**
 * Represents a project.
 */
export class Project {
  /**
   * @private - An array of project details for validation of parameters
   * @type {string[]}
   */
  #PROJ_DETAILS = ["label", "title", "description", "url", "img", "tags"];

  /**
   * @private - A counter for generating unique project labels per instance
   * @type {number}
   */
  #projectCounter = 0;

  /**
   * Creates a new Project object from the provided element if it has the required data attributes.
   * @method projectFromElement
   * @param {HTMLElement} element - The element containing the project details
   * @returns {Project} - A new Project object
   */
  static projectFromElement(element) {
    if (
      element instanceof HTMLElement &&
      element.hasAttribute("data-project-details")
    ) {
      let details = JSON.parse(element.getAttribute("data-project-details"));
      if (!details.img && element.innerHTML.contains("<img")) {
        let img = element.querySelector("img");
        details.img = img.src;
      }
      return new Project(
        details.label,
        details.title,
        details.description,
        details.url,
        details.img,
        details.tags
      );
    }
  }

  /**
   * Creates a new Project object instance.
   * @constructor
   * @param {String} label - A unique identifier for the project
   * @param {String} title - The title of the project
   * @param {String} description - A brief description of the project
   * @param {String} url - The URL of the project
   * @param {String} img - The URL of the project image
   * @param {Array} tags - An array of tags for the project
   * @returns {Project} - A new Project object instance
   */
  constructor(label, title, description, url, img, tags) {
    this.label = [label || `new-project${this.#projectCounter}`];
    this.details = {
      label: [label || `new-project${this.#projectCounter}`],
      title: [title || `new-project${this.#projectCounter}`],
      description: [description || null],
      url: [url || null],
      img: [img || null],
      tags: [tags || null],
      id: this.#projectCounter++,
    };
  }

  /**
   * Gets the project details.
   * @returns {Object} - The project details object
   */
  get info() {
    return this.details;
  }

  /**
   * Gets the value of the requested detail from the project details object.
   * @param {String} detail - The detail to retrieve
   * @returns {*} - The value of the requested detail
   */
  getDetail(detail) {
    if (this.#PROJ_DETAILS.includes(detail)) {
      return this.details[detail];
    }
  }

  /**
   * Gets a JSON string representation of the project details object.
   * @returns {string} - The JSON string of the project details
   */
  getDetailsJSON() {
    return JSON.stringify(this.details);
  }

  /**
   * Sets the value of the specified detail in the project details object.
   * @param {String} detail - The detail to set
   * @param {*} value - The value to set for the detail
   */
  setDetail(detail, value) {
    if (
      (this.#PROJ_DETAILS.includes(detail) && typeof value === "string") ||
      Array.isArray(value) && value.every(item => typeof item === "string")
    ) {
      this.details[detail] = value;
    }
  }
}