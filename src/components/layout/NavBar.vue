<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Sistema de ingreso al ITQ</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <SignedInLinks v-bind:user="user" v-if="user !== null" />
        <SignedOutLinks v-if="user === null" />
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>


<script>
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
export default {
  components: {
    SignedInLinks,
    SignedOutLinks
  },
  props: {
    user: null
  }
};
</script>