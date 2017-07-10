import AFrameGroup from '../../node_modules/macgyvr/src/aframegroup.js';
import HoleMarker from './holemarker.js';

export default class Holes extends AFrameGroup {
    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate(scene) {

    }

    populate(places) {
        places.forEach( i => {
            let hole = new HoleMarker();
            hole.data = i;
            hole.translate(i.position);
            this.add(hole);
        });
    }

    refreshPositions() {
        this.children.forEach( hole => {
            hole.translate(hole.data.position);
        });
    }
}
