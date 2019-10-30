<template>
  <v-btn @click="signOutUser" text>Cerrar sesión</v-btn>
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