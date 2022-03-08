<template>
    <section class="todoapp">
        <todo-header @new-todo="handleNewTodo"/>
        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main">
            <input 
                data-testid="toggle-all" 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox"
                v-model="toggleAll"
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                <todo-item 
                    v-for="todo in filterTodos"
                    :key="todo.id"
                    :todo="todo"
                    @delete-todo="handleDeleteTodo"
                    @edit-todo="handleEditTodo"
                />
            </ul>
        </section>
        <!-- This footer should be hidden by default and shown when there are todos -->
        <todo-footer :todos="todos" @clear-completed="handleClearCompleted"/>
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
    computed: {
        toggleAll: {
            get() {
                //设置选中状态
                return this.todos.length && this.todos.every(t => t.done)
            },
            set(checked) {
                this.todos.forEach(todo => {
                    todo.done = checked
                })
            }
        },
        filterTodos() {
            // 获取路由路径 根据路由路径
            const path = this.$route.path
            let todos = this.todos
            switch (path) {
                case '/active':
                    todos = this.todos.filter(t => !t.done)
                    break
                case '/completed':
                    todos = this.todos.filter(t => t.done)
                    break
            }
            return todos
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
        },
        handleDeleteTodo(todoId) {
            const index = this.todos.findIndex(t => t.id === todoId)
            if (index !== -1) {
                this.todos.splice(index, 1)
            }
        },
        handleEditTodo({id, text}) {
            const todo = this.todos.find(t => t.id === id) 

            if (!todo) {
                return
            }

            if (!text.trim().length) {
                return this.handleDeleteTodo(id)
            }

            todo.text = text
        },
        handleClearCompleted() {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].done) {
                    this.todos.splice(i, 1)
                    i--
                }
            }
        }
    }
}
</script>