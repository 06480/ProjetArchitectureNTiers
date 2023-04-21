<template>
  <!-- barre de recherche -->
  <v-text-field
    label="entrer le nom d'une brasserie"
    v-model="saisieUtilisateurBreweries"
    @input="construireListeBreweriesFiltre"
  ></v-text-field>

  <div class="dropdown-menu dropdown-menu-right">
    <div class="dropdown-header">AJOUTER UNE BRASSERIE</div>
    
    <!-- formulaire d'ajout de brasserie -->
    <v-sheet width="300" class="mx-auto dropdown-item">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="name" label="Nom"></v-text-field>

        <v-text-field v-model="address" label="Adresse"></v-text-field>

        <v-btn id="btn" @click="createBrewery" type="submit" block class="mt-2"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </div>

  <!-- liste des brasseries -->
  <ul v-for="brewery in listeBreweriesFiltre">
    <v-card>
      <v-card-title>
        {{ brewery["name"] }}
      </v-card-title>
      <v-card-item>
        {{ brewery["address"] }}
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
      name: "",
      address: "",
    };
  },
  created() {
    this.initalisation();
  },
  methods: {
    construireListeBreweriesFiltre() {
      this.listeBreweriesFiltre = this.listeBreweries.filter((e) => {
        let name: string = e["name"];
        return name
          .toLowerCase()
          .startsWith(this.saisieUtilisateurBreweries.toLowerCase());
      });
    },
    async createBrewery() {
      let token = await this.$auth0.getAccessTokenSilently();

      if (this.name !== "" && this.address !== "")
        axios
          .post(
            "https://ubeer.onrender.com/breweries/create",
            {
              name: this.name,
              address: this.address,
            },
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then((r) => {
            console.log("createbrewery");
            location.reload();
          })
          .catch((error) => {
            console.log("-".repeat(50));
            console.log(error);
            console.log("-".repeat(50));
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
