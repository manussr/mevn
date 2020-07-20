<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
export default {
    data (){
        return{
            email:'',
            password:'',
            errorM:null
        }
    },
    methods:{
        ingresar(){
            //Debeos enviar una petición post al back-end, Se pueden ver los   
            //parametros en los "Controllers" de backen, en este caso "UsuarioController"
            //En la función login
            axios.post('usuario/login',{email: this.email, password: this.password})
            .then(respuesta =>{
                //Se optiene una respuesta del servidor
                return respuesta.data;
            })
            .then(data =>{
                //Si todo va bien, se ejecuta la "acción" "guardarToken"
                //Ver store.js
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name: 'home'});
            })
            .catch(error =>{
                //Si ocurre un error
                this.errorM=null;
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
        }
    }
}
</script>

