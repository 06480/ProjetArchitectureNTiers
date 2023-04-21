<template>
  <div class="icon-homepage">
    <img class="trinquons"  src="/icon_homepage.png" alt="Trinquons !">
    <img class="icon-ubeer" src="/Ubeer_icon.png" alt="les étudiants">
    <div class="studiants">
      <p>Julien LEDOUX</p>
      <p>Paul MESSIANT</p>
      <p>Kristen BELKADI</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeContent"
};
</script>
<style>
.icon-homepage {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.trinquons {
    width: 40%;
}
.icon-ubeer {
    width: 10%;
    margin: 2em;
    border-radius: 1em;
    border: 5px groove white;
}
.studiants {
  width: 100%;
  font-size: 0.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
}
</style>