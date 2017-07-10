import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';
import GeoMath from './geomath.js';

export default class PointsOfInterest extends EventListener {
    constructor() {
        super();
        this.places = [];
        this.geo = null;
    }

    /**
     * populate/refresh world positions
     * @param map
     */
    updateWorldPositions(map) {
        this.places.forEach( i => {
            i.position = map.project(i.location.longitude, i.location.latitude);
        });
    }

    /**
     * places search
     * @param geo
     */
    search(geo, radius) {
        this.geo = geo;

        if (typeof google !== 'undefined') {
            let llb = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude);
            let mapproxy = document.body.appendChild(document.createElement('div'));
            let service = new google.maps.places.PlacesService(mapproxy);
            service.nearbySearch({radius: radius, location: llb}, places => this.onPlacesFound(places));
        } else {
            setTimeout( (geo, radius) => this.search(geo, radius), 1000);
        }
    }

    /**
     * get farthest
     */
    closest() {
        if (this.places.length == 0) { return null; }
        return this.places[0];
    }


    /**
     * get farthest
     */
    farthest() {
        if (this.places.length == 0) { return null; }
        return this.places[this.places.length-1];
    }

    /**
     * sort places by proximity to user
     */
    sortByProximity() {
        this.places = this.places.sort( function(a, b) {
            return a.distance - b.distance;
        });
    }

    /**
     * update distances in location list from origin
     */
    updateDistances() {
        if (!this.geo || !self.places) {
            return;
        }
        this.places.forEach(function(loc) {
            loc.distance = GeoMath.calculateDistance(loc.location, this.geo.coords);
        });
        this.sortByProximity();
    }

    /**
     * on places found callback
     * @param results
     * @private
     */
    onPlacesFound(results) {
        results.forEach( i => {
                let dest = {
                    location: { latitude: i.geometry.location.lat(), longitude: i.geometry.location.lng() },
                    name: i.name,
                    types: i.types,
                    rating: i.rating,
                   // photo: i.photos[0].getUrl()
                };
                this.places.push(dest);
            });
        this.updateDistances();
        this.triggerEvent('placesfound', this.places);
    }
}

PointsOfInterest.PLACESFOUND_EVENT = 'placesfound';