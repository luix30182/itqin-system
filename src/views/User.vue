<template>
  <v-app>
    <h1>Hello {{id}}</h1>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    id: null
  }
};
</script>