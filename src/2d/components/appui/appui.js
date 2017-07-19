class ApplicationUI extends HTMLElement {
    static get observedAttributes() { return ['appdata']}

    constructor() {
        super();
        this.template = '   <abeach-page-coursechooser></abeach-page-coursechooser>';
        this.dom = {};
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.courselist = this.querySelector('abeach-page-coursechooser');
        this.dom.courselist.addEventListener(CourseChooserPage.PREVIEW_HOLE, event => this.onPreviewHole(event))
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'appdata') {
            this.data = JSON.parse(newValue);
            this.dom.courselist.setAttribute('holes', JSON.stringify(this.data.places));
        }
    }

    adoptedCallback(oldDocument, newDocument) {}

    onPreviewHole(event) {
        var event = new CustomEvent(CourseChooserPage.PREVIEW_HOLE, event );
        this.dispatchEvent(event);
    }
}

customElements.define('abeach-appui', ApplicationUI);
