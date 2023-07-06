<template>
  <ion-page>

    <headerComponent title="Cálculos"></headerComponent>

    <ion-content :fullscreen="true">
      <calcContentComponent></calcContentComponent>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import headerComponent from '@/components/headerComponent.vue'
  import calcContentComponent from '@/components/calcContentComponent.vue';
</script>
