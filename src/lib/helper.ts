// formate file size for file upload
export const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

// Download sample file
export const handleDownloadSampleFile = () => {
  const link = document.createElement("a");
  link.href = "/sample_csv.csv";
  link.setAttribute("download", "sample_csv.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
