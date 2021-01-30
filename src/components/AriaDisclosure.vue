<template>
<div>
  <dt><slot name="dt">dt is required</slot></dt>
  <dd><slot name="dl">dd is required</slot></dd>
</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({


});
</script>

<style scoped>
</style>