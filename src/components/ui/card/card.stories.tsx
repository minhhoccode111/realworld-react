import { Meta, StoryObj } from '@storybook/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: 'w-[350px] max-w-full',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Update profile</CardTitle>
        <CardDescription>Manage your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use cards to visually group related pieces of content. They are great
          for forms, summaries, and onboarding flows.
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Tip: pair cards with form elements for structured layouts.
        </span>
      </CardFooter>
    </Card>
  ),
};

export const WithActions: Story = {
  args: {
    className: 'w-[420px] max-w-full',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Invite teammates</CardTitle>
        <CardDescription>
          Collaborate faster with your whole team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Share early drafts and gather feedback in one place.</p>
          <p>Roles and permissions ensure everyone stays in sync.</p>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Maybe later
        </button>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Send invites
        </button>
      </CardFooter>
    </Card>
  ),
};
