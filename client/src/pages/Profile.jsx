import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //--------------- IMAGE FILE UPLOAD HANDLER ----------------------------------------------------------------
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    dispatch(signOutUserStart());
    const res = await fetch("/api/user/signout", {
      method: "GET",
    });

    const data = res.json();

    if (data.success === false) {
      dispatch(signOutUserFailure(data.message));
    }
    dispatch(signOutUserSuccess(data));
    try {
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-5">Profile</h1>
      {updateSuccess && (
        <p className="text-green-500 text-center my-2">
          User Updated Successfully
        </p>
      )}
      {error && <p className="text-red-500 text-center my-2">{error}</p>}
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => setFile(e.target.files[0])}
        hidden
        accept="image/*"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full self-center object-cover mb-3 cursor-pointer"
        />
        <p className="text-xs text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              {`Image Error Upload! (Image must be less 2mb)`}
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          disabled={loading}
          className="bg-slate-700 disabled:text-opacity-70 text-white uppercase p-3 disabled:opacity-70 rounded-lg hover:opacity-80"
        >
          {loading ? "loading.." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className=" text-center bg-green-700 disabled:text-opacity-70 text-white uppercase p-3 disabled:opacity-70 rounded-lg hover:opacity-80"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between my-4">
        <span onClick={handleDelete} className="text-red-500 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-500 cursor-pointer ">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
