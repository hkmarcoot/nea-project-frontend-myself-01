export default function UserCard({ index, name, setUserIndex }) {
  return (
    <div
      id="user-card"
      className="border-2 cursor-pointer px-8 min-w-40"
      onClick={() => setUserIndex(index)}
    >
      {/* <p>index: {index}</p> */}
      <p>{name}</p>
    </div>
  );
}
