import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      users: [],
      editNote: null,
      editMode: {},
    };
  },
  mutations: {
    deleteUser(state, index) {
      state.users.splice(index, 1);
      console.log("User deleted at index:", index);
    },
    addUser(state, payload) {
      state.users.push(payload); // Add the new user to the users array
      console.log("User added:", payload);
    },

    loadUsers(state, payload) {
      state.users = payload;
      console.log("Users loaded:", payload);
    },
    setEditNote(state, noteId) {
      state.editNote = noteId;
      console.log("Note editing started:", noteId);
    },
  },
  actions: {
    addNewUser({ commit }, payload) {
      console.log("Adding user:", payload);
      commit("addUser", payload);
    },

    async loadUsersFromList({ commit }) {
      try {
        const response = await axios.get("../list");
        const users = response.data.people;
        commit("loadUsers", users);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    },
    editNote({ commit }, noteId) {
      commit("setEditNote", noteId);
    },
    deleteNote({ commit }, index) {
      commit("deleteUser", index);
    },
  },
  getters: {
    getUsers: (state) => state.users,
  },
});

export default store;
