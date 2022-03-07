<template>
    <section class="todoapp">
        <todo-header />
        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                <todo-item />
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
    }
}
</script>