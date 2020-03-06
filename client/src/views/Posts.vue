<template>
  <div style="padding: 10px">
    <vs-navbar
      class="nabarx"
      style="display: flex; align-items: center; height: 75px; margin-bottom: 15px"
    >
      <vs-navbar-title>
        <vs-button class="large">Log Out</vs-button>
      </vs-navbar-title>
    </vs-navbar>
    <vs-row>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2"
        v-if="!todos.length"
      >
        <vs-card>
          <div slot="header">
            <h3>
              No todos!
            </h3>
          </div>
        </vs-card>
      </vs-col>

      <vs-col type="flex" vs-align="center" vs-w="2" v-if="todos.length">
        <vs-card v-for="todo in todos" :key="todo.id">
          <div slot="header">
            <h3>
              {{ todo.title }}
            </h3>
          </div>
          <vs-row v-for="point in todo.points" style="margin-bottom: 10px">
            <span>{{ point.name }} </span>
            <vs-checkbox
              v-model="point.done"
              style="margin-left: auto"
              icon=" "
            ></vs-checkbox>
          </vs-row>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { http } from "../http.js";

export default {
  name: "Todos",
  data: () => ({
    todos: [
      {
        id: 1,
        title: "title1",
        points: [
          { id: 1, name: "point1", done: false },
          { id: 2, name: "point2", done: false },
          { id: 3, name: "point3", done: true }
        ]
      }
    ]
  })
};
</script>
