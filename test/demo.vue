<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as modal from "../src/index";
import { Input, Upload } from "ant-design-vue";
import Test from "./test.vue";
import { rules } from "@ue/form";

const onSubmit = function(value: Object) {
  console.log('submit : ', value);
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(Math.random() > 0.5 ? value : false);
    }, 1000 * 3);
  });
}

onMounted(async function() {
  const value = await modal.form([
    {
      key: "a",
      label: "A",
      component: Input,
      rules: rules.text()
    },
    {
      key: "b",
      label: "B",
      component: Input,
      rules: rules.text()
    }
  ], {
    title: "AAA",
    textAlign: "right",
    otherText: "Next",
    otherType: "danger",
    onOk: onSubmit,
    otherOk: async function(v: object) {
      await onSubmit(v);
      return false;
    },
    onCancel: async function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(false);
        }, 1000 * 3);
      });
    }
  });
  console.log("modal.form = ", value);
  // modal.iframe("http://erp.eciol-dev.com/");
  // const status = await modal.sure("hello world", "提示");
  // console.log(status);

  // const value = await modal.confirm(Test, {
  //   title: "AAA",
  //   onOk: () => onSubmit,
  // })
  // console.log("modal.confirm = ", value);
  
});
</script>

<template>
  <div></div>
</template>