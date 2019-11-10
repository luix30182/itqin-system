<template>
  <v-list dense>
    <v-list-item active-class="orange accent-3" link to="/iniciar">
      <v-list-item-icon>
        <v-icon class="white--text" large>person</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text">Iniciar sesión</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item active-class="orange accent-3" link to="/registro">
      <v-list-item-icon>
        <v-icon class="white--text" large>person_add</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text">Registrarse</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item active-class="orange accent-3" link to="/descargas">
      <v-list-item-icon>
        <v-icon class="white--text" large>cloud_download</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text">Descargas</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>