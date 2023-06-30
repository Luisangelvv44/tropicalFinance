<template>
    <div id="container">
        <ion-card>
            <ion-card-header>
                <ion-card-title>Datos principales</ion-card-title>
                <ion-card-subtitle>Estos datos se cargaran en los cálculos.</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-item>
                        <ion-input label="Nombre" labelPlacement="floating" 
                            placeholder="Introduce el nombre" id="nameConf" v-model="name"></ion-input>
                    </ion-item>
                    <!-- <ion-item>
                        <ion-input label="Nombre" labelPlacement="floating" 
                            placeholder="Introduce el nombre"></ion-input>
                    </ion-item> -->
                    <ion-item>
                        <ion-input label="Sueldo mensual" labelPlacement="floating" 
                            placeholder="Introduce el sueldo" type="number" id="sueldoConf" v-model="salary"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label="Cuotas mensuales" labelPlacement="floating" 
                            placeholder="Introduce las cuotas" type="number" id="cuotaConf" v-model="cunts"></ion-input>
                    </ion-item>
                </ion-list>
                <ion-button class="ion-button" @click="onclickGuardar">Guardar</ion-button>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
    import { IonInput, IonItem, IonList, IonButton } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { saveAction, getAction, ConfigurationModel } from '@/services/configurationService'

    export default defineComponent({
        components: { IonInput, IonItem, IonList },
        data() {
            return {
                idPerson: '',
                name: '',
                salary: 0 as number,
                cunts: 0 as number,
            }
        },
        methods: {
            onclickGuardar(){
                let conf: ConfigurationModel = { id: this.idPerson, name: this.name, salary: this.salary, cunts: this.cunts }
                saveAction(conf).then((res: any) => {
                    this.getData()
                })
            },
            getData() {
                getAction({}).then((res: any) => {
                    res.data.sort((a: any, b: any) => { return a.id < b.id ? 1 : -1 });
                    this.idPerson = res.data[0]?.id || ''
                    this.name = res.data[0]?.name || ''
                    this.salary = res.data[0]?.salary || ''
                    this.cunts = res.data[0]?.cunts || ''
                })
            }
        },
        mounted() {
            this.getData()
        },
    });
</script>

<style scoped>
    #container {
        background-color: rgb(243, 243, 243);
        height: 100%;
        padding: 4rem .75rem;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        overflow-y: auto;
    }

    .ion-button{
        --background: green;
        --color: #fff;
        margin-top: 2rem
    }
</style>