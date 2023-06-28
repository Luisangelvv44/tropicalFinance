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
                            placeholder="Introduce el nombre"></ion-input>
                    </ion-item>
                    <!-- <ion-item>
                        <ion-input label="Nombre" labelPlacement="floating" 
                            placeholder="Introduce el nombre"></ion-input>
                    </ion-item> -->
                    <ion-item>
                        <ion-input label="Sueldo mensual" labelPlacement="floating" 
                            placeholder="Introduce el sueldo" type="number"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label="Cuotas mensuales" labelPlacement="floating" 
                            placeholder="Introduce las cuotas" type="number"></ion-input>
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

    export default defineComponent({
        components: { IonInput, IonItem, IonList },
        methods: {
            onclickGuardar(){
                console.log('hola');
            }
        }
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
    }

    .ion-button{
        --background: green;
        --color: #fff;
        margin-top: 2rem
    }
</style>