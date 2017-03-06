import Cube from './objects/cube.js';
import TestScene from './objects/testscene.js';

export default class Main {
    constructor(scene) {
        scene.onPreRender = this.render;

        scene.addObjects([
            new Cube(),
            new TestScene({ scene: './src/assets/tempscene.json' })
        ]);
    }

    render(time) {
    }
}
