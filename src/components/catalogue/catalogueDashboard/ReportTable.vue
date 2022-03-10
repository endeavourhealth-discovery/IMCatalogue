<template>
  <div :id="id" class="dashcard-container">
    <Card class="dashcard dash-table">
      <template #title>
        <span v-if="name">{{ name }}</span>
      </template>
      <template #subtitle>
        <span v-if="description">{{ description }}</span>
      </template>
      <template #content>
        <div class="p-d-flex p-flex-row p-jc-center p-ai-center loading-container" v-if="loading">
          <ProgressSpinner />
        </div>
        <DataTable v-else :value="tableData" class="p-datatable-sm" :scrollable="true" scrollHeight="350px">
          <template #header>
            Ontology data
          </template>
          <Column field="label" header="Label"></Column>
          <Column field="count" header="Total"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {} from "im-library/dist/types/interfaces/Interfaces";
import { Vocabulary } from "im-library";
const { RDFS, OWL } = Vocabulary;

export default defineComponent({
  name: "ReportTable",
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    inputData: { type: Array as PropType<Array<any>>, required: true },
    id: { type: String, required: true }
  },
  data() {
    return {
      tableData: [] as { count: number; label: string }[],
      loading: false
    };
  },
  async mounted() {
    await this.getReportTableData();
  },
  methods: {
    async getReportTableData(): Promise<void> {
      this.loading = true;
      for (const entry of this.inputData) {
        this.tableData.push({
          label: entry[RDFS.LABEL],
          count: +entry[OWL.HAS_VALUE]
        });
      }
      this.loading = false;
    }
  }
});
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .dashcard-container {
    height: calc(50% - 7px);
    width: calc(50% - 7px);
  }
}
@media screen and (max-width: 1023px) {
  .dashcard-container {
    height: calc(50% - 7px);
    width: calc(100%);
  }
}
.dashcard {
  height: 100%;
  width: 100%;
}
.loading-container {
  width: 100%;
  height: 100%;
}
</style>
