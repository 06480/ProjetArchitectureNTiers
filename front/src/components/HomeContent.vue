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
}
.trinquons {
    width: 40%;
}
.icon-ubeer {
    width: 10%;
}
.studiants {
  width: 100%;
  font-size: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>