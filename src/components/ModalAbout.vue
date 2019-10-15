<template>
  <div class="background">
    <h2 class="text-center ">
      <b>How to use OpenMaps</b>
    </h2>
    <div class="grid-x align-center-middle">
      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          icon="filter"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Filter the list of layers available in the left panel.</b></p>
        <p>Type in the box for the first filter to filter by text.  Select a category from the second filter to filter by category.</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          icon="check-square"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Toggle on and off map layers by clicking on the checkboxes in the layer panel.</b></p>
        <p>You can toggle on as many layers as you want, and they will all show on the map.</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          :icon="['far', 'square']"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>If a checkbox is grayed out, zoom in further on the map and it will become active.</b></p>
        <p>Many of the layers will not show when the map is zoomed out too far.</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          icon="map-marker-alt"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Click on any feature that appears on the map to get a popup with that feature's info.</b></p>
        <p>If you have turned on overlapping layers, you will be able to click through multiple popups of info.</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          icon="search"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Search for an address or intersection.</b></p>
        <p>The map will move to the location that you have searched</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <img
          class="street-view-image"
          :src="'images/cyclomedia_blue.png'"
        >
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Toggle on and off street view</b></p>
        <p>Half of the map panel will be taken up by the street view. If you are zoomed in far enough, circles will appear along the streets in the map.  Click on a circle to change the street view location to that point.</p>
      </div>

      <div class="cell small-9 medium-3 text-center">
        <font-awesome-icon
          icon="info-circle"
          class="fa-3x"
          aria-hidden="true"
        />
      </div>
      <div class="cell small-15 medium-21 text-div">
        <p><b>Learn more about and download data.</b></p>
        <p>Click this icon to be linked to the metadata page for any dataset.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ModalAbout',
};
</script>

<style scoped>

  p {
      margin-bottom: 2px;
    }

  .topic {
    border-radius: 10px;
    border-style: solid;
    margin-bottom: 4px;
  }

  .background {
    border-radius: 20px;
    background-color: white;
    color: rgb(15, 77, 144);
    padding: 20px;
  }

  .text-div {
    padding-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .street-view-image {
    width: 50px;
    height: 60px;
  }

</style>
