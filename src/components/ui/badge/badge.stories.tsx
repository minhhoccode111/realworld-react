import { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Components/UI/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Badge components are used to display small pieces of information, such as status indicators, labels, or counts. They come in various variants to suit different contexts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Badge',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Badge',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>New</Badge>
      <Badge variant="secondary">Updated</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>1</Badge>
      <Badge variant="secondary">42</Badge>
      <Badge variant="destructive">99+</Badge>
      <Badge variant="outline">0</Badge>
    </div>
  ),
};

export const WithLongText: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>Short</Badge>
      <Badge>Medium Length Text</Badge>
      <Badge>
        This is a much longer badge text that demonstrates how it handles
        extended content
      </Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Article Status</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Published</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Archived</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">3</Badge>
          <Badge variant="destructive">12</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tags</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">TailwindCSS</Badge>
          <Badge variant="outline">Storybook</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">User Roles</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Admin</Badge>
          <Badge variant="secondary">User</Badge>
          <Badge variant="destructive">Banned</Badge>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Badges can be interactive when combined with buttons or links:
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
        >
          Notifications
          <Badge variant="destructive">5</Badge>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
        >
          Messages
          <Badge variant="default">12</Badge>
        </button>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge className="border-blue-600 bg-blue-500 text-white hover:bg-blue-600">
        Custom Blue
      </Badge>
      <Badge className="border-purple-600 bg-purple-500 text-white hover:bg-purple-600">
        Custom Purple
      </Badge>
      <Badge variant="outline" className="border-green-500 text-green-700">
        Custom Green Outline
      </Badge>
    </div>
  ),
};
