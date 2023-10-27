<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as modal from "../src/index";
import { Input, Upload } from "ant-design-vue";
import Test from "./test.vue";

const onSubmit = function() {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(false);
    }, 1000 * 3);
  });
}

onMounted(async function() {
  // modal.form([
  //   {
  //     key: "a",
  //     label: "A",
  //     component: Input
  //   },
  //   {
  //     key: "b",
  //     label: "B",
  //     component: Input
  //   }
  // ], {
  //   title: "AAA",
  //   onOk: () => onSubmit,
  // });

  modal.confirm(Test);

  // modal.iframe("http://erp.eciol-dev.com/");
  // const status = await modal.sure("hello world", "提示");
  // console.log(status);

  
});
</script>

<template>
  <div></div>
</template>