import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        usuario: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        }
    },
    //En estas acciones se toman los datos que vienen del token 
    //Recordar que dentro de las acciones, se pueden generar mutaciones
    actions: {
        guardarToken({ commit }, token) {
            commit("setToken", token)
                //Decodificando datos del token
            commit("setUsuario", decode(token))
            localStorage.setItem("token", token)
        },
        autoLogin({ commit }) {
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                //Decodificando datos del token
                commit("setUsuario", decode(token));
            }
            router.push({ name: 'home' });
        },
        //Para salir, debemos elimianr el token del localStorage
        salir({ commit }) {
            commit("setToken", null);
            commit("setUsuario", null);
            //Eliminando token del localStorage
            localStorage.removeItem("token");
            router.push({ name: 'login' });
        }
    }
})