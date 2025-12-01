import type { Meta } from '@storybook/react';
import React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta: Meta = {
  component: Tabs,
};

export default meta;

export const Default = () => (
  <Tabs defaultValue="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
);

export const WithDisabledTab = () => (
  <Tabs defaultValue="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsTrigger value="billing" disabled>
        Billing (Coming soon)
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
    <TabsContent value="billing">Billing details will appear here.</TabsContent>
  </Tabs>
);
