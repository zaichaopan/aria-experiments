<template>
  <base-modal name="signin" role="dialog" :click-to-close="true" v-slot="{ title }">
    <div>
      <h2 :id="title" class="dialog_label">Confirmation</h2>
      <div class="dialog_desc">
        <p>Are you sure you want to discard all of your notes?</p>
        <p id="word_count">44 words will be deleted.</p>
        <input type="text" class="mt-1 block w-full" placeholder="input1" />
        <input type="text" class="mt-1 block w-full" placeholder="input2" />
        <input type="text" class="mt-1 block w-full" placeholder="input3" />
      </div>
      <div class="dialog_form_actions">
        <button type="button">No</button>
        <button @click="closeModal" type="button" aria-controls="notes" id="notes_confirm">Yes</button>
      </div>
    </div>
  </base-modal>

  <button
    type="button"
    id="open-button"
    class="border px-4 py-2 h-10"
    @click="clickOpen"
  >show button</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useModal from "../../packages/useModal";
import BaseModal from "../components/BaseModal.vue";

export default defineComponent({
  components: { BaseModal },
  setup() {
    const clickOpen = () => {
      show("signin");
    };

    const closeModal = () => {
      hide("signin");
    };

    const { show, hide, name } = useModal();
    return {
      show,
      hide,
      clickOpen,
      closeModal,
      name,
    };
  },
});
</script>

<style scoped>
</style>
