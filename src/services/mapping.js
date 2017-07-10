import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';

export default class Mapping extends EventListener {
    constructor(config, loc) {
        super();
        this.config = config;
        this.currentLocation = loc;
        this.load(loc);
    }

    set location(loc) {
        this.currentLocation = loc;
        this._mapbox.jumpTo( {
            zoom: 16,
            center: [this.currentLocation.coords.longitude, this.currentLocation.coords.latitude]
        });
    }

    load(loc) {
        this.currentLocation = loc;
        this._mapboxEl = document.createElement('div');
        this._mapboxEl.setAttribute('id', 'mapbox');
        this._mapboxEl.style.width = this.config.mapMetersWidth * this.config.pixelsToMeters + 'px';
        this._mapboxEl.style.height = this.config.mapMetersHeight * this.config.pixelsToMeters + 'px';
        document.body.appendChild(this._mapboxEl);
        mapboxgl.accessToken = this.config.mapboxAccessToken;
        this._mapbox = new mapboxgl.Map({
            container: 'mapbox',
            preserveDrawingBuffer: true,
            style: 'mapbox://styles/mapbox/streets-v9',
            width: this.config.mapMetersWidth * this.config.pixelsToMeters,
            height: this.config.mapMetersHeight * this.config.pixelsToMeters
        });

        if (!this._mapbox.loaded()) {
            this._mapbox.once('load', () => {
                this._mapbox.resize();
                this.onMapLoaded();
            });
        } else {
            this._mapbox.resize();
            this.onMapLoaded();
        }
    }

    onMapLoaded() {
        this._mapbox.jumpTo( {
            zoom: 16,
            center: [this.currentLocation.coords.longitude, this.currentLocation.coords.latitude]
        });
        this.triggerEvent( Mapping.LOADED, { mapservice: this } );
    }

    /**
     * Returns {x, y} representing a position relative to the entity's center,
     * that correspond to the specified geographical location.
     * (credit: function from https://github.com/jesstelford/aframe-map)
     *
     * @param {float} long
     * @param {float} lat
     */
    project(long, lat) {
        // The position (origin at top-left corner) in pixel space
        let point = this._mapbox.project([long, lat]);
        return {
            x: -this.config.mapMetersWidth/ 2 + (point.x / this.config.pixelsToMeters),
            y: 0,
            z: -this.config.mapMetersHeight/ 2 + (point.y / this.config.pixelsToMeters)
        };
    }
}

Mapping.LOADED = 'loaded';
