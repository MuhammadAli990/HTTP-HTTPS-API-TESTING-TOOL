import React, { useEffect, useState } from "react";
import { JsonEditor } from "json-edit-react";

function JSONTab(props) {
  const { tab, jsonData, setJsonData } = props;

  return (
    <div
      className={`${tab === "JSON" ? "block" : "hidden"} mt-2 py-2 space-y-4 bg-secondary`}
    >
      <JsonEditor
        data={jsonData}
        setData={setJsonData}
      />
    </div>
  );
}

export default JSONTab;
