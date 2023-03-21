<script setup lang="ts">
import { onMounted } from "vue";
import { confirm, form } from "../src/index";
import { Input } from "ant-design-vue";


onMounted(async function() {
  form([
    {
      key: "a",
      lable: "A",
      component: Input
    },
    {
      key: "b",
      lable: "B",
      component: Input
    }
  ]);
});
</script>

<template>
  <div></div>
</template>