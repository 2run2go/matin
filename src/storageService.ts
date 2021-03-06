import { firebase } from "./firebaseInit";

const storageRef = firebase.storage().ref();

const uploadFile = (
  file: Blob | Uint8Array | ArrayBuffer,
  fullFilePath: string,
  progressCallback: Function
) => {
  const uploadTask = storageRef.child(fullFilePath).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCallback(progress);
    },
    (error) => {
      throw error;
    }
  );

  return uploadTask.then(async () => {
    return await uploadTask.snapshot.ref.getDownloadURL();
  });
};

const deleteFile = (fileDownloadUrl: string) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  const filePath = decodedUrl.substring(startIndex, endIndex);

  return storageRef.child(filePath).delete();
};

export { uploadFile, deleteFile };
