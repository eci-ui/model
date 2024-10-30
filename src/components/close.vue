<script setup lang="ts">
import {FullscreenOutlined, FullscreenExitOutlined, CloseOutlined} from "@ant-design/icons-vue";

const $emit = defineEmits(["close", "full"]);

const onClose = function (e: Event) {
  $emit("close", e);
}

const onFull = function (e: Event) {
  $emit("full", e);
}

</script>

<template>
  <div class="ui-modal-close">
    <b class="full-screen-on" @click="onFull">
      <FullscreenOutlined/>
    </b>
    <b class="full-screen-off" @click="onFull">
      <FullscreenExitOutlined/>
    </b>
    <b @click="onClose">
      <CloseOutlined/>
    </b>
  </div>
</template>
