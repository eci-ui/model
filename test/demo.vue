<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as modal from "../src/index";
import {Input} from "ant-design-vue";
import Test from "./test.vue";
import {rules} from "@ue/form";

const onSubmit = function (value: Object) {
  console.log('submit : ', value);
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(Math.random() > 0.5 ? value : false);
    }, 1000 * 3);
  });
}

const test1 = async function () {
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
    otherType: "default",
    otherProp: {danger: true},
    fullScreen: true,
    width: 600,
    onOk: onSubmit,
    otherOk: async function (v: object) {
      return onSubmit(v);
    },
    onCancel: async function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(true);
        }, 1000 * 3);
      });
    }
  });
}

const test2 = async function () {
  const status = await modal.sure("hello world", "提示");
  console.log(status);
}

const test3 = async function () {
  const value = await modal.confirm(Test, {
    title: "AAA",
    onOk: () => onSubmit,
  })
  console.log("modal.confirm = ", value);
}

onMounted(async function () {
  // modal.iframe("http://erp.eciol-dev.com/");
  test1();
});
</script>

<template>
  <div></div>
</template>