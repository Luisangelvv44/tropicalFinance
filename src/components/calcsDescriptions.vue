<template>
    <ion-card>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="4">Gastos: <span class="color-gastos">{{ expenses }}</span></ion-col>
                    <ion-col size="4">Ahorros: <span class="color-ahorros">{{ savings }}</span></ion-col>
                    <ion-col size="4">Sobrante: <span class="color-sobrantes">{{ freeMoney }}</span></ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { filterCalcs } from '@/services/calcService';
    import { getAction } from '@/services/configurationService';
    import { IonCard, IonCardContent, IonTitle, IonCol, IonGrid, IonRow, } from '@ionic/vue';

    export default defineComponent({
        components: { IonCard, IonCardContent, IonTitle, IonCol, IonGrid, IonRow, },
        props: {
            updater: Boolean
        },
        watch: {
            updater: "getDataInsets"
        },
        data() {
            return {
                expenses: 0 as number,
                freeMoney: 0 as number,
                savings: 0 as number,
            }
        },
        methods: {
            getDataInsets() {
                filterCalcs({ recurrent: true, spend: true }).then((res) => {
                    this.expenses = res.data
                        .map((doc: any) => Number(doc.cost))
                        .reduce((acc: number, val: number) => acc + val, 0)
                    
                    getAction({}).then((conf) => {
                        conf.data.sort((a: any, b: any) => { return a.id < b.id ? 1 : -1 });
                        let salary = conf.data[0].salary
                        this.savings = conf.data[0].savings

                        this.freeMoney = (salary || 0) - (this.expenses || 0) - (this.savings || 0)
                    })
                })
            }
        },
        mounted() {
            this.getDataInsets()
        },
    })
</script>

<style>
    .color-gastos{
        color: rgb(179, 28, 28);
    }
    .color-ahorros{
        color: rgb(0, 204, 0);
    }
    .color-sobrantes{
        color: rgb(15, 90, 15);
    }
</style>