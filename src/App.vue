<template>
  <div class="w-1/4 bg-gray-100 min-h-screen px-5 flex flex-col">
    <h1
      class="text-2xl font-semibold font-display text-gray-900 sm:text-3xl py-4 overflow-ellipsis overflow-hidden"
    >Headerless UI</h1>
    <router-link to="/menu-links" class="text-gray-500 py-2" active-class="text-gray-900">Menu links</router-link>
    <router-link to="/list-box" class="text-gray-500 py-2" active-class="text-gray-900">Listbox</router-link>
    <router-link to="/dialog" class="text-gray-500 py-2" active-class="text-gray-900">Dialog</router-link>
  </div>
  <div class="w-3/4 flex justify-center min-h-screen pt-10">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
@import "@design";
</style>
