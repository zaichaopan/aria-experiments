<template>
  <div class="toggle-switch" :class="switchClass">
    <button
      type="button"
      role="switch"
      :aria-checked="switched"
      :id="randomString"
      class="toggle-switch__btn"
      @click="$emit('switched')"
      :style="switchBtnStyle"
      v-bind="$attrs"
    >
      <span
        class="toggle-switch__switch"
        aria-hidden="true"
        :style="switchSpanStyle"
      ></span>
    </button>
    <label
      v-if="hasLabel"
      :for="randomString"
      class="toggle-switch__label"
      :class="switchLabelClass"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ToggleSwitch from "./components/ToggleSwitch.vue";
import getRandString from "./randomString";

export default defineComponent({
  name: "ToggleSwitch",
  inheritAttrs: false,
  props: {
    switched: {
      type: Boolean,
      required: true,
    },
    switchClass: {
      type: String,
      default: "",
    },
    switchLabelClass: {
      type: String,
      default: "switch__label",
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 20,
    },
    backgroundChecked: {
      type: String,
      default: "#6e6e6e",
    },
    backgroundUnchecked: {
      type: String,
      default: "#e1e1e1",
    },
  },
  computed: {
    switchBtnStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        background: this.switched
          ? this.backgroundChecked
          : this.backgroundUnchecked,
      };
    },
    switchSpanStyle() {
      return {
        width: `${this.height - 3}px`,
        height: `${this.height - 3}px`,
        left: this.switched ? `${this.width - this.height}px` : "0px",
      };
    },
  },

  setup(props, context) {
    const { randomString } = getRandString();
    const hasLabel = !!context.slots.default;

    return {
      randomString,
      hasLabel,
    };
  },
})
</script>

<style scoped>
.toggle-switch {
  display: flex;
  align-items: center;
}

.switch__label {
  padding-left: 15px;
}

button[role="switch"]:focus {
  box-shadow: 0 0 2pt 1pt rgb(9, 113, 241);
  outline: none;
}

button[role="switch"] {
  border-radius: 999px;
  position: relative;
  border: none;
}

button[role="switch"] span {
  position: absolute;
  top: 50%;
  left: 0px;
  box-shadow: 0 0 10px rgb(0 0 0 / 25%);
  border-radius: 999px;
  transition: all 0.2s;
  transform: translateY(-50%);
  background: #ffffff;
}

button[role="switch"]:disabled {
  cursor: not-allowed;
}
</style>
