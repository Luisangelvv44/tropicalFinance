<template>
    <IonGrid>
        <IonRow>
            <IonCol size="12" size-md="12" size-sm="12" size-lg="6" size-xl="4" v-for="goal in goals">
                <IonCard class="animate__animated animate__bounceIn">
                    <IonCardContent>
                        <ion-list>
                            <ion-item-sliding>
                                <ion-item>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col size="12">
                                                <span>{{ goal.title }}</span>
                                            </ion-col>
                                            <ion-col size="12">
                                                <span>Costo: {{ goal.cost }}</span>
                                            </ion-col>
                                            <ion-col size="12">
                                                <span>
                                                    Duración: {{ goal.time }} meses ({{ Math.floor(goal.time / 12) }}a {{ goal.time % 12 }}m)
                                                </span>
                                            </ion-col>
                                        </ion-row>
                                    </ion-grid>
                                </ion-item>
                                <ion-item-options side="end">
                                    <ion-item-option color="danger" @click="deleteGoal(goal.id)">
                                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                    </ion-item-option>
                                </ion-item-options>
                            </ion-item-sliding>
                        </ion-list>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    </IonGrid>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { trash } from 'ionicons/icons';
    import { removeGoals, getGoals, formatGoals } from '@/services/goalService';
    import { IonCard, IonCardContent, IonIcon, IonItem, IonItemOption, IonItemOptions, 
        IonItemSliding, IonList, IonGrid, IonRow, IonCol } from '@ionic/vue';
    import { filterCalcs } from '@/services/calcService';
    import { getAction } from '@/services/configurationService';

    export default defineComponent({
        components: { IonCard, IonCardContent, IonIcon, IonItem, IonItemOption, IonItemOptions, 
            IonItemSliding, IonList, IonGrid, IonRow, IonCol },
        props: {
            updater: Boolean
        },
        watch: {
            updater: "getDataInsets"
        },
        data() {
            return {
                trash: trash,
                goals: [] as Array<any>,
                freeMoney: 0 as number,
            }
        },
        methods: {
            deleteGoal(id: any) {
                removeGoals(id).then((res) => {
                    this.goals = [...res]
                })
            },
            getGoalsView() {
                getGoals().then((res) => {
                    this.goals = res.data.map((goal: any) => formatGoals(goal, this.freeMoney))
                })
            },
            getDataInsets() {
                filterCalcs({ recurrent: true, spend: true }).then((res) => {
                    let expenses = res.data
                        .map((doc: any) => Number(doc.cost))
                        .reduce((acc: number, val: number) => acc + val, 0)
                    
                    getAction({}).then((conf) => {
                        conf.data.sort((a: any, b: any) => { return a.id < b.id ? 1 : -1 });
                        let salary = conf.data[0].salary
                        let savings = conf.data[0].savings
                        this.freeMoney = (salary || 0) - (expenses || 0) - (savings || 0)
                        this.getGoalsView()
                    })
                })
            }
        },
        mounted() {
            this.getDataInsets()
        },
    })
</script>