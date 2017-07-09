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
        console.log('populate places');
        places.forEach( i => {
            let hole = new HoleMarker();
            hole.translate(i.position);
            this.add(hole);
        });
    }
}
