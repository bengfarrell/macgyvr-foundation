import BaseGroup from '../../node_modules/macgyvr/src/basegroup.js';

export default class Dome extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     */
    onCreate() {
        this._material = this.createMaterial();
        this._coloredFace = 0;
        this._mesh = new THREE.Mesh(this.createGeometry(), this._material);

        // hack because for some reason, the set color is different when setting each face than the original material
        for (var c = 0; c < this._mesh.geometry.faces.length; c++) {
            this._mesh.geometry.faces[c].color.set(0xc1c489);
        }
        this.add(this._mesh, 'dome');
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
        /*if (this.sceneCollection.input.connected) {
            var direction = new THREE.Vector3( 0, 0, -1).applyQuaternion( this.sceneCollection.input.orientation );
            var raycaster = new THREE.Raycaster();
            raycaster.set( this.sceneCollection.camera.position, direction );
            var collisions = raycaster.intersectObjects( [this._mesh] );
            if (collisions.length > 0) {
                this._mesh.geometry.faces[this._coloredFace].color.set(0xc1c489);
                this._coloredFace = collisions[0].faceIndex;
                this._mesh.geometry.faces[this._coloredFace].color.set(0xff9145);
                this._mesh.geometry.colorsNeedUpdate = true;
            }
        }*/
    }

    onInput() {

    }

    /**
     * create globe geometry
     * @returns {THREE.IcosahedronGeometry}
     */
    createGeometry() {
        return new THREE.IcosahedronGeometry( 800, 2 );
    }

    /**
     * create globe material
     */
    createMaterial() {
        return new THREE.MeshPhongMaterial({
            color      :  0xc1c489,
            vertexColors: THREE.FaceColors,
            side       :  THREE.BackSide,
            shininess  :  10,
            shading    :  THREE.FlatShading
        });
    }
}
