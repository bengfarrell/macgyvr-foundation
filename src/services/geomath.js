export default {
    get earthRadius() {
        return 6371000;
    },

    /**
     * calculate distance
     * @param geo1
     * @param geo2
     * @returns {Number}
     */
    calculateDistance(geo1, geo2) {
        this.convertFromGoogle([geo1, geo2]);
        let dLat = this.toRad(geo1.latitude - geo2.latitude);
        let dLon = this.toRad(geo1.longitude - geo2.longitude);
        let lat1 = this.toRad(geo2.latitude);
        let lat2 = this.toRad(geo1.latitude);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return parseInt(this.earthRadius * c);
    },

    /**
     * calculate bearing between two coordinates
     * @param geo1
     * @param geo2
     * @returns {*}
     */
    calculateBearing(geo1, geo2) {
        this.convertFromGoogle([geo1, geo2]);
        let dLat = this.toRad(geo1.latitude - geo2.latitude);
        let dLon = this.toRad(geo1.longitude - geo2.longitude);
        let lat1 = this.toRad(geo2.latitude);
        let lat2 = this.toRad(geo1.latitude);

        let y = Math.sin(dLon) * Math.cos(lat2);
        let x = Math.cos(lat1)* Math.sin(lat2) -
            Math.sin(lat1)* Math.cos(lat2)* Math.cos(dLon);
        let brng = this.toDeg(Math.atan2(y, x));
        return brng;
    },

    /**
     * get coords from projecting out from location at a certain distance and angle
     * @param geo
     * @param distance
     * @param bearing
     */
    projectOut(geo, d, bearing) {
        this.convertFromGoogle([geo]);
        let lat1 = this.toRad(geo.latitude);
        let lon1 = this.toRad(geo.longitude);
        let brng = this.toRad(bearing);
        let lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/this.earthRadius) +
            Math.cos(lat1)*Math.sin(d/this.earthRadius)*Math.cos(brng) );
        let lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/this.earthRadius)*Math.cos(lat1),
                Math.cos(d/this.earthRadius)-Math.sin(lat1)*Math.sin(lat2));

        return { latitude: this.toDeg(lat2), longitude: this.toDeg(lon2) };
    },

    /**
     * convert from google lat/long object
     */
    convertFromGoogle(llobjs) {
        llobjs.forEach( function(llo) {
            if (typeof(llo.lat) != "undefined" && typeof(llo.lng) != "undefined") {
                llo.latitude = llo.lat();
                llo.longitude = llo.lng();
            }
        });
    },

    /**
     * math util to convert lat/long to radians
     * @param value
     * @returns {number}
     */
    toRad(value) {
        return value * Math.PI / 180;
    },

    /**
     * math util to convert radians to latlong/degrees
     * @param value
     * @returns {number}
     */
    toDeg(value) {
        return value * 180 / Math.PI;
    }
}
