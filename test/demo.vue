<script setup lang="ts">
import { onMounted } from "vue";
import { confirm } from "../src/index";


onMounted(async function() {
  confirm("hello world", "test");
});
</script>

<template>
  <div></div>
</template>