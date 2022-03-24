<template>
  <div class="layout-wrapper layout-static">
    <Toast />
    <div v-if="loading" class="p-d-flex p-flex-row p-jc-center p-ai-center loading-container">
      <ProgressSpinner />
    </div>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  async mounted() {
    // check for user and log them in if found or logout if not
    this.loading = true;
    await this.$store.dispatch("authenticateCurrentUser");
    await this.$store.dispatch("fetchBlockedIris");
    this.loading = false;
  },
  data() {
    return {
      loading: false
    };
  }
});
</script>

<style>
body {
  overflow: hidden;
}

.loading-container {
  width: 100vw;
  height: 100vh;
}

.p-toast-message-text {
  width: calc(100% - 4rem);
}

.p-toast-message-content {
  width: 100%;
}

.p-toast-detail {
  width: 100%;
  word-wrap: break-word;
}
</style>
