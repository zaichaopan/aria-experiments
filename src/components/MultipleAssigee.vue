<template>
  <div class="w-full max-w-xs mt-5">
    <span id="listbox-label-1">Assign to:</span>
    <div class="listbox-wrapper w-full">
      <button
        aria-haspopup="listbox"
        aria-labelledby="lisbox-label-1 js-listbox-button"
        id="js-listbox-button"
        class="flex items-center border w-full justify-between p-2 rounded border-gray-300"
      >
        {{ selectedPerson.join(', ')}}
        <span class="ml-auto">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor">
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <ul
        :tabindex="-1"
        role="listbox"
        id="js-listbox"
        aria-labelledby="listbox-label-1"
        aria-multiselectable="true"
        class="hidden w-full mt-1 py-2 py-1 shadow-lg focus:outline-none rounded-md bg-white border border-gray-300"
      >
        <li
          v-for="(person, index) in people"
          :key="index"
          role="option"
          :data-value="person"
          class="relative py-2 pl-8 pr-4"
          :class="{'opacity-50': person === 'Tanya Fox'}"
          :disabled="person === 'Tanya Fox'"
          :selected="selectedPerson.includes(person)"
        >
          <span
            v-if="selectedPerson.includes(person)"
            class="text-blue-600 absolute inset-y-0 left-0 flex items-center pl-1.5"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style="height: 1.25rem;"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{person}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import Listbox from "./listbox";

export default defineComponent({
  setup() {
    const people = [
      "Wade Cooper",
      "Arlene Mccoy",
      "Devon Webb",
      "Tom Cook",
      "Tanya Fox",
      "Hellen Schmidt",
      "Caroline Schultz",
      "Mason Heaney",
      "Claudie Smitham",
      "Emil Schaefer",
    ];

    const selectedPerson = ref(["Hellen Schmidt", "Mason Heaney"]);

    onMounted(() => {
      const button = document.getElementById("js-listbox-button");
      const listbox = document.getElementById("js-listbox");

      if (button && listbox) {
        let listBox = new Listbox(listbox, button);

        listBox.setOnSelect((selected: string[]) => {
          if (selected) {
            console.log({ selected });
            selectedPerson.value = selected;
          }
        });
      }
    });

    return {
      selectedPerson,
      people,
    };
  },
});
</script>

<style lang="scss">
.listbox-wrapper {
  position: relative;
}

.listbox-wrapper button[aria-haspopup="listbox"] {
  position: relative;
}

.listbox-wrapper [role="listbox"] {
  position: absolute;
  overflow-y: auto;
  max-height: 15rem;
}

.listbox-wrapper [role="listbox"] [role="option"].focused {
  background: rgb(28, 100, 242);
  color: #ffffff;
}

.listbox-wrapper [role="listbox"] [role="option"].focused span:first-child {
  color: #ffffff;
}
</style>
