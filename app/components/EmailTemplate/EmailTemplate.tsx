import * as React from "react";

type Props = {
  name?: string;
  email?: string;
  company?: string;
  message: string;
};

export function EmailTemplate({ name, email, company, message }: Props) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", fontSize: 14, color: "#111" }}>
      <h2 style={{ margin: "0 0 12px" }}>New message from portfolio</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 8px", opacity: 0.7 }}>Name</td>
            <td style={{ padding: "4px 8px" }}>{name || "Anonymous"}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 8px", opacity: 0.7 }}>Email</td>
            <td style={{ padding: "4px 8px" }}>{email || "Not provided"}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 8px", opacity: 0.7 }}>Company</td>
            <td style={{ padding: "4px 8px" }}>{company || "Not provided"}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 16 }}>
        <div style={{ opacity: 0.7, marginBottom: 6 }}>Message</div>
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
            background: "#f6f6f8",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
