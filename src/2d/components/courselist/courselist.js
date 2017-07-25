class CourseList extends HTMLElement {
    static get observedAttributes() {return ['holes', 'maxholes']; }

    constructor() {
        super();
        this.template = '<ul></ul>';
        this.dom = {};
        this.maxHoles = 9;
    }

    set data(value) {
        this._data = value;
        this.populateList(this._data);
    }

    itemTemplate(id, index, name, distance, par) {
        return `<span class="index">${index+1}</span>
                <span class="name">${name}</span>
                <span class="rating par${par}">${par}</span>
                <span class="distance text-light">${distance}m</span>
                <button data-id="${id}" class="beach-button remove">x</button>`;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.list = this.querySelector('ul');

        if (this.getAttribute('maxholes')) {
            this.maxHoles = this.getAttribute('maxholes');
        }
        this.populateList(this._data);
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'maxholes') {
            this.maxHoles = newValue;
            this.populateList(this._data);
        }
    }

    adoptedCallback(oldDocument, newDocument) {}

    /**
     * populate list with hole descriptions
     * @param holes
     */
    populateList(holes) {
        if (!this.dom.list) { return; }
        if (!holes) { return; }

        this.dom.list.innerHTML = '';
        for (let c = 0; c < holes.length; c++) {
            let item = document.createElement('li');
            if (c >= this.maxHoles) {
                item.classList.add('disabled');
            }

            item.innerHTML = this.itemTemplate(holes[c].id, c, holes[c].name, holes[c].distance, holes[c].par);
            item.dataset.id = holes[c].id;
            this.dom.list.appendChild(item);
            let btn = item.querySelector('.remove');
            btn.addEventListener('click', e => this.onRemoveClicked(e));
            item.addEventListener('click', item => this.onHoleClicked(item));
        }
    }

    onRemoveClicked(e) {
        this._data = this._data.filter( function(item) {
            return item.id !== e.currentTarget.dataset.id;
        });
        var event = new CustomEvent(CourseList.COURSE_UPDATE, { 'detail': { course: this._data } });
        this.dispatchEvent(event);
    }

    onHoleClicked(item) {
        if (item.target.classList.contains('remove')) {
            return;
        }
        let id = item.currentTarget.dataset.id;
        var event = new CustomEvent(CourseList.HOLE_CLICKED, { 'detail': { id : id } });
        this.dispatchEvent(event);
    }
}
CourseList.HOLE_CLICKED = 'holeclicked';
CourseList.COURSE_UPDATE = 'courseupdate';
customElements.define('abeach-courselist', CourseList);
