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
        description: {{ biere["description"] }}
      </v-card-item>
      <v-card-item>
        volume: {{ biere["volume"] }}
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
        console.log(`marque = ${brand}, predicat (${brand} commence par  ${this.saisieUtilisateurBierre}) = ${ brand.startsWith(this.saisieUtilisateurBierre)}`)
         return  brand.startsWith(this.saisieUtilisateurBierre);
      });

    },
    async initalisation() {
      let token = await this.$auth0.getAccessTokenSilently();

      console.log(token);

      axios
        .get("http://localhost:8000/beers/", {
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
