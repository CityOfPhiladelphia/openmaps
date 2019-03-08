/*
________                           _____
\_____  \ ______   ____   ____    /     \ _____  ______  ______
 /   |   \\____ \_/ __ \ /    \  /  \ /  \\__  \ \____ \/  ___/
/    |    \  |_> >  ___/|   |  \/    Y    \/ __ \|  |_> >___ \
\_______  /   __/ \___  >___|  /\____|__  (____  /   __/____  >
        \/|__|        \/     \/         \/     \/|__|       \/
*/

// import * as Sentry from '@sentry/browser';
// Sentry.init({ dsn: 'https://ba45a0a61b464a2e9f55c5fd55e209d6@sentry.io/1332677' });

import Vue from 'vue';
Vue.config.devtools = true;

// import * as datefns from 'date-fns';
// var test = datefns.format(1552067696, 'MM/DD/YYYY')
// console.log('datefns:', datefns, 'datefns.format:', datefns.format, 'test:', test);

import * as esri from 'esri-leaflet';
L.esri = esri;
import * as rend from 'esri-leaflet-renderers';
L.esri.Renderers = rend;
import 'esri-leaflet-legend/dist/esri-leaflet-legend-compat-src-edit.js';
import 'Leaflet-PointInPolygon/wise-leaflet-pip.js';
import '@mapbox/leaflet-omnivore/leaflet-omnivore.min.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
library.add(faSquare);

import axios from 'axios';
// import layerboard from '@philly/layerboard';
import layerboard from '@philly/layerboard/src/main.js';

import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-measure/dist/leaflet-measure.css';

// turn off console logging in production
// TODO come up with better way of doing this with webpack + env vars
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

window.openHelp = function(){
// function openHelp() {
  var firstHash = window.location.hash;
  console.log('setHash is running, firstHash:', firstHash);
  var firstHashArr = firstHash.split('/').slice(2);
  console.log('firstHashArr:', firstHashArr);
  var finalHash = '#/help';
  for (var i=0; i < firstHashArr.length; i++) {
    finalHash = finalHash + '/' + firstHashArr[i];
  }
  window.location.hash = finalHash;
}

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/ajrothwell/openmaps-base-config@ba14a53156e85ca8e655fc85cc83dd24d7323ef2/config.js';
var GATEKEEPER_KEY = 'ec8681f792812d7e3ff15e9094bfd4ad';
// var WEBMAP_ID = '4c3ed877199c402895b7fa45ce6409b6';
var WEBMAP_ID = '1596df70df0349e293ceec46a06ccc50';


layerboard({
  bundled: true,
  router: {
    enabled: true
  },
  geolocation: {
    enabled: true,
    icon: ['far', 'dot-circle']
  },
  addressInput: {
    width: 415,
    mapWidth: 300,
    position: 'right',
    autocompleteEnabled: false,
    autocompleteMax: 15,
    placeholder: 'Search the map',
  },
  map: {
    // possibly should move to base config
    defaultBasemap: 'pwd',
    defaultIdentifyFeature: 'address-marker',
    imagery: {
      enabled: true
    },
    historicBasemaps: {
      enabled: true
    },
    center: [-75.16347348690034, 39.952562122622254],
    clickToIdentifyFeatures: true,
    containerClass: 'map-container-type2',
  },
  cyclomedia: {
    enabled: true,
    measurementAllowed: false,
    popoutAble: true,
  },
  pictometry: {
    enabled: false,
  },
  gatekeeperKey: GATEKEEPER_KEY,
  baseConfig: BASE_CONFIG_URL,
  webmapId: WEBMAP_ID,
  topics: [],
  modals: ['help'],
});
