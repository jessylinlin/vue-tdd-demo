import { shallowMount } from '@vue/test-utils'
import TodoApp from '@/components/TodoApp/index.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoApp', () => {
  test('New todo', async () => {
    const wrapper = shallowMount(TodoApp)
    const text = 'play'
    wrapper.vm.handleNewTodo(text)
    const todo = wrapper.vm.todos.find(t => t.text === text)
    expect(todo).toBeTruthy()
  })

  test('todo list', async () => {
    const wrapper = shallowMount(TodoApp)
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true }
    ]
    await wrapper.setData({
      todos
    })
    expect(wrapper.findAllComponents(TodoItem).length).toBe(todos.length)
    // wrapper.vm.todos = [
    //   { id: 1, text: 'eat', done: false }
    // ]
  })
})
