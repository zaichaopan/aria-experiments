<template>
  <fieldset class="w-full lg:w-1/2 mt-5">
    <legend class="font-semibold pb-1 mx-5">Privacy</legend>
    <div class="rounded mx-4">
      <div
        class="rounded-t p-4"
        :class="[privacy ==='public'? 'border border-blue-200 bg-blue-50': 'border', privacy ==='member'? 'border-b-0': 'border']"
      >
        <label for="public" class="aria-radio-label">
          <input
            v-model="privacy"
            type="radio"
            name="privacy"
            id="public"
            class="aria-radio-input"
            aria-describedby="int1"
            value="public"
          />
          <span class="aria-radio-button mr-2"></span>
          Public access
        </label>

        <p
          id="int1"
          class="ml-3 pl-5 int3 text-gray-500"
        >This project would be available to anyone who has the link</p>
      </div>

      <div
        class="p-4"
        :class="[privacy ==='member'? 'border border-blue-200 bg-blue-50': 'border border-t-0', privacy ==='private'? 'border-b-0': '']"
      >
        <label for="member" class="aria-radio-label">
          <input
            type="radio"
            name="privacy"
            id="member"
            class="aria-radio-input"
            value="member"
            v-model="privacy"
            aria-describedby="int2"
          />
          <span class="aria-radio-button mr-2"></span>
          Private to Project Members
        </label>
        <p
          id="int2"
          class="ml-3 pl-5 int3 text-gray-500"
        >Only members of this project would be able to access</p>
      </div>

      <div
        class="rounded-b p-4"
        :class="[privacy ==='private'? 'border border-blue-200 bg-blue-50': 'border border-t-0']"
      >
        <label for="private" class="aria-radio-label">
          <input
            type="radio"
            name="privacy"
            id="private"
            class="aria-radio-input"
            value="private"
            v-model="privacy"
            aria-describedby="init3"
          />
          <span class="aria-radio-button mr-2"></span>
          Private to you
        </label>
        <p
          id="init3"
          class="ml-3 pl-5 int3 text-gray-500"
        >You are the only one access to this project</p>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import usingMouseDetector from "./usingMouseDetector";

export default defineComponent({
  setup() {
    usingMouseDetector({ applyTo: ".aria-radio-button" });
    let privacy = ref("public");
    return {
      privacy,
    };
  },
});
</script>

<style scoped>
.aria-radio-label {
  position: relative;
  display: flex;
  align-items: center;
}
.aria-radio-input {
  opacity: 0.000001;
  width: 0;
  height: 0;
}

.aria-radio-label .aria-radio-button {
  width: 24px;
  height: 24px;
  display: flex;
  border-radius: 50%;
  position: relative;
  border: 2px solid transparent;
}
.aria-radio-label .aria-radio-button:before {
  content: "";
  height: 80%;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid gray;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.aria-radio-label .aria-radio-button:after {
  content: "";
  height: 40%;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: blue;
  transition: all 0.2s ease-in-out;
}

.aria-radio-input:focus + .aria-radio-button {
  border: 2px solid rgb(94, 158, 214);
}

.aria-radio-input:focus + .using-mouse.aria-radio-button {
  border: 2px solid transparent;
}

.aria-radio-input:checked + .aria-radio-button:before {
  border-color: blue;
}

.aria-radio-input:checked + .aria-radio-button:after {
  transform: translate(-50%, -50%) scale(1);
}
</style>
