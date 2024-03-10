function convertArrayOfObjectsToCSV(data: any[]) {
  let csv = "";
  // Extracting headers from the first object
  const headers = Object.keys(data[0]);

  // Adding header row to CSV
  csv += headers.join(",") + "\n";

  // Adding data rows to CSV
  data.forEach((item) => {
    // Mapping each object's values to a CSV row
    const row = headers.map((header) => {
      // If the value is a string containing a comma, we need to wrap it in double quotes
      if (typeof item[header] === "string" && item[header].includes(",")) {
        return `"${item[header]}"`;
      }
      return item[header];
    });
    csv += row.join(",") + "\n";
  });

  return csv;
}

export function downloadCSV(data: any[], filename: string) {
  const csv = convertArrayOfObjectsToCSV(data);
  const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(csvBlob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// // Example usage:
// const data = [
//   { name: "John Doe", age: 30, city: "New York" },
//   { name: "Jane Smith", age: 25, city: "San Francisco" },
//   { name: "Bob Johnson", age: 40, city: "Chicago" },
// ];

// const filename = "example.csv";
// downloadCSV(data, filename);
