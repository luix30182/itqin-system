<template>
  <v-app>
    <NavBar v-bind:user="userLinks" />
    <v-container>
      <v-row wrap>
        <v-form ref="form">
          <v-container>
            <v-col cols="12" md="7" offset-md="2">
              <v-card-title>Ingresa tus datos</v-card-title>

              <v-alert v-if="registroCorrecto" type="success">Usario creado exitosamente</v-alert>
              <v-alert v-if="verificaDatos" type="warning">Verifica tus datos</v-alert>
              <v-row wrap justify="end">
                <v-col cols="12" sm="12" md="4">
                  <v-text-field v-model="nombre" label="Nombre(s)" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="apellidoP" label="Apellido Paterno" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="apellidoM" label="Apellido Materno" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-model="ncontrol" label="Número de control" outlined></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="4">
                  <v-select v-model="carrera" :items="carreras" label="Carrera" outlined></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="4">
                  <v-select v-model="semestre" :items="semestres" label="semestre" outlined></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    outlined
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="Almenos 8 caracteres son requeridos"
                    counter
                    outlined
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="passwordConfirm"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirmar Password"
                    hint="Almenos 8 caracteres son requeridos"
                    counter
                    outlined
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" lg="2">
                  <v-btn @click="signUp" block outlined color="primary">Registrar</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="stylus" scoped></style>

<script>
import NavBar from "../../components/layout/NavBar";
import firebase, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from "../../firebaseInit";
import router from "vue-router";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      nombre: null,
      apellidoP: null,
      apellidoM: null,
      ncontrol: null,
      show1: false,
      password: "",
      passwordConfirm: "",
      carrera: "Selecciona una carrera",
      semestre: null,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length) >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      carreras: [
        "Ing. Sistemas computacionales",
        "Ing. Materiales",
        "Ing. Mecanica",
        "Ing. Industrial",
        "Ing. Logistica",
        "Ing. Gestion empresarial",
        "Lic. Arquitectura"
      ],
      semestres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      registroCorrecto: false,
      verificaDatos: false,
      userLinks: null
    };
  },
  methods: {
    signUp: function() {
      if (
        (this.nombre,
        this.apellidoP,
        this.apellidoM,
        this.ncontrol,
        this.password === this.passwordConfirm &&
          this.email &&
          this.carrera &&
          this.semestre)
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            db.collection("users")
              .doc(user.user.uid)
              .set({
                nombre: this.nombre,
                apellidoP: this.apellidoP,
                apellidoM: this.apellidoM,
                ncontrol: this.ncontrol,
                email: this.email,
                carrera: this.carrera,
                semestre: this.semestre,
                rol: "alumno",
                activo: false,
                imgProfile: "https://i.imgur.com/8BOkh8y.png",
                qrcode: "https://i.imgur.com/BZZ7i9Y.png"
              })
              .then(res => {
                this.$refs.form.reset();
                this.registroCorrecto = !this.registroCorrecto;
                setTimeout(() => {
                  this.registroCorrecto = !this.registroCorrecto;
                  router.push({ name: "user" });
                }, 3000);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            this.verificaDatos = !this.verificaDatos;
            setTimeout(() => {
              this.verificaDatos = !this.verificaDatos;
            }, 3000);
          });
      } else {
        console.log("verifica tus datos");
        this.verificaDatos = !this.verificaDatos;
        setTimeout(() => {
          this.verificaDatos = !this.verificaDatos;
        }, 3000);
      }
    }
  }
};
</script>