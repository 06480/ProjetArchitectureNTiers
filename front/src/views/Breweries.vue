<template>
    <v-text-field
      label="entrer le nom d'une brasserie"
      v-model="saisieUtilisateurBreweries"
      @input="construireListeBreweriesFiltre"
    ></v-text-field>
    <ul v-for="brewerie in listeBreweriesFiltre">
      <v-card>
        <v-card-title>
          {{ brewerie["name"] }}
        </v-card-title>
        <v-card-item>
        {{ brewerie["address"] }}
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
        listeBreweries: [],
        listeBreweriesFiltre: [],
        saisieUtilisateurBreweries: "",
      };
    },
    created() {
      this.initalisation();
    },
    methods: {
      construireListeBreweriesFiltre(){
        this.listeBreweriesFiltre = this.listeBreweries.filter(e => {
          let brand:string = e["brand"];
          return  brand.toLowerCase().startsWith(this.saisieUtilisateurBreweries.toLowerCase());
        });
  
      },
      async initalisation() {
        let token = await this.$auth0.getAccessTokenSilently();
  
        console.log(token);
  
        axios
          .get("https://ubeer.onrender.com/breweries", {
            headers: {
              authorization: "Bearer " + token,
            },
          })
          .then((reponse) => {
            console.log("oui");
            this.listeBreweries = reponse.data;
            this.listeBreweriesFiltre = this.listeBreweries;
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
  