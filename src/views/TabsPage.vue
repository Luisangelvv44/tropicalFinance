<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <footer-component></footer-component>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
  import footerComponent from '@/components/footerComponent.vue'
</script>
