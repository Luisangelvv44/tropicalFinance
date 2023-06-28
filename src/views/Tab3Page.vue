<template>
  <ion-page>

    <headerComponent title="Configuraciones"></headerComponent>

    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 3 page" />
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import headerComponent from '@/components/headerComponent.vue';
</script>
