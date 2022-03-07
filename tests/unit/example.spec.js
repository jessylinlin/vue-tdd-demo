import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
test('helloworld.vue', async () => {
  // 挂载组件
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'hello world'
    },
    data () {
      return {
        count: 0
      }
    }
  })
  // console.log(wrapper.element.innerHTML)
  // console.log(wrapper.html())
  // expect(wrapper.html()).toContain('hello world')
  const button = wrapper.find('button')
  const countText = wrapper.find('[data-testid="count"]')
  const btn2 = wrapper.find('[data-testid="btn2"]')
  expect(countText.text()).toBe('0')
  // 触发事件
  button.trigger('click')

  await Vue.nextTick()
  expect(wrapper.vm.count).toBe(1)
  expect(countText.text()).toBe('1')

  // console.log(wrapper.emitted())
  await btn2.trigger('click')
  console.log(wrapper.emitted())
  expect(wrapper.emitted().helloEvent).toBeTruthy()
  expect(wrapper.emitted().helloEvent[0][0]).toBe(123)
})
