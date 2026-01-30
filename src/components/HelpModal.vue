<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFilter,
  faCheckSquare,
  faMapMarkerAlt,
  faSearch,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
</script>

<template>
  <div class="help-modal-content">
    <h2 class="help-title">How to use OpenMaps</h2>

    <div class="help-grid">
      <div class="help-icon">
        <FontAwesomeIcon :icon="faFilter" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>Filter the list of layers available in the left panel.</b></p>
        <p>Type in the box for the first filter to filter by text. Select a category from the second filter to filter by category.</p>
      </div>

      <div class="help-icon">
        <FontAwesomeIcon :icon="faCheckSquare" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>Toggle on and off map layers by clicking on the checkboxes in the layer panel.</b></p>
        <p>You can toggle on as many layers as you want, and they will all show on the map.</p>
      </div>

      <div class="help-icon">
        <FontAwesomeIcon :icon="faSquare" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>If a checkbox is grayed out, zoom in further on the map and it will become active.</b></p>
        <p>Many of the layers will not show when the map is zoomed out too far.</p>
      </div>

      <div class="help-icon">
        <FontAwesomeIcon :icon="faMapMarkerAlt" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>Click on any feature that appears on the map to get a popup with that feature's info.</b></p>
        <p>If you have turned on overlapping layers, you will be able to click through multiple popups of info.</p>
      </div>

      <div class="help-icon">
        <FontAwesomeIcon :icon="faSearch" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>Search for an address or intersection.</b></p>
        <p>The map will move to the location that you have searched.</p>
      </div>

      <div class="help-icon">
        <img
          class="street-view-image"
          src="../assets/cyclomedia_blue.png"
          alt="Street view"
        >
      </div>
      <div class="help-text">
        <p><b>Toggle on and off street view.</b></p>
        <p>Half of the map panel will be taken up by the street view. If you are zoomed in far enough, circles will appear along the streets in the map. Click on a circle to change the street view location to that point.</p>
      </div>

      <div class="help-icon">
        <FontAwesomeIcon :icon="faInfoCircle" class="fa-3x" />
      </div>
      <div class="help-text">
        <p><b>Learn more about and download data.</b></p>
        <p>Click this icon to be linked to the metadata page for any dataset.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-modal-content {
  color: #0f4d90;
  max-width: 600px;
}

.help-title {
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.help-grid {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 15px 20px;
  align-items: start;
}

.help-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f4d90;
}

.help-text {
  padding: 0;
}

.help-text p {
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.help-text p:last-child {
  margin-bottom: 0;
}

.street-view-image {
  width: 50px;
  height: 60px;
}

/* Mobile adjustments */
@media (max-width: 500px) {
  .help-grid {
    grid-template-columns: 50px 1fr;
    gap: 12px 15px;
  }

  .help-title {
    font-size: 20px;
  }
}
</style>
