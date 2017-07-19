class CourseList extends HTMLElement {
    static get observedAttributes() {return ['holes']; }

    constructor() {
        super();
        this.template = '<ul></ul>';
        this.dom = {};
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.list = this.querySelector('ul');
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'holes') {
            this.data = JSON.parse(newValue);
            this.populateList(this.data);
        }
    }
    adoptedCallback(oldDocument, newDocument) {}

    /**
     * populate list with hole descriptions
     * @param holes
     */
    populateList(holes) {
        this.dom.list.innerHTML = '';
        for (let c = 0; c < holes.length; c++) {
            let item = document.createElement('li');
            item.dataset.id = holes[c].id;
            item.innerHTML = holes[c].name + ' ~ ' + holes[c].distance + 'km';
            this.dom.list.appendChild(item);
            item.addEventListener('click', item => this.onHoleClicked(item));
        }
    }

    onHoleClicked(item) {
        let id = item.target.dataset.id;
        var event = new CustomEvent(CourseList.HOLE_CLICKED, { 'detail': { id : id } });
        this.dispatchEvent(event);
    }
}
CourseList.HOLE_CLICKED = 'holeclicked';
customElements.define('abeach-courselist', CourseList);
