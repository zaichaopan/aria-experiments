<template>
  <!-- <faq-list /> -->
  <aria-radio />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToggleSwitch from "./components/ToggleSwitch.vue";
import FaqList from './components/FaqList.vue'
import AriaRadio from './components/AriaRadio.vue'

export default defineComponent({
   components: {
    ToggleSwitch,
    FaqList,
    AriaRadio
  },

  data() {
    return {
      speakerMuted: false,
      micMuted: false,
      label: "Mute Mic"
    };
  }
})
</script>

<style>
</style>
