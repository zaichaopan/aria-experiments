<template>
  <div class="m-5">
    <dl class="faq w-full lg:w-3/4 m-auto">
      <h1
        class="mx-2 border-b flex font-extrabold justify-center py-6 text-4xl"
      >Frequently ask questions</h1>
      <dt class="my-2">
        <button
          type="button"
          class="rounded w-full position-relative text-left px-2 py-4 font-medium text-lg flex items-center justify-between"
          @click="disclosures[0].control.onClick"
          v-bind="disclosures[0].control.aria"
        >
          What do I do if I have a permit for an assigned lot, but can't find a space there?
          <svg
            v-if="disclosures[0].control.aria['aria-expanded']"
            aria-hidden="true"
            class="text-gray-400 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-gray-400 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </dt>
      <dd class="border-b mx-2">
        <p class="desc text-gray-600 pb-4" v-bind="disclosures[0].description.aria">
          Park at the nearest available parking meter without paying the meter
          and call 999-999-9999 to report the problem. We will note and approve your alternate
          location and will investigate the cause of the shortage in your assigned facility.
        </p>
      </dd>

      <dt class="my-2">
        <button
          type="button"
          class="rounded w-full position-relative text-left px-2 py-4 font-medium text-lg flex items-center justify-between"
          @click="disclosures[1].control.onClick"
          v-bind="disclosures[1].control.aria"
        >
          What do I do if I lose my permit or if my permit is stolen?
          <svg
            v-if="disclosures[1].control.aria['aria-expanded']"
            aria-hidden="true"
            class="text-gray-400 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-gray-400 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </dt>
      <dd class="border-b mx-2">
        <p class="desc text-gray-600 pb-4" v-bind="disclosures[1].description.aria">
          You should come to the Parking office and report the
          loss. There is a fee to replace your lost permit. However, if your permit was stolen, a
          copy of a police report needs to be submitted along with a stolen parking permit form for
          a fee replacement exemption.
        </p>
      </dd>

      <dt class="my-2">
        <button
          type="button"
          class="rounded w-full position-relative text-left px-2 py-4 font-medium text-lg flex items-center justify-between"
          @click="disclosures[2].control.onClick"
          v-bind="disclosures[2].control.aria"
        >
          Is there free parking on holidays?
          <svg
            v-if="disclosures[2].control.aria['aria-expanded']"
            aria-hidden="true"
            class="text-gray-400 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-gray-400 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </dt>
      <dd class="border-b mx-2">
        <p class="desc text-gray-600 pb-4" v-bind="disclosures[2].description.aria">
          All facilities are restricted from 2:00 am - 6:00 am on all days. No
          exceptions are made for any holiday or recess except those officially listed as a
          <q>Holidays</q>
          in the calendar. Please note: 24-hour rental spaces, 24-hour rental lots, and
          disabled parking is enforced at all times.
        </p>
      </dd>

      <dt class="my-2">
        <button
          type="button"
          class="rounded w-full position-relative text-left px-2 py-4 font-medium text-lg flex items-center justify-between"
          @click="disclosures[3].control.onClick"
          v-bind="disclosures[3].control.aria"
        >
          Do all parking facilities have the same enforcement rules?
          <svg
            v-if="disclosures[3].control.aria['aria-expanded']"
            aria-hidden="true"
            class="text-gray-400 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-gray-400 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </dt>
      <dd class="border-b mx-2">
        <p class="desc text-gray-600 pb-4" v-bind="disclosures[3].description.aria">
          Some parking facility restrictions differ from others. Be sure to
          take note of the signs at each lot entrance.
        </p>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDisclosure from "./useDisclosure";
import usingMouseDetector from "./usingMouseDetector";

export default defineComponent({
  setup() {
    usingMouseDetector({ applyTo: ".faq" });
    console.log({ usingMouseDetector });
    let disclosures = useDisclosure({ number: 4, expanded: [0] });
    return { disclosures };
  },
});
</script>

<style scoped>
.faq.using-mouse button:focus {
  outline: none;
  box-shadow: none;
}

.faq button:focus {
  outline: none;
  box-shadow: inset 0 1px 0 0 rgba(102, 191, 255, 0.5),
    0 0 0 4px rgba(0, 149, 255, 0.15);
}
</style>
