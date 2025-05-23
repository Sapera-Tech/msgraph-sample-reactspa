// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <WelcomeSnippet>
import {
  Button as BsButton,
  Container
} from 'react-bootstrap';
import { Button } from './components/ui/button';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useAppContext } from './AppContext';

export default function Welcome() {
  const app = useAppContext();

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>React Graph Tutorial</h1>
        <p className="lead">
          This sample app shows how to use the Microsoft Graph API to access a user's data from React
        </p>
        <AuthenticatedTemplate>
          <div>
            <h4>Welcome {app.user?.displayName || ''}!</h4>
            <p>Use the navigation bar at the top of the page to get started.</p>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <BsButton color="primary" onClick={app.signIn!} className="me-2">Click here to sign in</BsButton>
          <Button onClick={app.signIn!}>Sign in with Shadcn</Button>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
}
// </WelcomeSnippet>
