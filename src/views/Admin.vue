<template>
  <v-app>
    <NavBar v-bind:user="userLinks" />
    <v-container class="grey lighten-5">
      <v-row wrap>
        <v-col cols="12" md="6" offset-md="3">
          <h1>Administrador: {{nombre}} {{apellidoP}} {{apellidoM}}</h1>
        </v-col>
        <v-col cols="12" md="6" offset-md="3">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="filtro" label="Filtrar alumno (nombre)"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="8" offset-md="2">
          <v-card>
            <v-card-title>Informacion del semestre</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Inicio del Semestre</th>
                      <th class="text-left">Fin de semestre</th>
                      <th class="text-left">Alumnos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        v-if="true && infoSemestre.length >0"
                      >{{formatDate(infoSemestre[0].fechaInicio.seconds)}}</td>
                      <td
                        v-if="true && infoSemestre.length >0"
                      >{{formatDate(infoSemestre[0].fechaFin.seconds)}}</td>
                      <td>{{ students.length }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <h2 color="black">Acciones</h2>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Activar a todos</th>
                      <th class="text-left">Desactivar a todos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <v-btn @click="activarAll" block color="success" dark>Activar</v-btn>
                      </td>
                      <td>
                        <v-btn @click="desactivarAll" block color="error" dark>Desactivar</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="10" offset-md="1">
          <v-expansion-panels>
            <v-expansion-panel v-for="(student, i) in filteredStundents" :key="i">
              <v-expansion-panel-header class="title">
                <p
                  :class="[student.activo ? 'green--text' : '', 'red--text']"
                >{{student.nombre}} {{student.apellidoP}} {{student.apellidoM}}</p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row align="center" justify="center">
                  <v-col cols="12" md="4">
                    <h3>{{student.carrera}}</h3>
                    <h5>{{student.semestre}}° semestre</h5>
                    <h5>Número de control: {{student.ncontrol}}</h5>
                    <h5>Email: {{student.email}}</h5>
                    <h5>Status: {{student.activo ? 'Permitido': 'No permitido'}}</h5>
                    <h5>Qr de acceso</h5>
                  </v-col>
                  <v-col cols="12" md="2" class="d-flex justify-center">
                    <v-img :src="student.qrcode" aspect-ratio="1" max-width="500" max-height="500"></v-img>
                  </v-col>
                  <v-col cols="12" md="2" class="d-flex justify-center">
                    <v-img
                      :src="student.imgProfile"
                      aspect-ratio="1"
                      max-width="200"
                      max-height="200"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-btn
                      @click="desactivarAccess(student.ncontrol)"
                      block
                      color="red"
                      dark
                    >Remover Acceso</v-btn>
                    <v-btn
                      @click="activarAccess(student.ncontrol)"
                      block
                      color="success"
                      dark
                      class="mt-4"
                    >Habilitar Acceso</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "../components/layout/NavBar";
import firebase, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from "../firebaseInit";
import router from "vue-router";
import moment from "moment";
import QRCode from "qrcode";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      nombre: null,
      apellidoP: null,
      apellidoM: null,
      email: null,
      students: [],
      filtro: "",
      carreras: [
        "Ninguno",
        "Ing. Sistemas computacionales",
        "Ing. Materiales",
        "Ing. Mecanica",
        "Ing. Industrial",
        "Ing. Logistica",
        "Ing. Gestion empresarial"
      ],
      semestres: ["Ninguno", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      carrera: null,
      semestre: null,
      infoSemestre: []
    };
  },
  methods: {
    resetStudents: function() {
      this.students = [];
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().rol != "admin") {
              this.students.push(doc.data());
            }
          });
        });
    },
    formatDate: function(f) {
      //1566190800
      return moment.unix(f).format("MMM Do YY");
    },
    toBaseEncode: function(s, status) {
      const b = new Buffer(`${s};${status}`);
      let imageCode = null;
      QRCode.toDataURL(
        b.toString("base64"),
        {
          version: 5,
          width: 500
        },
        function(err, url) {
          imageCode = url;
        }
      );
      if (imageCode) {
        return imageCode;
      }
    },
    activarAll: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().rol != "admin") {
              const imageCode = this.toBaseEncode(doc.data().ncontrol, "true");
              const alumnoRef = db.collection("users").doc(doc.id);
              alumnoRef.update({
                activo: true,
                qrcode: imageCode
              });
            }
          });
        })
        .finally(e => {
          this.resetStudents();
        });
    },
    desactivarAll: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().rol != "admin") {
              const imageCode = this.toBaseEncode(doc.data().ncontrol, "false");
              const alumnoRef = db.collection("users").doc(doc.id);
              alumnoRef.update({
                activo: false,
                qrcode: imageCode
              });
            }
          });
        })
        .finally(e => {
          this.resetStudents();
        });
    },
    activarAccess: function(ncontrol) {
      const s = db
        .collection("users")
        .where("ncontrol", "==", ncontrol)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const imageCode = this.toBaseEncode(doc.data().ncontrol, "true");
            const userRef = db.collection("users").doc(doc.id);
            userRef.update({
              activo: true,
              qrcode: imageCode
            });
          });
        })
        .finally(e => {
          this.resetStudents();
        });
    },
    desactivarAccess: function(ncontrol) {
      const s = db
        .collection("users")
        .where("ncontrol", "==", ncontrol)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const imageCode = this.toBaseEncode(doc.data().ncontrol, "false");
            const userRef = db.collection("users").doc(doc.id);
            userRef.update({
              activo: false,
              qrcode: imageCode
            });
          });
        })
        .finally(e => {
          this.resetStudents();
        });
    }
  },
  props: {
    id: null,
    user: null,
    userLinks: null
  },
  computed: {
    filteredStundents: function() {
      const self = this;
      return this.students.filter(function(cust) {
        return (
          cust.nombre.toLowerCase().indexOf(self.filtro.toLowerCase()) >= 0 ||
          cust.apellidoP.toLowerCase().indexOf(self.filtro.toLowerCase()) >=
            0 ||
          cust.apellidoM.toLowerCase().indexOf(self.filtro.toLowerCase()) >= 0
        );
      });
    }
  },
  beforeMount() {
    if (this.userLinks == null) {
      this.$router.push({
        name: "home"
      });
    }
    this.nombre = this.user.nombre;
    this.apellidoP = this.user.apellidoP;
    this.apellidoM = this.user.apellidoM;
    this.email = this.user.email;
  },
  beforeCreate() {
    db.collection("semestre")
      .get()
      .then(semestres => {
        semestres.forEach(s => {
          this.infoSemestre.push(s.data());
        });
      });

    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().rol != "admin") {
            this.students.push(doc.data());
          }
        });
      });
  }
};
</script>