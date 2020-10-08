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

// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

import layerboard from '@phila/layerboard/src/main.js';

import modalAbout from './components/ModalAbout.vue';

const customComps = {
  'about': modalAbout,
};

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/layerboard-default-base-config@cd706668166dec6412b4203b120accac97e69209/config.js';
var GATEKEEPER_KEY = 'ec8681f792812d7e3ff15e9094bfd4ad';
var WEBMAP_ID = '1596df70df0349e293ceec46a06ccc50';

layerboard(
  {
    customComps,
    footerContent: {
      components: [
        {
          type: 'PopoverLink',
          options: {
            height: '92%',
            customStyle: { 'color': 'white', 'border-bottom': '0px' },
            components: [
              {
                type: 'about',
              },
            ],
          },
          slots: {
            shouldShowValue: false,
            value: 'Help',
          },
        },
        {
          type: 'Anchor',
          options: {
            text: 'Feedback',
            target: 'blank',
            customStyle: { 'color': 'white', 'border-bottom': '0px' },
            href: '//philagsg.typeform.com/to/GQOPjW',
          },
        },
      ],
    },
    bundled: true,
    layerFilter: true,
    router: {
      enabled: true,
    },
    geolocation: {
      enabled: true,
      icon: [ 'far', 'dot-circle' ],
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
      defaultBasemap: 'pwd',
      defaultIdentifyFeature: 'address-marker',
      imagery: {
        enabled: true,
      },
      initialImagery: 'imagery2020',
      historicBasemaps: {
        enabled: true,
      },
      center: [ -75.16347348690034, 39.952562122622254 ],
      clickToIdentifyFeatures: true,
      containerClass: 'map-container',
    },
    cyclomedia: {
      enabled: true,
      orientation: 'horizontal',
      measurementAllowed: false,
      popoutAble: true,
      recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
      username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
      password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
      apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
    },
    pictometry: {
      enabled: false,
    },
    gatekeeperKey: GATEKEEPER_KEY,
    baseConfig: BASE_CONFIG_URL,
    webmapId: WEBMAP_ID,
  },
);
