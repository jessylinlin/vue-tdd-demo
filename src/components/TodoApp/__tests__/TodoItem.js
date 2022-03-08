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
  test('delete todo', async () => {
    const deleteBtn = wrapper.find('[data-testid="delete"]')
    await deleteBtn.trigger('click')
    expect(wrapper.emitted()['delete-todo']).toBeTruthy()
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id)
  })
  test('edit todo', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    const TodoItem = wrapper.find('[data-testid="todo-item"]')
    const TodoEdit = wrapper.find('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    expect(TodoItem.classes()).toContain('editing')

    await TodoEdit.trigger('blur')
    expect(TodoItem.classes('editing')).toBeFalsy()
  })
  test('save edit todo', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    const TodoEdit = wrapper.find('[data-testid="todo-edit"]')
    await label.trigger('dbclick')

    expect(TodoEdit.element.value).toBe(wrapper.vm.todo.text)

    // 修改文本框值
    const newValue = 'hello'
    await TodoEdit.setValue(newValue)

    // 触发回车保存
    await TodoEdit.trigger('keyup.enter')

    // 断言数据修改
    // expect(wrapper.vm.todo.text).toBe(newValue)
    expect(wrapper.emitted()['edit-todo']).toBeTruthy()
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({ id: wrapper.vm.todo.id, text: newValue })
    expect(wrapper.vm.isEditing).toBeFalsy()
  })
  test('cancel edit todo', async () => {
    const label = wrapper.find('[data-testid="todo-text"]')
    const TodoEdit = wrapper.find('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    const text = wrapper.vm.todo.text

    await TodoEdit.setValue('bbbbb')
    await TodoEdit.trigger('keyup.esc')

    // 字段没有被修改
    expect(wrapper.vm.todo.text).toBe(text)
    // 编辑状态取消
    expect(wrapper.vm.isEditing).toBeFalsy()
  })
})
