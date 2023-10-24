export default function UserCard({
  index,
  name,
  setUserIndex,
  setIsStateUpdated,
  listofUsers,
  userIndex,
}) {
  function handleDeleteUser() {
    if (listofUsers.length !== 1) {
      // Delete an object from the list
      listofUsers.splice(index, 1);
      setUserIndex(index - 1);
    }
    setIsStateUpdated(true);
  }
  return (
    <div
      id="user-card"
      className="border-2 cursor-pointer px-8 min-w-40 flex flex-col justify-between items-center"
      onClick={() => setUserIndex(index)}
    >
      {/* <p>index: {index}</p> */}
      {index === userIndex ? (
        <p className="font-bold">{name}</p>
      ) : (
        <p>{name}</p>
      )}

      {index === userIndex ? (
        <button className="py-0 px-1 mb-1" onClick={() => handleDeleteUser()}>
          Delete
        </button>
      ) : null}
    </div>
  );
}
