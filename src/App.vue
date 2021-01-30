<template>
    <toggle-switch
    :switched="speakerMuted"
    @switched="speakerMuted = !speakerMuted"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width="25"
      aria-label="speaker mute"
    >
      <path
        fill-rule="evenodd"
        d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
        clip-rule="evenodd"
      />
    </svg>
  </toggle-switch>
  <div style="margin: 20px"></div>
  <toggle-switch
    :switched="micMuted"
    @switched="micMuted = !micMuted"
    background-checked="rgb(9, 113, 241)"
  >
    Mic Mute
  </toggle-switch>
  <div style="margin: 20px"></div>
  <toggle-switch
    :switched="micMuted"
    @switched="micMuted = !micMuted"
    :aria-label="label"
    :disabled="true"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToggleSwitch from "./components/ToggleSwitch.vue";
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
   components: {
    ToggleSwitch,
  },

  data() {
    return {
      speakerMuted: false,
      micMuted: false,
      label: "Mute Mic",
    };
  },

  methods: {
    changeLabel() {
      this.label = "Mute camera";
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>