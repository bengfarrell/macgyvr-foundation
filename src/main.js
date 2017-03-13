import BaseApplication from '../node_modules/macgyvr/src/baseapplication.js';
import Cube from './objects/cube.js';
import Dome from './objects/dome.js';
import TestScene from './objects/testscene.js';
import DaydreamInput from '../node_modules/macgyvr/src/plugins/input/daydream.js';
import GazeInput from '../node_modules/macgyvr/src/plugins/input/gaze.js';

export default class Main extends BaseApplication {
    onCreate(scene, scenecollection) {
        this._sceneCollection = scenecollection;

        /**
         * Daydream controller
         */
        this._sceneCollection.input = new DaydreamInput();
        document.querySelector('.connect-button').addEventListener('click', e => {
            e.target.remove();
            this._sceneCollection.input.start();
        });

        /**
         * Gaze Input
         */
        //this._sceneCollection.input = new GazeInput(scenecollection.camera);
        //this._sceneCollection.input.start();

        scene.addObjects([
            new Dome(),
            new Cube(),
            new TestScene({ scene: './src/assets/tempscene.json' })
        ]);
    }

    onRender(time) {}
}
