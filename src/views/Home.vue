<template>
  <div class="home"></div>
</template>

<script>
import { reactive } from "@vue/reactivity";

export default {
  name: "Home",
  setup() {
    const info = reactive({
      data: {
        api_key: "fb7bf8e352b7410a9f7cb203282ea1af",
        url_base: "https://newsapi.org/v2/everything?",
        query: "",
      },
    });
    return { info };
  },
};
</script>
