import BaseApplication from '../node_modules/macgyvr/src/baseapplication.js';

import Map from './objects/map.js';
import Avatar from './objects/avatar.js';
import Holes from './objects/holes.js';

import MappingService from './services/mapping.js';
import CourseService from './services/course.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.objects = {};
        this.course = new CourseService(this.config);
        this.course.addListener(CourseService.LOADED, (eventtype, params) => this.onCourseLoaded(params) );
        this.course.addListener(CourseService.LOCATIONUPDATE, (eventtype, params) => this.onLocationUpdate(params) );

        this.scene = document.querySelector('#scene');
    }

    onCourseLoaded(params) {
        this.objects.map = new Map({
            width: this.config.mapMetersWidth,
            height: this.config.mapMetersHeight });
        this.objects.avatar = new Avatar(params.worldPosition);
        this.objects.avatar.translate(params.worldPosition);

        this.holes = new Holes();
        this.holes.populate(params.places);

        this.add([
            this.objects.map,
            this.objects.avatar,
            this.holes
        ]);

        this.config.applicationUI.data = { places: params.places };
        this.config.applicationUI.addEventListener( ApplicationUI.PREVIEW_HOLE, event => this.course.previewHole(event.detail.id, document.querySelector('#camera')));
        this.config.applicationUI.addEventListener( ApplicationUI.COURSE_UPDATE, event => this.onCourseUpdate(event));
    }

    onCourseUpdate(event) {
        this.course.updateCourse(event.detail.course);
        this.config.applicationUI.data = { places: event.detail.course };

    }

    onLocationUpdate(params) {
        if (this.objects.avatar ) {
            this.objects.avatar.translate(params.worldPosition);
        }
        this.holes.refreshPositions();
    }


    onRender(time) {}
}
