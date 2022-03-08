<template>
    <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span data-testid="todo-count" class="todo-count"><strong>{{ doneTodosCount }}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <router-link exact to="/">All</router-link>
            </li>
            <li>
                <router-link to="/active">Active</router-link>
            </li>
            <li>
               <router-link to="/completed">Completed</router-link>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button 
            class="clear-completed" 
            data-testid="clear-completed" 
            v-if="isClearCompletedShow"
            @click="$emit('clear-completed')"
        >Clear completed</button>
    </footer>
</template>
<script>
export default {
    name: 'TodoFooter',
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    computed: {
        doneTodosCount() {
            return this.todos.filter(t => !t.done).length
        },
        isClearCompletedShow() {
            return this.todos.find(t => t.done)
        }
    }
}
</script>