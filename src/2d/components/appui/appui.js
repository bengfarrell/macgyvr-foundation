class ApplicationUI extends HTMLElement {
    static get observedAttributes() { return ['appdata']}

    constructor() {
        super();
        this.template = '   <abeach-page-coursechooser></abeach-page-coursechooser>';
        this.dom = {};
    }

    set data(value) {
        this._data = value;
        if (this.dom.coursechooserpage) {
            this.dom.coursechooserpage.data = this._data.places;
        }
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.coursechooserpage = this.querySelector('abeach-page-coursechooser');
        this.dom.coursechooserpage.addEventListener(CourseChooserPage.PREVIEW_HOLE, event => this.onPreviewHole(event));
        this.dom.coursechooserpage.addEventListener(CourseList.COURSE_UPDATE, event => this.onCourseUpdate(event));
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {}

    adoptedCallback(oldDocument, newDocument) {}

    onPreviewHole(e) {
        let event = new CustomEvent(ApplicationUI.PREVIEW_HOLE, { detail: e.detail });
        this.dispatchEvent(event);
    }

    onCourseUpdate(e) {
        let event = new CustomEvent(ApplicationUI.COURSE_UPDATE, { detail: e.detail });
        this.dispatchEvent(event);
    }
}

ApplicationUI.PREVIEW_HOLE = 'holeclicked';
ApplicationUI.COURSE_UPDATE = 'courseupdate';
customElements.define('abeach-appui', ApplicationUI);
