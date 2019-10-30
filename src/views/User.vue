<template>
  <v-app>
    <Navbar v-bind:user="userLinks" />
    <v-container>
      <v-row wrap>
        <v-col cols="12" xl="6" offset-xl="3">
          <v-card class="pa-6">
            <p class="text-center display-1">{{nombre}} {{apellidoP}} {{apellidoM}}</p>
            <p class="text-center font-weight-black">{{email}}</p>
            <v-row align="end" justify="end" wrap>
              <v-col cols="12" md="6" align-self="center" justify-self="center">
                <v-img
                  class="text-center ma-auto"
                  height="300"
                  position="center"
                  width="300"
                  src="https://i.imgur.com/8BOkh8y.png"
                  aspect-ratio="1"
                ></v-img>
              </v-col>
              <v-col cols="12" md="6">
                <h3>{{carrera}}</h3>
                <h5>{{semestre}}° semestre</h5>
                <h5>Número de control: {{ncontrol}}</h5>
                <h5>Qr de acceso</h5>
                <v-row justify="start" align="center">
                  <v-col cols="12">
                    <v-img height="300" width="300" :src="qrcode" aspect-ratio="1"></v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.formHolder > .row {
  height: 90vh;
}
</style>

<script>
import Navbar from "../components/layout/NavBar";

export default {
  components: {
    Navbar
  },
  methods: {
    getImage: function(student) {
      let image = new Image();
      image.src = student;
      return image;
    }
  },
  data() {
    return {
      nombre: null,
      apellidoP: null,
      apellidoM: null,
      ncontrol: null,
      password: null,
      email: null,
      carrera: null,
      semestre: null,
      qrcode: null
    };
  },
  props: {
    id: null,
    user: null,
    userLinks: null
  },
  beforeMount() {
    if (this.userLinks == null) {
      this.$router.push({
        name: "home"
      });
    }
    if (this.user) {
      this.nombre = this.user.nombre;
      this.apellidoP = this.user.apellidoP;
      this.apellidoM = this.user.apellidoM;
      this.ncontrol = this.user.ncontrol;
      this.email = this.user.email;
      this.carrera = this.user.carrera;
      this.semestre = this.user.semestre;
      this.qrcode = this.user.qrcode;
    }
  }
};
</script>