import AFrameGroup from '../../node_modules/macgyvr/src/aframegroup.js';

export default class Avatar extends AFrameGroup {
    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate(scene) {
        this._avatar = this.add( AFrameGroup.utils.createNode('a-box', {
            'width': .25,
            'height': 2,
            'depth': .25,
            'color': '#ff0000',
            'position': '0 -10 0'
        }));
    }
}
