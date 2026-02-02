<script setup lang="ts">
/**
 * OpenMaps Example App
 *
 * Demonstrates the simplest usage of the Layerboard framework:
 * - Uses default flat layer panel with search
 * - Fetches metadata for layer info links
 */

import { Layerboard } from '@phila/layerboard'
import type { CyclomediaConfig, PictometryCredentials } from '@phila/layerboard'
import HelpModal from './components/HelpModal.vue'
import { PhilaLink } from "@phila/phila-ui-link"

// WebMap ID for OpenMaps
const WEBMAP_ID = '376af635c84643cd816a8c5d017a53aa'

// Cyclomedia street-level imagery configuration
const cyclomediaConfig: CyclomediaConfig = {
  username: import.meta.env.VITE_CYCLOMEDIA_USERNAME || "",
  password: import.meta.env.VITE_CYCLOMEDIA_PASSWORD || "",
  apiKey: import.meta.env.VITE_CYCLOMEDIA_API_KEY || "",
  srs: "EPSG:4326",
  locale: "en-US",
}

// Pictometry oblique imagery credentials
const pictometryCredentials: PictometryCredentials = {
  clientId: import.meta.env.VITE_PICTOMETRY_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_PICTOMETRY_CLIENT_SECRET || "",
}
</script>

<template>
  <Layerboard
    title="OpenMaps"
    :web-map-id="WEBMAP_ID"
    theme-color="#0f4d90"
    sidebar-width="30%"
    :fetch-metadata="true"
    :initial-zoom="15"
    :cyclomedia-config="cyclomediaConfig"
    :pictometry-credentials="pictometryCredentials"
  >
    <template #footer="{ openModal }">
      <a href="#" class="footer-link" @click.prevent="openModal">Help</a>
      <span class="footer-separator">|</span>
      <PhilaLink
        text="Feedback"
        href="https://phila.formstack.com/forms/openmaps_feedback"
        target="_blank"
        variant="on-primary"
      />
    </template>

    <template #modal>
      <HelpModal />
    </template>
  </Layerboard>
</template>

<style scoped>
.footer-link {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-separator {
  margin: 0 8px;
  color: white;
  opacity: 0.7;
}
</style>
