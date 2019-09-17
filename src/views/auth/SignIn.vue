<template>
  <v-app>
    <NavBar />
    <v-container class="formHolder">
      <v-row wrap>
        <v-card class="ma-auto pa-6">
          <v-alert v-if="verificaDatos" type="warning">uh Verifica tus datos</v-alert>
          <v-card-title>Ingresa tus datos</v-card-title>
          <v-form>
            <v-container>
              <v-row wrap justify="end">
                <v-col cols="12">
                  <v-text-field
                    outlined
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
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

                <v-col cols="12" md="3">
                  <v-btn @click="signIn" block outlined color="primary">Ingresar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
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
import firebase from "firebase/app";
import "firebase/auth";
import NavBar from "../../components/layout/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      show1: false,
      password: "",
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
      verificaDatos: false
    };
  },
  methods: {
    signIn: function() {
      if (this.password && this.email) {
        try {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.$router.push({
                name: "user",
                params: { id: this.email.split("@")[0], user: user }
              });
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.verificaDatos = !this.verificaDatos;
        setTimeout(() => {
          this.verificaDatos = !this.verificaDatos;
        }, 3000);
      }
    }
  }
};
</script>