import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DatePicker from '@/vue/components/DatePicker.vue';

describe('DatePicker.vue', () => {
  it('renders input', () => {
    const wrapper = mount(DatePicker);

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('opens calendar on input click', async () => {
    const wrapper = mount(DatePicker);

    await wrapper.find('input').trigger('click');

    expect(wrapper.text()).toContain('Su');
  });

  it('renders 42 day cells', async () => {
    const wrapper = mount(DatePicker);

    await wrapper.find('input').trigger('click');

    const buttons = wrapper.findAll('button.dp-day');

    expect(buttons.length).toBe(42);
  });

  it('selects a date on click', async () => {
    const wrapper = mount(DatePicker);

    await wrapper.find('input').trigger('click');

    const dayButtons = wrapper.findAll('button.dp-day');

    const currentMonthButton = dayButtons.find(b =>
      !b.classes().includes('dp-day--other-month')
    );

    await currentMonthButton!.trigger('click');

    const input = wrapper.find('input');

    expect(input.element.value).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('closes on ESC', async () => {
    const wrapper = mount(DatePicker);

    await wrapper.find('input').trigger('click');

    await wrapper.find('div.relative').trigger('keydown.esc');

    expect(wrapper.find('button.dp-day').exists()).toBe(false);
  });

  it('applies selected class correctly', async () => {
    const wrapper = mount(DatePicker);

    await wrapper.find('input').trigger('click');

    const firstSelectable = wrapper
      .findAll('button.dp-day')
      .find(b => !b.classes().includes('dp-day--other-month'));

    await firstSelectable!.trigger('click');

    expect(firstSelectable!.classes()).toContain('dp-day--selected');
  });
});