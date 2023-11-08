export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl text-white">Profile Page {params.id}</p>
    </div>
  );
}
