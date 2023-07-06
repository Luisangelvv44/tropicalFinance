<template>
    <div id="container">
        <ion-refresher slot="fixed" @ionRefresh="refreshingData($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <calcsDescriptions :updater="updaterCalcs"></calcsDescriptions>
        <viewGoals :updater="updaterGoals"></viewGoals>
        <ion-card v-if="!calcs.length">
            <ion-card-content>
                <ion-title>No hay cálculos</ion-title>
            </ion-card-content>
        </ion-card>
        <IonCard v-for="calc in calcs" class="animate__animated animate__bounceIn">
            <IonCardContent>
                <ion-list>
                    <ion-item-sliding>
                        <ion-item>
                            <IonTitle>{{ calc.title }}</IonTitle>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option color="success" @click="setUpdateCalc(calc.id)">
                                <ion-icon slot="icon-only" :icon="edit"></ion-icon>
                            </ion-item-option>
                            <ion-item-option color="danger" @click="deleteCalc(calc)">
                                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="5">
                            Costo: 
                            <span :class="{ 'costS': !calc.spend, 'costD': calc.spend }">${{ calc.cost }}</span>
                        </IonCol>
                        <IonCol size="3" v-if="calc.recurrent">
                            <IonIcon size="5" aria-hidden="true" :icon="pin"></IonIcon>
                        </IonCol>
                        <IonCol size="4" v-if="calc.recurrent && calc.dayOfMonthRecurrent">
                            <IonIcon size="5" aria-hidden="true" :icon="calendar"></IonIcon>
                            <span>{{ calc.dayOfMonthRecurrent }}</span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
        <ion-fab slot="fixed" horizontal="end" vertical="top" class="create-calc">
            <ion-fab-button color="success">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="bottom">
                <ion-fab-button class="animate__animated animate__fadeInDown" @click="setCreateCalc()">
                    <ion-icon :icon="cardOutline"></ion-icon>
                </ion-fab-button>
                <ion-fab-button class="animate__animated animate__fadeInDown delay-05" @click="setModalGoals(true)">
                    <ion-icon :icon="rocket"></ion-icon>
                </ion-fab-button>
            </ion-fab-list>
        </ion-fab>
        <createUpdateCalcs :is-open="isOpen" :is-create="isCreate" :id="idUpdate" @closeEvent="closeModalCalc()"></createUpdateCalcs>
        <createGoals :is-open="isOpenGoals" @closeEvent="closeGoals()"></createGoals>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Calc, getCalcs } from '@/services/calcService';
    import { IonCard, IonCardContent, IonTitle, IonIcon, IonCol, IonGrid, IonRow,
        IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonFabButton,
        IonFabList, IonFab, IonRefresher, IonRefresherContent } from '@ionic/vue';
    import { refreshCircleOutline, calendar, createOutline, trashOutline, add, cardOutline, rocketOutline } from 'ionicons/icons';
    import createUpdateCalcs from "@/components/createUpdateCalc.vue"
    import calcsDescriptions from "@/components/calcsDescriptions.vue"
    import viewGoals from "@/components/viewGoals.vue"
    import createGoals from "@/components/createGoals.vue"

    export default defineComponent({
        components: { IonCard, IonCardContent, IonTitle, IonIcon, IonCol, IonGrid, IonRow, 
            IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, createUpdateCalcs, IonFabButton,
            IonFabList, IonFab, calcsDescriptions, viewGoals, createGoals, IonRefresher, IonRefresherContent },
        data() {
            return {
                pin: refreshCircleOutline, calendar: calendar, edit: createOutline, trash: trashOutline,
                add: add, cardOutline: cardOutline, rocket: rocketOutline,
                calcs: [] as Array<Calc>,
                isOpen: false as boolean,
                isOpenGoals: false as boolean,
                isCreate: true as boolean,
                idUpdate: '' as any,
                updaterGoals: false,
                updaterCalcs: false
            }
        },
        methods: {
            getData() {
                getCalcs().then((data: Array<Calc>) => {
                    this.calcs = data
                })
            },
            setCreateCalc() {
                this.isCreate = true
                this.setModalCalc(true)
            },
            setUpdateCalc(id: any) {
                this.idUpdate = id
                this.isCreate = false
                this.setModalCalc(true)
            },
            closeModalCalc() {
                this.updaterGoals = !this.updaterGoals
                this.updaterCalcs = !this.updaterCalcs
                this.idUpdate = ""
                this.setModalCalc(false)
                this.getData()
            },
            setModalCalc(state: boolean) {
                this.isOpen = state
            },
            deleteCalc(calc: Calc) {
                let willDelete = window.confirm("seguro que desea eliminar este calculo?")
                if (willDelete) {
                    calc.remove().then((data: Array<Calc>) => {
                        this.calcs = [...data]
                    })
                }
            },
            closeGoals() {
                this.updaterGoals = !this.updaterGoals
                this.setModalGoals(false)
            },
            setModalGoals(state: boolean) {
                this.isOpenGoals = state
            },
            refreshingData(event: CustomEvent) {
                this.updaterCalcs = !this.updaterCalcs
                this.updaterGoals = !this.updaterGoals
                setTimeout(() => {
                    event.target?.complete();
                }, 1000);
            },
        },
        mounted() {
            this.getData()
        },
    })
</script>

<style>
    @import "../styles/generic.css";
    @import "../../node_modules/animate.css/animate.css";

    .costS{
        color: green;
    }
    .costD{
        color: red;
    }
    .create-calc{
        margin: 3.5rem 0 0 0;
    }
    ion-icon{
        font-size: 1.8rem;
    }
    .delay-05 {
        animation-delay: .25s;
    }
</style>