<template>
  <v-app class="blue-grey lighten-5">
    <NavBar v-bind:user="userLinks" />
    <v-container class="d-flex flex-column justify-center ma-auto">
      <v-row align="center" justify="center">
        <v-img
          :src="require('../assets/applogo.png')"
          aspect-ratio="1"
          max-width="500"
          max-height="500"
        ></v-img>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <h1 class="display-3 text-center">Sistema de ingreso al ITQ</h1>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "../components/layout/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      userLinks: null
    };
  }
};
</script>
