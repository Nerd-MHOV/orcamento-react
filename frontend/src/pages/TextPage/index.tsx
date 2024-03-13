import { useEffect, useState } from "react";
import { useApi } from "../../hooks/api/api";
import * as XLSX from "xlsx";

export const TestPage = () => {
  const readExcel = (file: File) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (e.target) {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsName = wb.SheetNames[0];
          const ws = wb.Sheets[wsName];

          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then(() => {});
  };
  return (
    <div className="ok">
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            readExcel(file);
          }
        }}
      />
    </div>
  );
};
