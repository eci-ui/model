<script setup lang="ts">
import { Input, Upload } from "ant-design-vue";

const onSubmit = function() {
  return {a: 1, b: 2};
}

defineExpose({ onSubmit });

</script>

<template>
  <div>
    <div>
      <Upload>
        <span>上传文件</span>
      </Upload>
    </div>
    <slot name="buttons"></slot>
  </div>
</template>