<template>
  <v-app>
    <NavBar />

    <v-container class="d-flex flex-column justify-center ma-auto">
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <h1 class="display-4 text-center orange--text text--darken-4">ITQin</h1>
        </v-col>
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
      nombre: "Mario"
    };
  }
};
</script>
