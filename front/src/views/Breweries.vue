<template>
  <!-- barre de recherche -->
  <v-text-field
    class="searchbar"
    v-if="token !== ''"
    label="entrer le nom d'une brasserie"
    v-model="saisieUtilisateurBreweries"
    @input="construireListeBreweriesFiltre"
  ></v-text-field>

  <!-- bouton d'ajout de brasserie -->
  <v-btn
    v-if="token !== ''"
    class="button-addbrasserie"
    @click="showForm = !showForm"
    id="btn-add"
  >
    Ajout d'une brasserie
  </v-btn>
  <!-- formulaire d'ajout de brasserie -->
  <v-sheet v-show="showForm" v-if="token !== ''" width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="name" label="Nom"></v-text-field>

      <v-text-field v-model="address" label="Adresse"></v-text-field>

      <v-btn id="btn" @click="createBrewery" type="submit" block class="mt-2"
        >Submit</v-btn
      >
    </v-form>
  </v-sheet>

  <!-- liste des brasseries -->
  <ul v-for="brewery in listeBreweriesFiltre">
    <v-card>
      <v-btn>
        <trash-icon @click="deleteBrewery(brewery['_id'])"></trash-icon>
      </v-btn>
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
      showForm: false,
      listeBreweries: [],
      listeBreweriesFiltre: [],
      saisieUtilisateurBreweries: "",
      name: "",
      address: "",
      token: "",
    };
  },
  async created() {
    this.initalisation();
    this.token = await this.$auth0.getAccessTokenSilently();
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
    async deleteBrewery(idBrewery: number) {
      let token = await this.$auth0.getAccessTokenSilently();

      axios
        .delete(`https://ubeer.onrender.com/breweries/delete/${idBrewery}`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .catch((error) => {
          console.log("-".repeat(50));
          console.log(error);
          console.log("-".repeat(50));
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
<style>
.button-addbrasserie {
  width: 100%;
  margin: 1em 0;
}searchbar
#btn-add:hover span {
  background: rgba(220, 220, 220, 0.2);
  font-weight: bold;
  content: "Ajout d'une brasserie";
}
.searchbar:hover {
  background: rgba(176, 196, 222, 0.2);
  font-weight: bold;
  content: "entrer le nom d'une brasserie";
}
</style>
