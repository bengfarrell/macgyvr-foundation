import BaseApplication from '../node_modules/macgyvr/src/baseapplication.js';
import Cube from './objects/cube.js';
import Dome from './objects/dome.js';
import TestScene from './objects/testscene.js';
import ResponsiveInput from '../node_modules/macgyvr/src/input/responsive.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        // Controller setup...starts as gaze input, but switches to Daydream on button press
        scene.controller = new ResponsiveInput(scene.camera);
        scene.controller.connect();

        // Objects are added here, replace, tweak, add your own
        this.add([
            new Dome(),
            new Cube(),
            new TestScene({ scene: './src/assets/tempscene.json' })
        ]);
    }

    onRender(time) {}
}
