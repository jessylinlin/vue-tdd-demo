import { createLocalVue, mount } from '@vue/test-utils'
import TodoFooter from '@/components/TodoApp/TodoFooter.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'selected'
})

describe('TodoFooter.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper */
  let wrapper = null

  beforeEach(async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
  })

  test('done todos count', () => {
    const count = wrapper.vm.todos.filter(t => !t.done).length
    const countEl = wrapper.find('[data-testid="todo-count"]')
    expect(Number.parseInt(countEl.text())).toBe(count)
  })
  test('clear completed show', async () => {
    const clearBtn = wrapper.find('[data-testid="clear-completed"]')
    expect(clearBtn.exists()).toBeTruthy()

    // 清除所有任务的完成状态
    wrapper.vm.todos.forEach(t => {
      t.done = false
    })

    wrapper = mount(TodoFooter, {
      propsData: {
        todos: [
          { id: 1, text: 'eat', done: false },
          { id: 2, text: 'sleep', done: false }
        ]
      },
      localVue,
      router
    })

    expect(wrapper.find('[data-testid="clear-completed"]').exists()).toBeFalsy()
  })
  test('clear completed', () => {
    const clearBtn = wrapper.find('[data-testid="clear-completed"]')
    // 断言是否对外发布自定义事件
    clearBtn.trigger('click')
    expect(wrapper.emitted()['clear-completed']).toBeTruthy()
  })

  test('router-link activeClass', async () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    router.push('/active')

    await localVue.nextTick()

    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/active') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
