class CourseChooserPage extends HTMLElement {
    static get observedAttributes() { return ['holes']}

    constructor() {
        super();
        this.template = '   <abeach-courselist></abeach-courselist> \
                            <button>OK</button>';
        this.dom = {};
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.courselist = this.querySelector('abeach-courselist');
        this.dom.okBtn = this.querySelector('button');
        this.dom.okBtn.addEventListener('click', () => this.onOKButtonClick() );
        this.dom.courselist.addEventListener(CourseList.HOLE_CLICKED, event => this.onHoleClicked(event));
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'holes') {
            this.dom.courselist.setAttribute('holes', newValue);
        }
    }

    adoptedCallback(oldDocument, newDocument) {}

    onOKButtonClick() {
        var event = new CustomEvent('clickok');
        this.dispatchEvent(event);
    }

    onHoleClicked(event) {
        var event = new CustomEvent(CourseChooserPage.PREVIEW_HOLE, event );
        this.dispatchEvent(event);
    }
}

CourseChooserPage.PREVIEW_HOLE = 'previewhole';
customElements.define('abeach-page-coursechooser', CourseChooserPage);
