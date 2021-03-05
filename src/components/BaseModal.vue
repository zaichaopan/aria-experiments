<template>
  <teleport to="#modal">
    <transition name="modal">
      <div class="modal-overlay" v-if="visible">
        <div
          :role="role"
          :tabindex="-1"
          aria-modal="true"
          :aria-labelledby="title"
          class="modal"
          :class="`${name}-modal`"
        >
          <div class="modal-guts">
            <slot :title="title" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  nextTick,
  onUnmounted,
  PropType,
} from "vue";
import useModal from "../../packages/useModal";
import { useFocusTrap, setFocusToFirstItem } from "../../packages/focus";
import useClickOutside from "../../packages/useClickOutside";
import { randomString } from "../../packages/string";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String as PropType<"dialog" | "alertdialog">,
      default: "dialog",
    },
  },
  setup(props) {
    const visible = ref(false);
    const title = randomString();
    const { start: startFocusTrap, stop: stopFocusTrap } = useFocusTrap();
    const {
      start: startClickOutiside,
      stop: stopclickOutside,
    } = useClickOutside();
    const { name, hide } = useModal();

    const showModal = () => {
      visible.value = true;
      nextTick(() => {
        let modal = document.querySelector(
          `.${name.value}-modal`
        ) as HTMLElement;
        startFocusTrap(modal);
        startClickOutiside(modal, () => {
          hide(props.name);
        });
        setFocusToFirstItem(modal);
      });
    };

    const hideModal = () => {
      visible.value = false;
      stopFocusTrap();
      stopclickOutside();
    };

    watch(name, () => {
      name.value === props.name ? showModal() : hideModal();
    });

    onUnmounted(() => {
      if (visible.value) {
        hide(props.name);
      }
    });

    return {
      visible,
      name,
      title,
    };
  },
});
</script>

<style scoped>
.modal {
  display: block;
  width: 600px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all.35s ease;
  transform-origin: top left;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.48);
  transition: opacity 0.35s ease;
}
.modal-guts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px 50px 20px 20px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 */
.modal-enter-from {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-active .modal {
  transform: scale(1.1) translate(-50%, -50%);
}
</style>
