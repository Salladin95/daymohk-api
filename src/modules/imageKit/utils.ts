export const retrieveFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  if (parts.length < 1) {
    throw new Error('No extension found');
  }
  return parts[parts.length - 1];
};
export const toBase64 = (file: File | Blob | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (typeof file === 'string') {
      return resolve(file);
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        return resolve(reader.result);
      } else {
        throw new Error();
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
