<template>
    <section class="todoapp">
        <todo-header @new-todo="handleNewTodo"/>
        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                <todo-item 
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo="todo"
                />
            </ul>
        </section>
        <!-- This footer should be hidden by default and shown when there are todos -->
        <todo-footer />
    </section>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoItem from './TodoItem.vue'
export default {
    name: 'TodoIndex',
    components: {
        TodoHeader,
        TodoFooter,
        TodoItem
    },
    data() {
        return {
            todos: []
        }
    },
    methods: {
        handleNewTodo(text) {
            const lastTodo = this.todos[this.todos.length - 1]
            const id = lastTodo ? lastTodo.id + 1 : 1
            this.todos.push({
                id,
                text,
                done: false
            })
        }
    }
}
</script>