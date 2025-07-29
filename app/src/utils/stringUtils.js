export const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size} ${sizes[i]}`;
};

export const formatFileName = (fileName, maxLength = 30, endKeep = 5) => {
  if (!fileName || fileName.length <= maxLength) return fileName;

  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return fileName;

  const namePart = fileName.substring(0, dotIndex);
  const extPart = fileName.substring(dotIndex);

  const start = namePart.substring(0, maxLength - endKeep - 3);
  const end = namePart.slice(-endKeep);

  return `${start}...${end}${extPart}`;
};
