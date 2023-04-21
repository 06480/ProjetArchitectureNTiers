<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="brand" label="Brand"></v-text-field>

      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-text-field
        v-model="volume"
        label="Volume"
        :rules="volumeRules"
      ></v-text-field>

      <v-btn id="btn" @click="createBeer" type="submit" block class="mt-2"
        >Submit</v-btn
      >
      <v-btn
        id="btnSuppression"
        @click="deleteBeer"
        type="submit"
        block
        class="mt-2"
      >
        delete (from name)
      </v-btn>
    </v-form>
  </v-sheet>
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
      <v-card-item> volume: {{ biere["volume"] }} cl </v-card-item>
    </v-card>
  </ul>
</template>
<script lang="ts">
import { AUTH0_TOKEN } from "@auth0/auth0-vue/dist/typings/token";
import { stringifyExpression } from "@vue/compiler-core";
import axios from "axios";
//import { useAuth0 } from '@auth0/auth0-vue';
export default {
  name: "profile-view",
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
    };
  },
  created() {
    this.initalisation();
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
    async deleteBeer() {
      let token = await this.$auth0.getAccessTokenSilently();
      let idBierre: number;
      axios
        .get("https://ubeer.onrender.com/beers", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((reponse) => {
          console.log(reponse.data)
          idBierre = reponse.data.filter((e: any) => e["brand"])[0];
          console.log(idBierre);
        })
        .then(async (e) => {
          axios
            .delete(`https://ubeer.onrender.com/beers/delete/${idBierre}`, {
              headers: {
                authorization: "Bearer " + token,
              },
            })
            .then((e) => console.log(e));
        });
    },
    async createBeer() {
      let token = await this.$auth0.getAccessTokenSilently();

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
          window.location.href = "https://ubeer12.netlify.app/#/beers";
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
</style>
