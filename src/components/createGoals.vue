<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>Crear metas</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="close()">Cerrar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <IonGrid>
                <ion-row><ion-col size="12">
                    <ion-input label="Titulo" labelPlacement="floating" type="text" id="titulo" fill="outline"
                        v-model="title" />
                </ion-col></ion-row>
                <ion-row><ion-col size="12">
                    <ion-input label="Costo" labelPlacement="floating" type="number" id="cost" fill="outline"
                        v-model="cost" />
                </ion-col></ion-row>
                <ion-row class="mt-3"><ion-col size="12">
                    <ion-button color="success" @click="createAction()">Crear</ion-button>
                </ion-col></ion-row>
            </IonGrid>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { saveGoals } from '@/services/goalService';
    import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonGrid,
        IonRow, IonCol, IonInput } from '@ionic/vue';

    export default defineComponent({
        components: { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonGrid,
            IonRow, IonCol, IonInput },
        props: {
            isOpen: Boolean
        },
        data() {
            return {
                title: "" as string,
                cost: 0 as number,
            }
        },
        methods: {
            createAction() {
                saveGoals(this.title, this.cost).then(() => {
                    this.close()
                })
            },
            close() {
                this.title = ""
                this.cost = 0
                this.$emit("closeEvent", false)
            }
        },
    })
</script>