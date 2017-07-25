class CourseChooserPage extends HTMLElement {
    static get observedAttributes() { return ['holes']}

    constructor() {
        super();
        this.maxHoles = 9;
        this.template = '   <abeach-courselist></abeach-courselist> \
                            <div class="footer-row">\
                                <span class="label">Play</span>\
                                <button class="beach-button less">-</button> \
                                <span class="maxholes"></span>\
                                <button class="beach-button more">+</button> \
                                <span class="label2">hole course</span> \
                                <button class="beach-button ok">OK</button>\
                            </div>';
        this.dom = {};
    }

    set data(value) {
        this._data = value;
        this.updateCounterControls();

        if (this.dom.courselist) {
            this.dom.courselist.data = this._data;
        }
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dom.courselist = this.querySelector('abeach-courselist');
        this.dom.okBtn = this.querySelector('.ok');
        this.dom.lessBtn = this.querySelector('.less');
        this.dom.moreBtn = this.querySelector('.more');
        this.dom.maxHoles = this.querySelector('.maxholes');
        this.dom.okBtn.addEventListener('click', () => this.onOKButtonClick() );
        this.dom.lessBtn.addEventListener('click', () => this.onLessButtonClick() );
        this.dom.moreBtn.addEventListener('click', () => this.onMoreButtonClick() );
        this.dom.courselist.addEventListener(CourseList.HOLE_CLICKED, event => this.onHoleClicked(event));
        this.dom.courselist.addEventListener(CourseList.COURSE_UPDATE, event => this.onCourseUpdate(event));
        this.dom.maxHoles.innerText = this.maxHoles;
        this.updateCounterControls();

        if (this._data) {
            this.dom.courselist.data = this._data;
        }
    }

    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {}
    adoptedCallback(oldDocument, newDocument) {}

    onOKButtonClick() {
        var event = new CustomEvent('clickok');
        this.dispatchEvent(event);
    }

    onLessButtonClick(event) {
        this.maxHoles --;
        if (this.maxHoles <= 0) {
            this.maxHoles = 1;
        }
        this.updateCounterControls();
    }

    onMoreButtonClick(event) {
        this.maxHoles ++;
        if (this.maxHoles > this._data.length) {
            this.maxHoles = this._data.length;
        }
        this.updateCounterControls();
    }

    onHoleClicked(e) {
        let event = new CustomEvent(CourseChooserPage.PREVIEW_HOLE, { detail: e.detail });
        this.dispatchEvent(event);
    }

    onCourseUpdate(e) {
        let event = new CustomEvent(CourseChooserPage.COURSE_UPDATE, { detail: e.detail });
        this.dispatchEvent(event);
    }

    updateCounterControls() {
        if (!this._data) { return; }
        this.dom.maxHoles.innerText = this.maxHoles;
        this.dom.courselist.setAttribute('maxholes', this.maxHoles);

        if (this.maxHoles <= 1) {
            this.dom.lessBtn.classList.add('disabled');
        } else {
            this.dom.lessBtn.classList.remove('disabled');
        }

        if (this.maxHoles >= this._data.length) {
            this.dom.moreBtn.classList.add('disabled');
        } else {
            this.dom.moreBtn.classList.remove('disabled');
        }
    }
}

CourseChooserPage.PREVIEW_HOLE = 'previewhole';
CourseChooserPage.COURSE_UPDATE = 'courseupdate';
customElements.define('abeach-page-coursechooser', CourseChooserPage);
