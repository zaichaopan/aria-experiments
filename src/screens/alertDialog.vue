<template>
  <base-modal
    v-slot="{ title }"
    name="signin"
    role="dialog"
    :click-to-close="true"
  >
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
        <button
          id="notes_confirm"
          type="button"
          aria-controls="notes"
          @click="closeModal"
        >
          Yes
        </button>
      </div>
    </div>
  </base-modal>

  <button
    id="open-button"
    type="button"
    class="border px-4 py-2 h-10"
    @click="clickOpen"
  >
    show button
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModal from '../../packages/useModal'
import BaseModal from '../components/BaseModal.vue'

export default defineComponent({
  components: { BaseModal },
  setup() {
    const clickOpen = () => {
      show('signin')
    }

    const closeModal = () => {
      hide('signin')
    }

    const { show, hide, name } = useModal()
    return {
      show,
      hide,
      clickOpen,
      closeModal,
      name,
    }
  },
})
</script>

<style scoped></style>
