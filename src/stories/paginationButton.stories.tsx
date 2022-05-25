import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaginationButton } from '../components/Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PaginationBtn',
  component: PaginationButton,
  argTypes: {
      changePage: {
          action: 'clicked'
      }
  }
} as ComponentMeta<typeof PaginationButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PaginationButton> = (args) => <PaginationButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: 1,
    isActive: true,
    isEnabled: true,
    // changePage: () => {console.log('I am clicked')}
}