export default function UserCard({
  index,
  name,
  setUserIndex,
  // setIsStateUpdated,
  listofUsers,
  userIndex,
  setListofUsers,
}) {
  function handleDeleteUser() {
    if (listofUsers.length > 1) {
      if (userIndex === 0) {
        setUserIndex(0);
      } else {
        setUserIndex(index - 1);
      }

      // Delete user from listofUsers
      const arr = [...listofUsers];
      arr.splice(index, 1);
      setListofUsers(arr);
    }
    // Do not need to update state because the listofUsers is updated
    // setIsStateUpdated(true);
  }
  return (
    <div className="flex flex-col border-2 justify-between">
      <div
        id="user-card"
        className=" cursor-pointer px-8 min-w-40 flex flex-col justify-between items-center"
        onClick={() => setUserIndex(index)}
      >
        {/* <p>index: {index}</p> */}
        {index === userIndex ? (
          <p className="font-bold py-2">{name}</p>
        ) : (
          <p className="py-2">{name}</p>
        )}
      </div>
      {index === userIndex && listofUsers.length > 1 ? (
        <div>
          <button
            className="py-0 px-1 mb-1"
            onClick={() => {
              setUserIndex(0);
              handleDeleteUser();
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
