import { Meta, StoryObj } from '@storybook/react';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './field';

const meta: Meta<typeof Field> = {
  component: Field,
  title: 'Components/UI/Field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Field components provide a flexible layout system for form fields with support for labels, descriptions, errors, and various orientations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="default-input">Default Field</FieldLabel>
      <FieldContent>
        <input
          id="default-input"
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldDescription>
          This is a description that provides additional context.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Field orientation="vertical">
      <FieldLabel htmlFor="vertical-input">Vertical Orientation</FieldLabel>
      <FieldContent>
        <input
          id="vertical-input"
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldDescription>
          Label and input are stacked vertically (default).
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="horizontal-input">Horizontal Orientation</FieldLabel>
      <FieldContent>
        <input
          id="horizontal-input"
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldDescription>
          Label and input are displayed side by side.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Responsive: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldLabel htmlFor="responsive-input">
          Responsive Orientation
        </FieldLabel>
        <FieldContent>
          <input
            id="responsive-input"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <FieldDescription>
            Vertical on mobile, horizontal on desktop (md breakpoint).
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="error-input">Field with Error</FieldLabel>
      <FieldContent>
        <input
          id="error-input"
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldError>This field is required.</FieldError>
      </FieldContent>
    </Field>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="multiple-errors-input">
        Field with Multiple Errors
      </FieldLabel>
      <FieldContent>
        <input
          id="multiple-errors-input"
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldError
          errors={[
            { message: 'This field is required.' },
            { message: 'Must be at least 3 characters.' },
            { message: 'Must contain only letters.' },
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Field>
      <FieldTitle>Field Title</FieldTitle>
      <FieldContent>
        <input
          type="text"
          placeholder="Enter text..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <FieldDescription>
          FieldTitle is used when you don't need a label association.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const FieldGroupExample: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="group-input-1">First Field</FieldLabel>
        <FieldContent>
          <input
            id="group-input-1"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="group-input-2">Second Field</FieldLabel>
        <FieldContent>
          <input
            id="group-input-2"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="group-input-3">Third Field</FieldLabel>
        <FieldContent>
          <input
            id="group-input-3"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Personal Information</FieldLegend>
      <Field>
        <FieldLabel htmlFor="fieldset-name">Name</FieldLabel>
        <FieldContent>
          <input
            id="fieldset-name"
            type="text"
            placeholder="Enter your name..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldset-email">Email</FieldLabel>
        <FieldContent>
          <input
            id="fieldset-email"
            type="email"
            placeholder="Enter your email..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
    </FieldSet>
  ),
};

export const FieldLegendVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <FieldSet>
        <FieldLegend variant="legend">Legend Variant (Default)</FieldLegend>
        <Field>
          <FieldLabel htmlFor="legend-1">Field 1</FieldLabel>
          <FieldContent>
            <input
              id="legend-1"
              type="text"
              placeholder="Enter text..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FieldContent>
        </Field>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">Label Variant</FieldLegend>
        <Field>
          <FieldLabel htmlFor="legend-2">Field 2</FieldLabel>
          <FieldContent>
            <input
              id="legend-2"
              type="text"
              placeholder="Enter text..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FieldContent>
        </Field>
      </FieldSet>
    </div>
  ),
};

export const FieldSeparatorExample: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="separator-input-1">
          Field Above Separator
        </FieldLabel>
        <FieldContent>
          <input
            id="separator-input-1"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
      <FieldSeparator>OR</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="separator-input-2">
          Field Below Separator
        </FieldLabel>
        <FieldContent>
          <input
            id="separator-input-2"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const FieldSeparatorWithoutContent: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="separator-empty-1">Field Above</FieldLabel>
        <FieldContent>
          <input
            id="separator-empty-1"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="separator-empty-2">Field Below</FieldLabel>
        <FieldContent>
          <input
            id="separator-empty-2"
            type="text"
            placeholder="Enter text..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <FieldSet>
        <FieldLegend>Complete Form Example</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="complete-name">Full Name</FieldLabel>
            <FieldContent>
              <input
                id="complete-name"
                type="text"
                placeholder="John Doe"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <FieldDescription>
                Enter your full legal name as it appears on official documents.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="complete-email">Email Address</FieldLabel>
            <FieldContent>
              <input
                id="complete-email"
                type="email"
                placeholder="john@example.com"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <FieldDescription>
                We'll never share your email with anyone else.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="complete-password">Password</FieldLabel>
            <FieldContent>
              <input
                id="complete-password"
                type="password"
                placeholder="••••••••"
                className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <FieldError
                errors={[
                  { message: 'Password must be at least 8 characters.' },
                  { message: 'Password must contain at least one number.' },
                ]}
              />
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
