import React from "react";
import { spreader } from "../spreader";

const FormSummary = () => {
  const fieldLabels = ["Name", "Email", "Phone", "Notes"];
  const fieldValues = ["Alice", "", undefined, { comment: "VIP client" }];

  const summary = spreader(fieldLabels, fieldValues, 0);

  return (
    <div>
      <h3>Summary of Input</h3>
      <p>{summary.name}</p> {/* "Name, Notes" */}
    </div>
  );
};

export default FormSummary;
