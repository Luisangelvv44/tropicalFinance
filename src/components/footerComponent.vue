<template>
    <div class="container">
        <ion-tab-bar slot="bottom">
            <ion-tab-button tab="tab1" href="/tabs/tab1">
                <ion-icon aria-hidden="true" :icon="home" />
                <ion-label>Inicio</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab2" href="/tabs/tab2">
                <ion-icon aria-hidden="true" :icon="calculator" />
                <ion-label>Cálculos</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab3" href="/tabs/tab3">
                <ion-icon aria-hidden="true" :icon="cog" />
                <ion-label>Configuración</ion-label>
            </ion-tab-button>
        </ion-tab-bar>
    </div>
</template>

<script setup lang="ts">
    import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
    import { calculator, home, cog } from 'ionicons/icons';
</script>

<style>
    .tab-selected{
        color: green;
        border-bottom: solid 2px;
        transition: color .5s ease-in;
    }
</style>