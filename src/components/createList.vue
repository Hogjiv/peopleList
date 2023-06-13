<script>
export default {
  emits: ['addNewUser'],
  data() {
    return {
      showDiv: false,
      newPerson: {
        name: "",
        familyName: "",
        experience: "",
        age: "",
        address: "",
      },
    };
  },
  methods: {
    // создаем объект payload, в которой будем хранить нового пользователя с введенными данными. Cоздаем асинхронную функцию, так как передаем данные через $emit. Это гарантирует, что App получит новые данные
    async addUser() {
      const name = this.newPerson.name;
      const familyName = this.newPerson.familyName;
      const experience = this.newPerson.experience;
      const age = this.newPerson.age;
      const address = this.newPerson.address;

      const payload = {
        name: name,
        familyName: familyName,
        experience: experience,
        age: age,
        address: address
      };
      await this.$emit('addNewUser', payload); 
      console.log('2. sent to parent');
    },
    toggleShowDiv() {
      this.showDiv = !this.showDiv; // Инвертируем значение showDiv, чтобы скрыть или показать блок v-if
    },
  },
};
</script>
<template>
  <div>
    <div class="d-flex justify-content-around align-items-center">
     <button @click="toggleShowDiv" class="btn text-center "> Create new list</button> 
    </div>
    <div v-if="showDiv"> 
      <!-- показываем блок для  созданиея ноового пользователя по нажатию на кнопку -->
      <table class="table mx-4">
        <thead>
          <tr class="row">
            <th class="col-1">#</th>
            <th class="col-2">Name</th>
            <th class="col-2">Family Name</th>
            <th class="col-2">Experience</th>
            <th class="col-2">Age</th>
            <th class="col-2">Address</th>
          </tr>
        </thead>
   <!-- показываем данные, которые нужно ввести -->
        <tbody>
          <tr class="row">
            <th class="col-1"></th>
            <td class="col-2">
              <input type="text" class="input-form" v-model="newPerson.name" />
            </td>
            <td class="col-2">
              <input
                type="text"
                class="input-form"
                v-model="newPerson.familyName"
              />
            </td>
            <td class="col-2">
              <input
                type="text"
                class="input-form"
                v-model="newPerson.experience"
              />
            </td>
            <td class="col-2">
              <input type="text" class="input-form" v-model="newPerson.age" />
            </td>
            <td class="col-2">
              <input
                type="text"
                class="input-form"
                v-model="newPerson.address"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!--Кнопка добавления пользователя -->
      <div class="d-flex justify-content-around align-items-center">
        <button class="btn" @click="addUser">
          Create new user
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.input-form {
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
}

.btn {
  width: 200px;
  background-color: aqua !important;
}
</style>
