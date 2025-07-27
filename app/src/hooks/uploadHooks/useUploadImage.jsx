// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useUpload } from "../../contexts/UploadContext";
// import { storage } from "../../firebase";

// export const useUploadImage = () => {
//   const { setUploadState } = useUpload();
//   //prefix = centers/centerId/
//   const uploadImage = (file, centerId) => {
//     return new Promise((resolve, reject) => {
//       const path = `centers/${centerId}/`;
//       const fileRef = ref(storage, `${path}${Date.now()}_${file.name}`);
//       const uploadTask = uploadBytesResumable(fileRef, file);

//       setUploadState({ progress: 0, uploading: true, error: null });

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const percent =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadState({
//             progress: Math.round(percent),
//             uploading: true,
//             error: null,
//           });
//         },
//         (error) => {
//           setUploadState({
//             progress: null,
//             uploading: false,
//             error: error.message,
//           });
//           reject(error);
//         },
//         async () => {
//           const url = await getDownloadURL(uploadTask.snapshot.ref);
//           setUploadState({ progress: null, uploading: false, error: null });
//           resolve(url);
//         }
//       );
//     });
//   };

//   return { uploadImage };
// };
