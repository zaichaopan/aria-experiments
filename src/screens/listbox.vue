<template>
  <div class="flex flex-col w-full max-w-xs">
    <div class="js-assignee-dropdown">
      <label class="text-sm leading-5 font-medium text-gray-700">Assign to:</label>
      <div class="listbox-wrapper w-full">
        <button
          type="button"
          class="flex items-center border w-full justify-between p-2 rounded border-gray-300 sm:text-sm"
        >
          {{ selectedPerson.name}}
          <span class="ml-auto">
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
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
          role="listbox"
          class="hidden w-full mt-1 ppy-1 shadow-lg focus:outline-none rounded-md bg-white border border-gray-300 z-10"
        >
          <li
            v-for="(person, index) in people"
            :key="index"
            role="option"
            :data-value="person.id"
            class="relative py-2 pl-8 pr-4 sm:text-sm"
            :class="{'opacity-50 cursor-not-allowed': person.unavailable}"
            :disabled="person.unavailable"
            :selected="person.name === selectedPerson.name"
          >
            <span
              v-if="person.name === selectedPerson.name"
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
            {{person.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="js-option-dropdown mt-8">
      <label class="text-sm leading-5 font-medium text-gray-700">Options (multi):</label>
      <div class="listbox-wrapper w-full">
        <button
          type="button"
          class="flex items-center border w-full justify-between p-2 rounded border-gray-300 sm:text-sm"
        >
          {{ selectedOptions.map(option => option.name).join(', ')}}
          <span class="ml-auto">
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
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
          role="listbox"
          class="hidden w-full mt-1 ppy-1 shadow-lg focus:outline-none rounded-md bg-white border border-gray-300 z-10"
          multiselectable="true"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            role="option"
            :data-value="option.id"
            class="relative py-2 pl-8 pr-4 sm:text-sm"
            :class="{'opacity-50 cursor-not-allowed': option.unavailable}"
            :disabled="option.unavailable"
            :selected="selectedOptions.map(item => item.id).includes(option.id)"
          >
            <span
              v-if="selectedOptions.map(item => item.id).includes(option.id)"
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
            {{option.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import Listbox from "../../packages/listbox";

export default defineComponent({
  setup() {
    const people = [
      { id: 1, name: "Durward Reynolds", unavailable: false },
      { id: 2, name: "Kenton Towne", unavailable: false },
      { id: 3, name: "Therese Wunsch", unavailable: false },
      { id: 4, name: "Benedict Kessler", unavailable: true },
      { id: 5, name: "Katelyn Rohan", unavailable: false },
    ];

    let selectedPerson = reactive({ ...people[0] });

    const options = [
      { id: 1, name: "Option1", unavailable: false },
      { id: 2, name: "Option2", unavailable: false },
      { id: 3, name: "Option3", unavailable: true },
      { id: 4, name: "Option4", unavailable: false },
      { id: 5, name: "Option5", unavailable: false },
      { id: 6, name: "Option6", unavailable: false },
    ];

    let selectedOptions = reactive([{ ...options[1] }, { ...options[4] }]);

    onMounted(() => {
      let assigneeDropdown = new Listbox({
        listbox: document.querySelector(".js-assignee-dropdown ul"),
        button: document.querySelector(".js-assignee-dropdown  button"),
        label: document.querySelector(".js-assignee-dropdown label"),
      });

      assigneeDropdown.setOnSelect((selected: string[]) => {
        let findSelectedPerson = people.find((person) => {
          return person.id === parseInt(selected[0]);
        });

        if (findSelectedPerson) {
          selectedPerson = Object.assign(selectedPerson, findSelectedPerson);
        }
      });

      let optionDropdown = new Listbox({
        listbox: document.querySelector(".js-option-dropdown ul"),
        button: document.querySelector(".js-option-dropdown  button"),
        label: document.querySelector(".js-option-dropdown label"),
      });

      optionDropdown.setOnSelect((selected: string[]) => {
        let findSelectedOptions = options.filter((option) => {
          return selected.includes(option.id.toString());
        });
        selectedOptions.splice(0, selectedOptions.length, ...findSelectedOptions)
      });
    });

    return {
      selectedPerson,
      people,
      options,
      selectedOptions,
    };
  },
});
</script>

<style scoped>
.listbox-wrapper {
  position: relative;
}

[role="listbox"] {
  position: absolute;
  overflow-y: auto;
  max-height: 15rem;
}

[role="listbox"] [role="option"].focused {
  background: rgb(28, 100, 242);
  color: #ffffff;
}

[role="listbox"] [role="option"].focused span:first-child {
  color: #ffffff;
}
</style>
