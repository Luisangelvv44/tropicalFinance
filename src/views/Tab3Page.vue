<template>
  <ion-page>

    <headerComponent title="Configuraciones"></headerComponent>

    <ion-content :fullscreen="true">
      <configurationContentComponent></configurationContentComponent>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import headerComponent from '@/components/headerComponent.vue';
  import configurationContentComponent from '@/components/configurationContentComponent.vue'
</script>
