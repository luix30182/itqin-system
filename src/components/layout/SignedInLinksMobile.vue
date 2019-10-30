<template>
  <v-list dense>
    <v-list-item link>
      <v-list-item-icon>
        <v-icon large>whatshot</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title @click="signOutUser">Cerrar sesión</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>








<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  props: {
    user: null
  },
  methods: {
    signOutUser: function() {
      if (this.user) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push({
              name: "home"
            });
          });
      }
    }
  }
};
</script>