<template>
  <v-app class="blue-grey lighten-5">
    <NavBar v-bind:user="userLinks" />
    <v-container class="d-flex flex-column">
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <h1 class="display-2 text-center">Descarga nuestras aplicaciones</h1>
        </v-col>
      </v-row>

      <v-row justify="center" mt-12>
        <v-col cols="12" md="3" align="center">
          <v-img
            :src="require('../assets/logoapp2.png')"
            aspect-ratio="1"
            max-width="200"
            max-height="200"
            class="text-center"
          ></v-img>
          <h1>ITQin</h1>
          <p>Esta es la aplicación que quieres descargar si eres alumno del ITQ</p>
          <a
            href="https://play.google.com/store/apps/details?id=com.sistemas.itqin&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <v-img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"
              max-width="300"
              max-height="200"
            ></v-img>
          </a>
        </v-col>
        <v-col cols="12" md="3" align="center">
          <v-img
            :src="require('../assets/logoappQR.png')"
            aspect-ratio="1"
            max-width="200"
            max-height="200"
            class="text-center"
          ></v-img>
          <h1>ITQin</h1>
          <p>Esta aplicación te permitira escanear los codigos QR</p>
          <v-btn
            href="https://drive.google.com/file/d/1a0uKu3Jdck1KCDhbCB7haPK1wkNcqp9T/view?usp=sharing"
            class="ma-2 white--text"
            color="orange"
          >Descargar</v-btn>
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
