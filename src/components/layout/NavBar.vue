<template>
  <div>
    <v-navigation-drawer class="blue-grey darken-4 white--text" v-model="drawer" absolute temporary>
      <div class="d-flex justify-end ma-2 pa-1">
        <v-btn class x-small fab color="white" @click.stop="drawer = !drawer">
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <SignedInLinksMobile v-bind:user="user" v-if="user !== null" />
      <SignedOutLinksMobile v-if="user === null" />
    </v-navigation-drawer>
    <v-toolbar class="blue-grey darken-4">
      <v-app-bar-nav-icon class="d-sm-none .d-md-flex white--text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        :src="require('../../assets/applogo.png')"
        aspect-ratio="1"
        max-width="60"
        max-height="60"
      ></v-img>
      <v-toolbar-title class="white--text">Sistema de ingreso al ITQ</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="d-none d-lg-block">
        <SignedInLinks v-bind:user="user" v-if="user !== null" />
        <SignedOutLinks v-if="user === null" />
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>


<script>
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinksMobile from "./SignedInLinksMobile";
import SignedOutLinksMobile from "./SignedOutLinksMobile";
export default {
  data() {
    return {
      drawer: null
    };
  },
  components: {
    SignedInLinks,
    SignedOutLinks,
    SignedInLinksMobile,
    SignedOutLinksMobile
  },
  props: {
    user: null
  }
};
</script>