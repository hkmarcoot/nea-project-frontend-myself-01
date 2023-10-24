export default function UserCard({ index, name, setUserIndex }) {
  return (
    <div className="border-2" onClick={() => setUserIndex(index)}>
      <p>index: {index}</p>
      <p>name: {name}</p>
    </div>
  );
}
