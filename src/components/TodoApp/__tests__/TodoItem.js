import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoItem', () => {
  /** @type {import('@vue/test-utils').Wrapper */
  let wrapper = null

  beforeEach(() => {
    const todo = {
      id: 1,
      text: 'todo',
      done: true
    }
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    })
  })
  test('text', () => {
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(wrapper.vm.todo.text)
  })

  test('done', async () => {
    const done = wrapper.find('[data-testid="todo-done"]')
    const TodoItem = wrapper.find('[data-testid="todo-item"]')
    expect(done.element.checked).toBeTruthy()
    expect(TodoItem.classes()).toContain('completed')

    await done.setChecked(false)
    expect(TodoItem.classes('completed')).toBeFalsy()
  })
})
