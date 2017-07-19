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
        this._flag = this.add(AFrameGroup.utils.createNode('a-entity', {
            'scale': '3 3 3',
            'obj_model': 'obj: ./assets/flag/model.obj; mtl: ./assets/flag/materials.mtl',
            'position': '0 -13 0'
        }));
    }
}
