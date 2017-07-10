import AFrameGroup from '../../node_modules/macgyvr/src/aframegroup.js';

export default class HoleMarker extends AFrameGroup {
    constructor(config) {
        super(config);
    }

    get data() {
        return this._data;
    }

    set data(val) {
        this._data = val;
    }

    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate(scene) {
        this._flag = this.add(AFrameGroup.utils.createNode('a-box', {
            'width': .25,
            'height': 2,
            'depth': .25,
            'color': '#ffff00',
            'position':'0 -15 0'
        }));
    }


}
