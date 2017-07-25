import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';
import MappingService from './mapping.js';
import GeoMath from './geomath.js';
import PointsOfInterestService from './pointsofinterest.js';
import GeoTrackerService from './geotracker.js';
import AFrameUtils from '../../node_modules/macgyvr/src/utils/aframe.js';

export default class Course extends EventListener {
    constructor(config) {
        super();
        this.config = config;
        this.holes = [];
        this.geo = new GeoTrackerService( { simulateLocation: config.simulateLocation });
        this.geo.addListener( GeoTrackerService.UPDATE, (eventtype, location) => this.onGeoUpdate(location) );
        this.geo.start();
    }

    onGeoUpdate(location) {
        if (!this.map) {
            this.map = new MappingService(this.config, location);
            this.map.addListener(MappingService.LOADED, (eventtype, location) => this.onMapLoaded(location) );
        } else {
            this.map.location = location;
            this.poi.updateWorldPositions(this.map);
            let centerPos = this.map.project(this.geo.currentPosition.coords.longitude, this.geo.currentPosition.coords.latitude);
            this.triggerEvent(Course.LOCATIONUPDATE, { location: this.geo.currentPosition, worldPosition: centerPos, places: this.poi.places } );
        }
    }

    onMapLoaded(params) {
        this.poi = new PointsOfInterestService();
        this.poi.search(this.geo.currentPosition, 500);
        this.poi.addListener(PointsOfInterestService.PLACESFOUND_EVENT, (eventtype, places) => this.onPlacesFound(places));
    }

    onPlacesFound(places) {
        this.holes = places;
        this.refreshCourseData();
        let centerPos = this.map.project(this.geo.currentPosition.coords.longitude, this.geo.currentPosition.coords.latitude);
        this.triggerEvent(Course.LOADED, { location: this.geo.currentPosition, worldPosition: centerPos, places: this.holes } );
    }

    updateCourse(holes) {
        this.holes = holes;
        this.refreshCourseData();
    }

    /**
     * get hole by id
     * @param id
     */
    getHoleById(id) {
        return this.holes.filter(function(place) { return id === place.id; })[0];
    }

    /**
     * get start/origin and target/destination
     * @param id of target hole
     */
    getHolePath(id) {
        let retObj = {};
        for (let c = 0; c < this.holes.length; c++) {
            if (this.holes[c].id === id) {
                retObj.destination = this.holes[c];
                if (c > 0) {
                    retObj.origin = this.holes[c-1];
                } else {
                    retObj.origin = { location: this.geo.currentPosition.coords };
                }
                return retObj;
            }
        }
    }

    previewHole(id, camera) {
        let holes = this.getHolePath(id);
        this.map.drawPath(holes.origin, holes.destination);
        AFrameUtils.addAnimation(camera, {
            attribute: 'position',
            duration: 2000,
            delay: 1000,
            easing: 'ease-in-out',
            from: AFRAME.utils.coordinates.stringify(camera.getAttribute('position')),
            to: AFRAME.utils.coordinates.stringify(holes.destination.position)
        }, true);
    }

    refreshCourseData() {
        for (let c = 0; c < this.holes.length; c++) {
            this.holes[c].position = this.map.project(this.holes[c].location.longitude, this.holes[c].location.latitude);
            if (c === 0) {
                this.holes[c].distance = GeoMath.calculateDistance(this.geo.currentPosition.coords, this.holes[c].location );
            } else {
                this.holes[c].distance = GeoMath.calculateDistance(this.holes[c].location, this.holes[c-1].location );
            }
            this.holes[c].par = parseInt(this.holes[c].distance / 100);
            if (this.holes[c].par > 5) {
                this.holes[c].par = 5;
            }
            if (this.holes[c].par < 1) {
                this.holes[c].par = 1;
            }
        }
    }
}

Course.LOCATIONUPDATE = 'locationupdate';
Course.LOADED = 'loaded';
