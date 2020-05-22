import useUser from "../../lib/hooks/useUser";

const Profile = () => {
  const user = useUser({ redirectTo: "/user/login" });
  return (
    <>
      <h1>Profile</h1>
      {user && <p>Your session: {JSON.stringify(user)}</p>}
    </>
  );
};

export default Profile;
