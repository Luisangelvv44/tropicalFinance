<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ isCreate ? "Crear" : "Actualizar"}} calculo</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="close()">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <IonGrid>
                <ion-row><ion-col size="12">
                    <ion-input label="Titulo" labelPlacement="floating" type="text" id="titulo" fill="outline"
                        v-model="calc.title" />
                </ion-col></ion-row>
                <ion-row><ion-col size="12">
                    <ion-input label="Costo" labelPlacement="floating" type="number" id="cost" fill="outline"
                        v-model="calc.cost" />
                </ion-col></ion-row>
                <ion-row class="mt-3"><ion-col size="12">
                    <ion-checkbox id="spend" v-model="calc.spend">Es gasto?</ion-checkbox>
                </ion-col></ion-row>
                <ion-row class="mt-3"><ion-col size="12">
                    <ion-checkbox id="recurrent" v-model="calc.recurrent">Es recurrente?</ion-checkbox>
                </ion-col></ion-row>
                <!-- <ion-row><ion-col size="12">
                    <ion-input label="" labelPlacement="floating" type="" id="" v-model="" />
                </ion-col></ion-row> -->
                <ion-row class="mt-3"><ion-col size="12">
                    <ion-button color="success" @click="clickAction()">
                        {{ isCreate ? "Crear" : "Actualizar"}}
                    </ion-button>
                </ion-col></ion-row>
            </IonGrid>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { Calc, findCalcById } from '@/services/calcService';
    import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonGrid,
        IonRow, IonCol, IonInput, IonCheckbox } from '@ionic/vue';

    export default defineComponent({
        components: { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonGrid,
            IonRow, IonCol, IonInput, IonCheckbox },
        data() {
            return {
                calc: {} as Calc
            }
        },
        props: {
            isOpen: Boolean,
            isCreate: Boolean,
            id: '' as any
        },
        watch: {
            isOpen: "searchCalc"
        },
        methods: {
            close() {
                this.calc = new Calc("", true, false, 0, 0)
                this.$emit("closeEvent", false)
            },
            clickAction() {
                if(this.isCreate) {
                    this.crear()
                } else {
                    this.actualizar()
                }
            },
            crear() {
                this.calc.save().then((res) => {
                    this.close()
                })
            },
            actualizar() {
                this.calc.update({}).then((res) => {
                    this.close()
                })
            },
            searchCalc() {
                if (this.id) {
                    findCalcById(this.id).then((res) => {
                        this.calc = res[0]
                    })
                }
                if (this.isCreate) {
                    this.calc = new Calc("", true, false, 0, 0)
                }
            },
        },
    })
</script>

<style>
    .mt-3{
        margin-top: 1rem;
    }
</style>