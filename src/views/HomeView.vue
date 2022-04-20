<script>
// script is for JS
import axios from 'axios';
// import { response } from 'express';
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!!!",
      cars: [],
      newCarParams: {},
      currentCar: {},
      editCarParams: {}
    };
  },
  created: function () {
    console.log("Starting now");
    this.indexCars();

  },
  methods: {
    indexCars: function () {
      console.log("in the index");
      axios.get("http://localhost:3000/cars.json").then(response => {
        console.log(response.data);
        this.cars = response.data;
      });
    },
    createCars: function () {
      console.log("in the create f'n");
      var newCarParams = {
        input_make: this.newCarParams.make,
        input_model: this.newCarParams.model,
        input_year: this.newCarParams.year,
        input_name: this.newCarParams.name,
        input_image_url: this.newCarParams.image_url
      }
      axios.post("http://localhost:3000/cars.json", newCarParams).then(response => {
        console.log(response.data);
        this.cars.push(response.data)
      });
      this.newCarParams = {}
    },
    showCar: function (car) {
      console.log(car);
      console.log("showing car");
      this.currentCar = car;
      this.editCarParams = car;
      document.querySelector("#car-details").showModal();
    },
    updateCar: function () {
      console.log("updating car");
      console.log(this.editCarParams.id);
      axios.patch(`http://localhost:3000/cars/${this.editCarParams.id}.json`, this.editCarParams).then(response => {
        console.log(response.data);
      });
    },
    destroyCar: function (car) {
      console.log("destroying stuff");
      console.log(car);
      axios.delete(`http://localhost:3000/cars/${car.id}`).then(response => {
        console.log(response.data);
        var index = this.cars.indexOf(car);
        this.cars.splice(index, 1);
      });
    }
  }
};
</script>

<template>
  <!-- template is for HTML -->
  <div class="home">
    <h1>{{ message }}</h1>
    <p>
      Make:
      <input v-model="newCarParams.input_make" />
    </p>
    <p>
      Model:
      <input v-model="newCarParams.input_model" />
    </p>
    <p>
      Year:
      <input v-model="newCarParams.input_year" />
    </p>
    <p>
      Name:
      <input v-model="newCarParams.input_name" />
    </p>
    <p>
      Image URL:
      <input v-model="newCarParams.input_image_url" />
    </p>
    <button v-on:click="createCars()">Add Car</button>
    <h1 v-for="car in cars" v-bind:key="car.id">
      {{ car.id }}. {{ car.name }}
      <img v-bind:src="car.image_url" />
      <button v-on:click="showCar(car)">More Info</button>
    </h1>
    <dialog id="car-details">
      <form method="dialog">
        <h1>Car info</h1>
        <p>Make: {{ currentCar.make }}</p>
        <p>Model: {{ currentCar.model }}</p>
        <p>Year: {{ currentCar.year }}</p>
        <p>Name: {{ currentCar.name }}</p>
        <p>
          Make:
          <input v-model="editCarParams.input_make" />
        </p>
        <p>
          Model:
          <input v-model="editCarParams.input_model" />
        </p>
        <p>
          Year:
          <input v-model="editCarParams.input_year" />
        </p>
        <p>
          Name:
          <input v-model="editCarParams.input_name" />
        </p>
        <p>
          Image URL:
          <input v-model="editCarParams.input_image_url" />
        </p>
        <button v-on:click="updateCar()">Update Car</button>
        <button v-on:click="destroyCar(currentCar)">Remove Car</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<!-- style is for CSS -->
<style>
img {
  width: 250px;
}
</style>