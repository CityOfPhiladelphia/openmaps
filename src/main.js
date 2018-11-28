/*
________                           _____
\_____  \ ______   ____   ____    /     \ _____  ______  ______
 /   |   \\____ \_/ __ \ /    \  /  \ /  \\__  \ \____ \/  ___/
/    |    \  |_> >  ___/|   |  \/    Y    \/ __ \|  |_> >___ \
\_______  /   __/ \___  >___|  /\____|__  (____  /   __/____  >
        \/|__|        \/     \/         \/     \/|__|       \/
*/

import * as Sentry from '@sentry/browser';
Sentry.init({ dsn: 'https://ba45a0a61b464a2e9f55c5fd55e209d6@sentry.io/1332677' });

import accounting from 'accounting';
import axios from 'axios';
import moment from 'moment';
import layerboard from '@cityofphiladelphia/layerboard';

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
var WEBMAP_ID = '4c3ed877199c402895b7fa45ce6409b6';

layerboard({
  bundled: true,
  router: {
    enabled: true
  },
  geolocation: {
    enabled: true
  },
  addressAutocomplete: {
    enabled: true
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
