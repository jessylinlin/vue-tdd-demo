import { shallowMount } from '@vue/test-utils'
import TodoApp from '@/components/TodoApp/index.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'
import Vue from 'vue'

describe('TodoApp', () => {
  /** @type {import('@vue/test-utils').Wrapper */
  let wrapper = null
  beforeEach(async () => {
    const $route = {
      path: '/'
    }
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true }
    ]
    wrapper = shallowMount(TodoApp, {
      mocks: {
        $route
      }
    })
    await wrapper.setData({
      todos
    })
  })
  test('New todo', async () => {
    const text = 'play'
    wrapper.vm.handleNewTodo(text)
    const todo = wrapper.vm.todos.find(t => t.text === text)
    expect(todo).toBeTruthy()
  })

  test('todo list', async () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(wrapper.vm.todos.length)
    // wrapper.vm.todos = [
    //   { id: 1, text: 'eat', done: false }
    // ]
  })
  test('delete todo', async () => {
    await wrapper.vm.handleDeleteTodo(1)
    expect(wrapper.vm.todos.length).toBe(1)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(1)
  })
  test('delete todo', async () => {
    await wrapper.vm.handleDeleteTodo(123)
    expect(wrapper.vm.todos.length).toBe(2)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2)
  })

  test('edit todo', async () => {
    const todo = { id: 2, text: 'edit todo' }
    await wrapper.vm.handleEditTodo(todo)

    expect(wrapper.vm.todos[1].text).toBe(todo.text)

    todo.text = ''
    await wrapper.vm.handleEditTodo(todo)
    expect(wrapper.vm.todos.find(t => t.id === todo.id)).toBeFalsy()
  })

  test('toggle all', async () => {
    const toggleAll = wrapper.find('[data-testid = "toggle-all"]')
    await toggleAll.setChecked()

    // 断言所有子任务选中状态
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeTruthy()
    })

    // 取消
    await toggleAll.setChecked(false)
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeFalsy()
    })
  })

  test('toggle all status', async () => {
    const toggleAll = wrapper.find('[data-testid = "toggle-all"]')

    // 所有任务全选 断言toggleall
    wrapper.vm.todos.forEach(todo => {
      todo.done = true
    })
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeTruthy()
    // 只要有一个未完成 取消所有任务全选 断言toggleall
    wrapper.vm.todos[0].done = false
    await Vue.nextTick()

    expect(toggleAll.element.checked).toBeFalsy()
  })

  test('clear all completed', async () => {
    await wrapper.vm.handleClearCompleted()
    expect(wrapper.vm.todos).toEqual([{ id: 1, text: 'eat', done: false }])
  })

  test('filter todos', async () => {
    // 路由导航到 / 断言
    wrapper.vm.$route.path = '/'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true }
    ])
    // 路由导航到 /active 断言
    wrapper.vm.$route.path = '/active'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false }
    ])
    // 路由导航到 /completed 断言已完成任务
    wrapper.vm.$route.path = '/completed'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 2, text: 'sleep', done: true }
    ])
  })
})
