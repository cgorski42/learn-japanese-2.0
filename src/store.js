import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
  return { headers: {'Authorization': localStorage.getItem('token')}};
}

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    loginError: '',
    registerError: '',

    userView: [],
    question:"n/a",
    answer: 0,
    
    options: ["n/a","n/a","n/a","n/a"],
    optColors: ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"],
  },
  getters: {
    user: state => state.user,
    userView: state=> state.userView,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === '')
        return false;
      return true;
    },
    loginError: state => state.loginError,
    registerError: state => state.registerError,
   
    question: state => state.question,
    options: state=>state.options,
    optColors: state=>optColors,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setToken (state, token) {
      state.token = token;
      if (token === '')
	localStorage.removeItem('token');
      else
	localStorage.setItem('token', token)
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setUserView (state, user) {
      state.userView = user;
    },
    setQuestion (state, q) {
      state.question = q;
    },
    setOptions (state, o) {
      state.options = o;
    },
    setOptColors (state, colors) {
      state.optColors = colors;
    },
  },
  actions: {
    // Initialize //
    initialize(context) {
      let token = localStorage.getItem('token');
      if (token) {
        // see if we can use the token to get my user account
        axios.get("/api/me",getAuthHeader()).then(response => {
          context.commit('setToken',token);
          context.commit('setUser',response.data.user);
        }).catch(err => {
	      // remove token and user from state
	      context.commit('setUser',{});	
	      context.commit('setToken','');
	    });
      }
    },
    // Registration, Login //
    register(context,user) {
      return axios.post("/api/users",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setToken',response.data.token);
        context.commit('setRegisterError',"");
        context.commit('setLoginError',"");
        
        //context.dispatch('getFollowing'); TODO: Replace these with a getStats
        //context.dispatch('getFollowers');
      }).catch(error => {
        context.commit('setUser',{});	
        context.commit('setToken','');
        context.commit('setLoginError',"");
        if (error.response) {
          if (error.response.status === 403)
            context.commit('setRegisterError',"That email address already has an account.");
          else if (error.response.status === 409)
            context.commit('setRegisterError',"That user name is already taken.");
          return;
        }
        context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
    login(context,user) {
      return axios.post("/api/login",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setToken',response.data.token);
        context.commit('setRegisterError',"");
        context.commit('setLoginError',"");
        
        //context.dispatch('getFollowing'); TODO: Replace these with a getStats
        //context.dispatch('getFollowers');
      }).catch(error => {
        context.commit('setUser',{});
        context.commit('setToken','');
        context.commit('setRegisterError',"");
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 400)
            context.commit('setLoginError',"Invalid login.");
          context.commit('setRegisterError',"");
          return;
        }
        context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setToken','');
    },
    
    // Users //
    // get a user, must supply {username: username} of user you want to get
    getUser(context,user) {
      return axios.get("/api/users/" + user.id).then(response => {
        context.commit('setUserView',response.data.user);
      }).catch(err => {
        console.log("getUser failed:",err);
      });
    },
    
    checkAnswer(context, user) {
        // TODO implement this
    },    
  }
});
