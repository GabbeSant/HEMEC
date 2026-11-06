import React from "react";
import { formatDateTime } from "../../utils/formatDateTime";

export default function RequestList({ requests, nested = false }) {
  const ReferenceHeading = nested ? "h3" : "h2";
  const sorted = [...requests].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <ul className="requests-list">
      {sorted.map((request) => (
        <li key={request.id}>
          <ReferenceHeading className="request-reference">
            <a href={`#/chamados/${encodeURIComponent(request.id)}`}>{request.reference}</a>
          </ReferenceHeading>
          <p className="request-equipment-name">{request.asset} — {request.equipmentName}</p>
          <p className="request-problem">{request.description}</p>
          <dl>
            <div>
              <dt>Setor da abertura</dt>
              <dd>{request.sector}</dd>
            </div>
            <div>
              <dt>Solicitante</dt>
              <dd>{request.requester.email}</dd>
            </div>
            <div>
              <dt>Situação</dt>
              <dd>{request.status}</dd>
            </div>
            <div>
              <dt>Data da abertura</dt>
              <dd><time dateTime={request.createdAt}>{formatDateTime(request.createdAt)}</time></dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
