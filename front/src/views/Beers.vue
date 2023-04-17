<template>
  <v-text-field
    label="entrer le nom d'une bière"
    v-model="saisieUtilisateurBierre"
    @input="construireListeBieresFiltre"
  ></v-text-field>
  <ul v-for="biere in listeBieresFiltre">
    <v-card>
      <v-card-title>
        {{ biere["brand"] }}
      </v-card-title>
      <v-card-item>
      {{ biere["description"] }}
      </v-card-item>
      <v-card-item>
        volume: {{ biere["volume"] }} cl
      </v-card-item>
    </v-card>
  </ul>
</template>
<script lang="ts">
import axios from "axios";
//import { useAuth0 } from '@auth0/auth0-vue';
export default {
  name: "profile-view",
  data() {
    return {
      listeBieres: [],
      listeBieresFiltre: [],
      saisieUtilisateurBierre: "",
    };
  },
  created() {
    this.initalisation();
  },
  methods: {
    construireListeBieresFiltre(){
      this.listeBieresFiltre = this.listeBieres.filter(e => {
        let brand:string = e["brand"];
        return  brand.toLowerCase().startsWith(this.saisieUtilisateurBierre.toLowerCase());
      });

    },
    async initalisation() {
      let token = await this.$auth0.getAccessTokenSilently();

      console.log(token);

      axios
        .get("https://ubeer.onrender.com/beers", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((reponse) => {
          console.log("oui");
          this.listeBieres = reponse.data;
          this.listeBieresFiltre = this.listeBieres;
        })
        .catch((error) => {
          console.log("----------------------- erreur -----------------------");
          console.log(error);
          console.log("----------------------- erreur -----------------------");
        });
    },
  },
};
</script>
