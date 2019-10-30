<template>
  <v-list dense>
    <v-list-item link to="/iniciar">
      <v-list-item-icon>
        <v-icon large>person</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Iniciar sesión</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/registro">
      <v-list-item-icon>
        <v-icon large>person_add</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Registrarse</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>