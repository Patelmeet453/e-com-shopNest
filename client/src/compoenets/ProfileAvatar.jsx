import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileAvatar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { myProfile } = useSelector((s) => s.users);

  if (!user) return null;

  return (
    <button onClick={() => navigate("/profile")}>
      <img
        src={myProfile?.profileImage || "/default-avatar.png"}
        alt="profile"
        className="
          w-10 h-10 rounded-full
          border-2 border-emerald-500
          object-cover
        "
      />
    </button>
  );
};

export default ProfileAvatar;
