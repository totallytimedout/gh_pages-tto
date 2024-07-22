export class projectNavUtil {

    #catalog = {
        items: [], // array of cataloged project items
        current: 0, // current project index
        next: () => { (this.#catalog.current + 1) % this.#catalog.items.length },
        prev: () => { (this.#catalog.current - 1) % this.#catalog.items.length },
        currentProject: () => { return this.#catalog.items[this.#catalog.current] },
        find: (detail) => { return this.#catalog.items.find((item) => item.details[detail] ) },
    }
    constructor() { throw new Error('This class is not meant to be instantiated.'); };

    get catalog() {
        return [this.#catalog || [],
        ];
    }
    set catalog(array) {
        if (Array.isArray(array)) {
            array.forEach((item) => {
                if (item instanceof Project) {
                    this.#catalog.items.push(item);
                } else {
                    console.error(`Invalid project object @ ${item}. Project objects must be instances of the project class.`);
                }
            });
        }
    }
}
const PROJ_DETAILS = ['label', 'title', 'description', 'url', 'img', 'tags'];
export class Project {

    #projectCounter = 0;
    static projectFromElement(element) {
        if (element instanceof HTMLElement && element.hasAttribute('data-project-details')) {
            let details = JSON.parse(element.getAttribute('data-project-details'));
            if (!details.img && element.innerHTML.contains("<img")) { let img = element.querySelector('img'); details.img = img.src; }
            return new project(details.label, details.title, details.description, details.url, details.img, details.tags);
        };
    }
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
        }

    }
    get info() {
        return this.details

    }
    getDetail(detail) {
        if (PROJ_DETAILS.includes(detail)) {
            return this.details[detail];
        }
    }
    getDetailsJSON() {
        return JSON.stringify(this.details);
    }
    setDetail(detail, value) {
        if (PROJ_DETAILS.includes(detail) && value instanceof String || value instanceof [String]) {
            this.details[detail] = value;
        }
    }
}