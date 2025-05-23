import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthenticatedTemplate } from '@azure/msal-react';

/**
 * A simple dialer UI that demonstrates how you might integrate the
 * Microsoft Teams calling SDK. Actual call functionality requires
 * installing the SDK and wiring up the call client.
 */
export default function TeamsDialer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inCall, setInCall] = useState(false);

  // Placeholder for the Teams call object
  // let call: any;

  const startCall = async () => {
    try {
      // TODO: Initialize the Microsoft Teams call client and start a call
      // For example, using the @microsoft/teams-js SDK:
      // const teams = await import('@microsoft/teams-js');
      // call = await teams.calling.startCall({ targets: [phoneNumber] });
      setInCall(true);
    } catch (err) {
      console.error('Error starting call', err);
    }
  };

  const endCall = async () => {
    try {
      // TODO: Hang up the active call using the Teams call object
      // await call.hangUp();
    } finally {
      setInCall(false);
    }
  };

  return (
    <AuthenticatedTemplate>
      <div className="mb-3">
        <h1 className="mb-3">Teams Dialer</h1>
        <Form>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Button
            className="me-2"
            onClick={startCall}
            disabled={!phoneNumber || inCall}
          >
            Start Call
          </Button>
          <Button
            variant="danger"
            onClick={endCall}
            disabled={!inCall}
          >
            End Call
          </Button>
        </Form>
      </div>
    </AuthenticatedTemplate>
  );
}
