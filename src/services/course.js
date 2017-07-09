import EventListener from '../../node_modules/macgyvr/src/utils/eventlistener.js';
import MappingService from './mapping.js';
import PlacesService from './places.js';
import GeoTrackerService from './geotracker.js';

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
        }
    }

    onMapLoaded(params) {
        this.places = new PlacesService();
        this.places.search(this.geo.currentPosition, 500);
        this.places.addListener(PlacesService.PLACESFOUND_EVENT, (eventtype, places) => this.onPlacesFound(places));
    }

    onPlacesFound(places) {
        places.forEach( i => {
            i.position = this.map.project(i.location.longitude, i.location.latitude);
        });

        let centerPos = this.map.project(this.geo.currentPosition.coords.longitude, this.geo.currentPosition.coords.latitude);
        this.triggerEvent(Course.LOADED, { location: this.geo.currentPosition, worldPosition: centerPos, places: places } );
    }
}

Course.LOCATIONUPDATE = 'locationupdate';
Course.PLACESUPDATE = 'placesupdate';
Course.LOADED = 'loaded';
