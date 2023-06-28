<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
  defineProps({
    title: String,
  });
</script>

<style>
  ion-title{
    text-align: center;
  }

  ion-toolbar{
    --background: green;
    --color: #fff;
  }
</style>