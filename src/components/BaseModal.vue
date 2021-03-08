<template>
  <teleport to="#modals">
    <div v-if="visible" class="modal">
      <div class="modal-background"></div>
      <div
        v-if="modalType === 'content'"
        :role="role"
        :tabindex="-1"
        aria-modal="true"
        :aria-labelledby="labelledBy"
        class="modal-content"
        :class="`${name}-modal`"
      >
        <slot></slot>
      </div>
      <div v-else class="modal-card">
        <header class="modal-card-head">
          <slot name="header">
          </slot>
        </header>
        <section class="modal-card-body">
          <slot name="body"></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="card-footer">
          </slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch, computed, onUnmounted, PropType } from 'vue'
import useModal from '../../packages/useModal'
import {
  useFocusTrap,
  setFocusToFirstItem,
  useRestoreFocus,
} from '../../packages/focus'
import useClickOutside from '../../packages/useClickOutside'
import { useEscKeyHandler } from '../../packages/keyboard'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String as PropType<'dialog' | 'alertdialog'>,
      default: 'dialog',
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    modalType: {
      type: String as PropType<'content' | 'card'>,
      default: 'content',
    },
    labelledBy: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const visible = computed(() => {
      return modalName.value === props.name
    })
    const focusTrap = useFocusTrap()
    const escKeyHandler = useEscKeyHandler()
    const clickOutside = useClickOutside()
    const { name: modalName, hide } = useModal()
    let restoreFocus: () => void

    const showModal = () => {
      const modal = document.querySelector(
        `.${modalName.value}-modal`
      ) as HTMLElement
      focusTrap.on(modal)
      restoreFocus = useRestoreFocus()
      setFocusToFirstItem(modal)
      clickOutside.on(modal, () => {
        if (props.clickToClose) {
          hide(props.name)
        }
      })

      escKeyHandler.on(() => {
        if (props.clickToClose) {
          hide(props.name)
        }
      })
    }

    const hideModal = () => {
      focusTrap.dispose()
      clickOutside.dispose()
      escKeyHandler.dispose()
      restoreFocus()
      const MODAL_DISAPPEAR_IN_MS = 50
      setTimeout(() => {
        restoreFocus()
      }, MODAL_DISAPPEAR_IN_MS)
    }

    watch(
      visible,
      () => {
        visible.value ? showModal() : hideModal()
      },
      {
        flush: 'post',
      }
    )

    onUnmounted(() => {
      if (visible.value) {
        hide(props.name)
      }
    })

    return {
      visible,
      modalName
    }
  },
})
</script>

<style scoped>
.modal {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 40;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}

.modal-background {
  background-color:rgba(0, 0, 0, 0.48);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.modal-content,
.modal-card {
  margin: 0 20px;
  max-height: calc(100vh - 160px);
  overflow: auto;
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
}

@media screen and (min-width: 769px) {
  .modal-content,
  .modal-card {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 640px;
  }
}

.modal-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
}

.modal-card-head,
.modal-card-foot {
  align-items: center;
  background-color:#ffff;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}

.modal-card-head {
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.modal-card-foot {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #dbdbdb;
}

.modal-card-body {
  -webkit-overflow-scrolling: touch;
  background-color: white;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 20px;
}
</style>
