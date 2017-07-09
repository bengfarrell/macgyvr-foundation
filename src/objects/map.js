import AFrameGroup from '../../node_modules/macgyvr/src/aframegroup.js';

export default class Map extends AFrameGroup {
    constructor(config) {
        super(config);
    }

    onCreate() {
        this.img = this.add( AFrameGroup.utils.createNode('a-image', {
            'src': '#mapbox canvas',
            'width': this.config.width,
            'height': this.config.height,
            'rotation': '-90 0 0',
            'position': '0 -15 0'
        }));
    }
}
