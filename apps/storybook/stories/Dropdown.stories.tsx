import type { StoryObj } from '@storybook/react';

import { Dropdown } from '@ui/src/Dropdown.tsx';

const meta = {
    title: 'Example/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    decorators: [(Story) => (
        <div style={{ minHeight: '500px' }}>
            <Story />
        </div>
    )]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Dropdown',
        items: [{name: 'EN', href: '/en'}, {name: 'PL', href: '/pl'}, {name: 'DE', href: '/de'}, ],
        selectedLanguage: 'EN'
    },
};
