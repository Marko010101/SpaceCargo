import Loader from "../components/ui/Loader";
import ProfileItem from "../components/ui/ProfileItem";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (!user) return <div className="p-6 text-lg">No user data available.</div>;
  console.log(user);
  const {
    firstNameGe,
    lastNameGe,
    firstNameEn,
    lastNameEn,
    userName,
    phone,
    roomNumber,
    gender,
    companyNameGe,
    companyNameEn,
    id,
    userTypeId,
  } = user;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow">
        <ProfileItem label="Full Name (GE)" value={`${firstNameGe} ${lastNameGe}`} />
        <ProfileItem label="Full Name (EN)" value={`${firstNameEn} ${lastNameEn}`} />
        <ProfileItem label="Email" value={userName} />
        <ProfileItem label="Phone" value={phone} />
        <ProfileItem label="Room Number" value={roomNumber} />
        <ProfileItem label="Gender" value={gender === "F" ? "Female" : "Male"} />
        {companyNameGe && companyNameEn && (
          <>
            <ProfileItem label="Company Name (GE)" value={companyNameGe} />
            <ProfileItem label="Company Name (EN)" value={companyNameEn} />
          </>
        )}

        <ProfileItem label="User ID" value={id.toString()} />
        <ProfileItem label="User Type ID" value={userTypeId.toString()} />
      </div>
    </div>
  );
};

export default Profile;
