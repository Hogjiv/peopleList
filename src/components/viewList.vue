<script>
export default {
  data() {
    return {
      value: "Initial Value",
      inputValue: "",
    };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    peopleList: {
      type: Array,
      required: true,
    }, // создаем пропсы для передачи данных извне, в данном случае для App
  },
  methods: {
    toggleEditMode(person) {
      person.editMode = !person.editMode;
      console.log("2");
    }, // включить режим редактирования
    cancelEdit(person) {
      person.editMode = false;
    }, // отменить режим редактирования
    confirmNote(person) {
      this.$emit("updatePerson", person);
      //передаем данные в App
      person.editMode = false;
    },
    deleteNote(item, index) {
      if (index < this.peopleList.length) {
        this.$emit("deleteNote", index); // Передаем индекс существующей записи
      } else {
        this.$emit("deleteNote", item); // Передаем объект новой записи
      }
    }, // удаление записи, передаем данные в App
  },
};
</script>

<template>
  <!-- Создаем новую таблицу, в которую подгружаем пользователей из json, а также тех, которых мы сами создали -->
  <table class="table mx-4">
    <thead>
      <tr class="row">
        <th class="col-1">#</th>
        <th class="col-2">Name</th>
        <th class="col-2">Family Name</th>
        <th class="col-2">Experience</th>
        <th class="col-2">Age</th>
        <th class="col-2">Address</th>
        <th class="col-1">Actions</th>
      </tr>
    </thead>

    <tbody>
      <!-- цикл v-for выводит по порядку данные о пользователе, основываясь на json файле и его данных. -->
      <tr v-for="(person, index) in peopleList" :key="person.id" class="row">
        <th class="col-1">{{ index + 1 }}</th>
        <td class="col-2">
          <!-- если edit mode работает (то есть нажата кнопка редактирования), то выводим либо пустой input. Если же режим редактирования не активен, отображается текущее имя -->
          <span v-if="!person.editMode">{{ person.name }}</span>
          <input
            v-else
            type="text"
            v-model="person.name"
            @blur="cancelEdit(person)"
          />
        </td>
        <td class="col-2">
          <span v-if="!person.editMode">{{ person.familyName }}</span>
          <input
            v-else
            type="text"
            v-model="person.familyName"
            @blur="cancelEdit(person)"
          />
        </td>
        <td class="col-2">
          <span v-if="!person.editMode">{{ person.experience }}</span>
          <input
            v-else
            type="text"
            v-model="person.experience"
            @blur="cancelEdit(person)"
          />
        </td>
        <td class="col-2">
          <span v-if="!person.editMode">{{ person.age }}</span>
          <input
            v-else
            type="text"
            v-model="person.age"
            @blur="cancelEdit(person)"
          />
        </td>
        <td class="col-2">
          <span v-if="!person.editMode">{{ person.address }}</span>
          <input
            v-else
            type="text"
            v-model="person.address"
            @blur="cancelEdit(person)"
          />
        </td>
        <!-- Столбец кнопок редактирования -->
        <td class="col-1 d-flex flex-row">
          <!-- редактирование -->
          <img
            src="../assets/edit.png"
            class="icon d-flex justify-content-end"
            @click="toggleEditMode(person)"
          />
          <!-- удалить -->
          <img
            src="../assets/delete.png"
            class="icon d-flex justify-content-end"
            @click="deleteNote(person)"
          />
          <!-- подтвердить -->
          <img
            src="../assets/check.png"
            class="icon d-flex justify-content-end"
            @click="confirmNote(person)"
          />
        </td>
      </tr>

      <!-- После того как пользователь создан, его данные пушатся в таблицу (которая является продолжением предыдущей) -->
      <tr v-for="(user, index) in users" :key="index" class="row">
        <th class="col-1">{{ peopleList.length + index + 1 }}</th>   <!-- Проверяем предыдущий индекс и добавляем 1, чтобы получить корректный индекс -->
        <td class="col-2">
          <span v-if="!user.editMode">{{ user.name }}</span>
          <input
            v-else
            type="text"
            v-model="user.name"
            @blur="cancelEdit(user)"
          />
        </td>
        <td class="col-2">
          <span v-if="!user.editMode">{{ user.familyName }}</span>
          <input
            v-else
            type="text"
            v-model="user.familyName"
            @blur="cancelEdit(user)"
          />
        </td>
        <td class="col-2">
          <span v-if="!user.editMode">{{ user.experience }}</span>
          <input
            v-else
            type="text"
            v-model="user.experience"
            @blur="cancelEdit(user)"
          />
        </td>
        <td class="col-2">
          <span v-if="!user.editMode">{{ user.age }}</span>
          <input
            v-else
            type="text"
            v-model="user.age"
            @blur="cancelEdit(user)"
          />
        </td>
        <td class="col-2">
          <span v-if="!user.editMode">{{ user.address }}</span>
          <input
            v-else
            type="text"
            v-model="user.address"
            @blur="cancelEdit(user)"
          />
        </td>
        <!-- Столбец кнопок редактирования для новых сотрудников -->
        <td class="col-1 d-flex flex-row">
          <!-- Редактировать -->
          <img
            src="../assets/edit.png"
            class="icon d-flex justify-content-end"
            @click="toggleEditMode(user)"
          />
          <!-- Удалить -->
          <img
            src="../assets/delete.png"
            class="icon d-flex justify-content-end"
            @click="deleteNote(person, index)"
          />
          <!-- Подтвердить -->
          <img
            src="../assets/check.png"
            class="icon d-flex justify-content-end"
            @click="confirmNote(user)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.icon {
  width: 20px;
  height: 20px;
}
</style>
