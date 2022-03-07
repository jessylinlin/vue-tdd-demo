<template>
  <div id="app">
    <todo-app></todo-app>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import TodoApp from './components/TodoApp'

export default {
  name: 'App',
  components: {
    TodoApp
  }
}
</script>