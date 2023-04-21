<template>
  <!-- barre de recherche -->
  <v-text-field
    v-if="token !== ''"
    label="entrer le nom d'une bière"
    v-model="saisieUtilisateurBierre"
    @input="construireListeBieresFiltre"
  >
  </v-text-field>

  <!-- bouton d'ajout de brasserie -->
  <v-btn
    v-if="token !== ''"
    class="button-addbrasserie"
    @click="showForm = !showForm"
    id="btn-add"
  >
    Ajout d'une bière
  </v-btn>

  <!-- formulaire d'ajout de brasserie -->
  <v-sheet v-show="showForm" v-if="token !== ''" width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="brand" label="Marque"></v-text-field>

      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-text-field
        v-model="volume"
        label="Volume"
        :rules="volumeRules"
      ></v-text-field>

      <v-btn id="btn" @click="createBeer" type="submit" block class="mt-2"
        >Submit</v-btn
      >
    </v-form>
  </v-sheet>

  <!-- liste des bières -->
  <ul v-for="biere in listeBieresFiltre">
    <v-card>
      <v-btn>
        <trash-icon @click="deleteBeer(biere['_id'])"></trash-icon>
      </v-btn>
      <v-btn @click="ajoutPanier()"> Ajouter au panier </v-btn>
      <v-card-title>
        {{ biere["brand"] }}
      </v-card-title>
      <v-card-item>
        {{ biere["description"] }}
      </v-card-item>
      <v-card-item> volume: {{ biere["volume"] }} cl </v-card-item>
    </v-card>
  </ul>
</template>

<script lang="ts">
import { AUTH0_TOKEN } from "@auth0/auth0-vue/dist/typings/token";
import { stringifyExpression } from "@vue/compiler-core";
import axios, { Axios } from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
//import { useAuth0 } from '@auth0/auth0-vue';
export default {
  name: "profile-view",
  setup() {
    const auth0 = useAuth0();

    return {
      user: auth0.user,
    };
  },
  data() {
    return {
      listeBieres: [],
      listeBieresFiltre: [],
      saisieUtilisateurBierre: "",
      brand: "",
      description: "",
      volume: "",
      volumeRules: [
        (value: string) => {
          if (value.match(/\b[0-9]+\b/)) {
            return true;
          } else {
            return "le volume doit être seulement un nombre";
          }
        },
      ],
      token: "",
      showForm: false,
    };
  },
  async created() {
    this.initalisation();
    this.token = await this.$auth0.getAccessTokenSilently();
  },
  async mounted() {
    console.log(this.user);
  },
  methods: {
    construireListeBieresFiltre() {
      this.listeBieresFiltre = this.listeBieres.filter((e) => {
        let brand: string = e["brand"];
        return brand
          .toLowerCase()
          .startsWith(this.saisieUtilisateurBierre.toLowerCase());
      });
    },
    async deleteBeer(idBierre: number) {
      let token = await this.$auth0.getAccessTokenSilently();

      axios
        .delete(`https://ubeer.onrender.com/beers/delete/${idBierre}`, {
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
    async createBeer() {
      let token = await this.$auth0.getAccessTokenSilently();

      if (this.brand !== "" && this.description !== "" && this.volume !== "")
        axios
          .post(
            "https://ubeer.onrender.com/beers/create",
            {
              brand: this.brand,
              description: this.description,
              volume: this.volume,
            },
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then((r) => {
            console.log("createbeer");
            location.reload();
          })
          .catch((error) => {
            console.log("-".repeat(50));
            console.log(error);
            console.log("-".repeat(50));
          });
    },
    async ajoutPanier() {},
    async initalisation() {
      let token = await this.$auth0.getAccessTokenSilently();

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

<style>
#btn {
  margin-bottom: 20px;
}
ul {
  padding-left: 0px;
}
#btn-add:hover span {
  background: rgba(220, 220, 220, 0.2);
  font-weight: bold;
  content: "Ajout d'une bière";
}
</style>
