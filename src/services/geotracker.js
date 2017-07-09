import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';

export default class GeoTracker extends EventListener {
    constructor(config) {
        super();
        if (!config) {
            this.config = {
                enableHighAccuracy: true,
                maximumAge: 5000
            };
        } else {
            this.config = config;
        }

        this.currentPosition = null;
        if (config.simulateLocation) {
            document.addEventListener('keydown',  e => this.onKeyDown(e));
        }
    }

    /**
     * start tracking
     * @param callback for geoservice update
     *
     */
    start() {
        if (this.config.simulateLocation) {
            this.updated( { coords: { latitude: this.config.simulateLocation.latitude, longitude: this.config.simulateLocation.longitude }});
        } else {
            if (this.watchID) {
                navigator.geolocation.clearWatch(this.watchID);
            }
            navigator.geolocation.getCurrentPosition( (geo) => this.updated(geo), (err) => this.error(err), this.config );
            this.watchID = navigator.geolocation.watchPosition( (geo) => this.updated(geo), (err) => this.error(err), this.config);
        }
    };

    /**
     * stop tracking
     */
    stop() {
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }

    /**
     * update geolocation
     * @param location
     */
    updated (location) {
        this.currentPosition = location;
        this.triggerEvent('update', location);
    }

    /**
     * update geolocation error handler
     * @param error
     */
    error(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "User denied the request for Geolocation."}]);
                });
                break;
            case error.POSITION_UNAVAILABLE:
                this.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "Location information is unavailable."}]);
                });
                break;
            case error.TIMEOUT:
                this.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "The request to get user location timed out."}]);
                });
                break;
            case error.UNKNOWN_ERROR:
                this.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "An unknown error occurred."}]);
                });
                break;
        }
    }

    onKeyDown(e) {
        let lat = this.currentPosition.coords.latitude;
        let lon = this.currentPosition.coords.longitude;
        switch (e.keyCode) {
            case 37: // left
                lon -= .00001;
                break;
            case 38: // up
                lat += .00001;
                break;
            case 39: // right
                lon += .00001;
                break;
            case 40: // down
                lat -= .00001;
                break;
        }
        this.currentPosition.coords.latitude = lat;
        this.currentPosition.coords.longitude = lon;
        this.updated(this.currentPosition);
    }
}

GeoTracker.UPDATE = 'update';
