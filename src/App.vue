<script>
import viewList from "./components/viewList.vue";
import createList from "./components/createList.vue";
import list from "../list";

export default {
  name: "App",
  components: {
    viewList,
    createList,
  },
  data() {
    return {
      users: [],
      peopleList: list.people, // Передача данных из list.json в viewList
    };
  },
  mounted() {
    this.$store.dispatch("loadUsersFromList"); // загружаем пользоватлей из листа
  },
  methods: {
    addNewUser(payload) {
      this.users.push(payload);
    }, // передаем событие о добавлении нового пользователя в store
    editNoteClick(id) {
      this.$store.dispatch("editNote", id);
    }, // передаем событие о редактировании в store
    deleteNoteClick(item) {
      const index = this.peopleList.findIndex(
        (person) => person.id === item.id
      );
      if (index !== -1) {
        this.peopleList.splice(index, 1); // Удаляем существующую запись
      } else {
        const newUserIndex = this.users.findIndex(
          (user) => user.id === item.id
        );
        if (newUserIndex !== -1) {
          this.users.splice(newUserIndex, 1); // Удаляем новую запись
        }
      }
      // this.$store.dispatch("deleteNote", item); // тут должна быть передача об удалении в store
    },
  },
};
</script>

<template>
  <div>
    <viewList
      :users="users"
      :peopleList="peopleList"
      @updatePerson="editNoteClick"
      @deleteNote="deleteNoteClick"
    />
    <!-- отображаем компонент   c польхователями, полученными  их json файлй. Подписываемся на события удаления и обновления данных. Получаем через props значения users, peopleList -->
    <createList @addNewUser="addNewUser" />
    <!-- отображаем компонент  добавления нового пользователя -->
  </div>
</template>
