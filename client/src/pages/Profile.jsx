import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Pencil, Loader2 } from "lucide-react";
import { fetchMyProfile, updateMyProfile } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { myProfile, loading } = useSelector((s) => s.users);

  const [localUser, setLocalUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(null);

  /* FETCH PROFILE */
  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  /* SYNC REDUX → LOCAL */
  useEffect(() => {
    if (myProfile) {
      setLocalUser(myProfile);
      setPreview(myProfile.profileImage);
    }
  }, [myProfile]);

  if (!localUser) return null;

  /* IMAGE SELECT (PREVIEW ONLY) */
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLocalUser({ ...localUser, imageFile: file });
    setPreview(URL.createObjectURL(file)); // 👀 instant preview
  };

  /* CANCEL EDIT */
  const cancelEdit = () => {
    setLocalUser(myProfile); // revert changes
    setPreview(myProfile.profileImage);
    setEditing(false);
  };

  /* SAVE PROFILE */
  const saveProfile = () => {
    const form = new FormData();
    form.append("name", localUser.name);
    form.append("email", localUser.email);

    if (localUser.imageFile) {
      form.append("image", localUser.imageFile);
    }

    dispatch(updateMyProfile(form)).then(() => {
      setEditing(false);
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 text-white">
      <div className="bg-gradient-to-br from-[#020617] to-emerald-950 border border-emerald-900/40 rounded-2xl p-8">
        <div className="flex flex-col items-center gap-6">
          {/* AVATAR */}
          <div className="relative">
            <img
              src={preview || "/default-avatar.png"}
              className="w-28 h-28 rounded-full object-cover border-2 border-emerald-500"
            />

            {editing && (
              <label className="absolute bottom-1 right-1 bg-emerald-600 p-2 rounded-full cursor-pointer hover:bg-emerald-700">
                <Camera size={16} />
                <input hidden type="file" onChange={uploadImage} />
              </label>
            )}
          </div>

          {/* NAME */}
          <input
            disabled={!editing}
            value={localUser.name}
            onChange={(e) =>
              setLocalUser({ ...localUser, name: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-lg bg-black/30
              border border-emerald-900/40
              ${!editing && "opacity-70 cursor-not-allowed"}
            `}
          />

          {/* EMAIL */}
          <input
            disabled={!editing}
            value={localUser.email}
            onChange={(e) =>
              setLocalUser({ ...localUser, email: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-lg bg-black/30
              border border-emerald-900/40
              ${!editing && "opacity-70 cursor-not-allowed"}
            `}
          />

          {/* ACTION BUTTONS */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-8 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={saveProfile}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>

              <button
                onClick={cancelEdit}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
