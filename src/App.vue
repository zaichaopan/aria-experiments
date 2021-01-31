<template>
  <faq-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToggleSwitch from "./components/ToggleSwitch.vue";
import FaqList from './components/FaqList.vue'

export default defineComponent({
   components: {
    ToggleSwitch,
    FaqList,
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
