import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';
import MappingService from './mapping.js';
import PointsOfInterestService from './pointsofinterest.js';
import GeoTrackerService from './geotracker.js';
import AFrameUtils from '../../node_modules/macgyvr/src/utils/aframe.js';

export default class Course extends EventListener {
    constructor(config) {
        super();
        this.config = config;
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
        this.poi.updateWorldPositions(this.map);
        let centerPos = this.map.project(this.geo.currentPosition.coords.longitude, this.geo.currentPosition.coords.latitude);
        this.triggerEvent(Course.LOADED, { location: this.geo.currentPosition, worldPosition: centerPos, places: places } );
    }

    previewHole(id, camera) {
        let holes = this.poi.getHolePath(id);
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
}

Course.LOCATIONUPDATE = 'locationupdate';
Course.LOADED = 'loaded';
