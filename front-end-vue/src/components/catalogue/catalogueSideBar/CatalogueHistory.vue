<template>
  <div id="catalogue-history">
    <Listbox v-model="selected" :options="history" class="history-listbox" @click="navigate" :virtualScrollerOptions="{ itemSize: 31 }">
      <template #option="slotProps">
        <div v-if="slotProps.option.name">
          <span>{{ slotProps.option.name }}</span>
        </div>
        <div v-else>
          <span>{{ slotProps.option["@id"] }}</span>
        </div>
      </template>
    </Listbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { InstanceHistoryItem } from "im-library/dist/types/interfaces/Interfaces";
import { Helpers } from "im-library";
const {
  DataTypeCheckers: { isObjectHasKeys }
} = Helpers;

export default defineComponent({
  name: "CatalogueHistory",
  props: { history: { type: Array as PropType<InstanceHistoryItem[]>, required: true } },
  data() {
    return {
      selected: {} as InstanceHistoryItem
    };
  },
  methods: {
    navigate(): void {
      if (isObjectHasKeys(this.selected, ["@id"])) {
        this.$router.push({
          name: "Individual",
          params: { selectedIri: this.selected["@id"] }
        });
      }
    }
  }
});
</script>

<style scoped>
#catalogue-history {
  height: 100%;
  width: 100%;
}
.history-listbox {
  height: 100%;
  overflow: auto;
}
</style>
