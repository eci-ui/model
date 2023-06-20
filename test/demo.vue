<script setup lang="ts">
import { onMounted, ref } from "vue";
import { form } from "../src/index";
import { Input } from "ant-design-vue";

const onSubmit = function() {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(false);
    }, 1000 * 3);
  });
}

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
  ], {
    title: "AAA",
    onOk: () => onSubmit,
  });
});
</script>

<template>
  <div></div>
</template>