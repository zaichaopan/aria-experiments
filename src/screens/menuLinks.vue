<template>
   <div class="menu-button-links inline-block">
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm"
    >
      Options
      <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <ul role="menu" class="w-56 mt-2 border border-gray-200 shadow-lg rounded py-1 bg-white right-0">
      <div role="none" class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm leading-5">Signed in as</p>
        <p class="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
      </div>
      <li role="none">
        <a
          role="menuitem"
          href="#/account-settings"
          class="block px-4 py-3 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 outline-none text-sm"
        >Account Settings</a>
      </li>
      <li role="none">
        <a
          role="menuitem"
          href="#/support"
          class="block px-4 py-3 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 outline-none text-sm"
        >Support</a>
      </li>
      <li role="none">
        <span
          class="block px-4 py-3 w-full text-gray-700 opacity-50 cursor-not-allowed text-sm"
        >New features (soon)</span>
      </li>
      <li role="none" class="border-b border-gray-10">
        <a
          role="menuitem"
          href="#/license"
          class="block px-4 py-3 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 outline-none text-sm"
        >License</a>
      </li>
      <li role="none">
        <a
          role="menuitem"
          href="#/Signout"
          class="block px-4 py-3 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 outline-none text-sm"
        >Sign out</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import MenuButtonLinks from '../../packages/menuButtonLinks'
import { defineComponent, onMounted} from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      const button = document.querySelector("button")
      const menu  = document.querySelector("ul")

      new MenuButtonLinks({ button, menu });
    });
  }
});
</script>

<style lang="scss" scoped>
.menu-button-links {
  position: relative;
}

ul[role="menu"] {
  list-style: none;
  display: none;
  position: absolute;
}
</style>
