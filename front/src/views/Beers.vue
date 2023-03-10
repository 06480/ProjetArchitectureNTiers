<template>
  <ul v-for="biere in listeBieres">
  <li>
    marque de la bière: {{ biere["brand"] }}
  </li>
  <li>
    volume: {{ biere["volume"] }}
  </li>
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
    };
  },
  created() {
    this.initalisation();
  },
  methods: {
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
          console.log("oui")
          this.listeBieres = reponse.data;
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
