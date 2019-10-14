<template>
  <v-app>
    <Navbar />
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" xl="6">
          <v-card class="pa-6">
            <v-card-title>{{nombre}} {{apellidoP}} {{apellidoM}}</v-card-title>
            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <v-img src="https://i.imgur.com/8BOkh8y.png" aspect-ratio="1"></v-img>
              </v-col>
              <v-col cols="12" md="6">
                <h3>{{carrera}}</h3>
                <h5>{{semestre}}° semestre</h5>
                <h5>Número de control: {{ncontrol}}</h5>
                <h5>Qr de acceso</h5>
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <v-img src="https://i.imgur.com/BZZ7i9Y.png" aspect-ratio="1"></v-img>
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
import db from "../firebaseInit";

export default {
  components: {
    Navbar
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
      semestre: null
    };
  },
  props: {
    id: null,
    user: null
  },
  beforeMount() {
    const uid = this.user.user.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No user foud");
          this.$router.push({
            name: "home"
          });
        } else {
          if (doc.data().rol === "alumno") {
            this.nombre = doc.data().nombre;
            this.apellidoP = doc.data().apellidoP;
            this.apellidoM = doc.data().apellidoM;
            this.ncontrol = doc.data().ncontrol;
            this.password = doc.data().password;
            this.email = doc.data().email;
            this.carrera = doc.data().carrera;
            this.semestre = doc.data().semestre;
          } else {
            this.$router.push({
              name: "admin",
              params: { user: doc.data() }
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>