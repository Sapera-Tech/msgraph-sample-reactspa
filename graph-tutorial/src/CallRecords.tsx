// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { AuthenticatedTemplate } from '@azure/msal-react';

import { listCallRecords, CallRecord } from './GraphService';
import { useAppContext } from './AppContext';

export default function CallRecords() {
  const app = useAppContext();

  const [records, setRecords] = useState<CallRecord[]>();

  useEffect(() => {
    const loadRecords = async () => {
      if (app.authProvider && !records) {
        try {
          const result = await listCallRecords(app.authProvider);
          setRecords(result);
        } catch (err) {
          const error = err as Error;
          app.displayError!(error.message);
        }
      }
    };

    loadRecords();
  });

  return (
    <AuthenticatedTemplate>
      <div className="mb-3">
        <h1 className="mb-3">Call records</h1>
        <div className="table-responsive">
          {records && <Table size="sm">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Modalities</th>
                <th>Type</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.startDateTime ? format(parseISO(record.startDateTime), app.user?.timeFormat || 'Pp') : ''}</td>
                  <td>{record.endDateTime ? format(parseISO(record.endDateTime), app.user?.timeFormat || 'Pp') : ''}</td>
                  <td>{record.modalities?.join(', ')}</td>
                  <td>{record.type}</td>
                  <td>{record.id}</td>
                </tr>
              ))}
            </tbody>
          </Table>}
        </div>
      </div>
    </AuthenticatedTemplate>
  );
}
