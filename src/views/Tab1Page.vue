<template>
  <ion-page>

    <headerComponent title="Inicio"></headerComponent>

    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 1 page" />
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import headerComponent from '@/components/headerComponent.vue'
</script>

<style></style>
