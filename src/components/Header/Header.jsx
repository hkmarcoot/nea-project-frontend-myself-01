import { useState } from "react";
import UserCard from "../UserCard/UserCard.jsx";

function Header({
  listofUsers,
  createNewUser,
  // Taxpayer,
  // setListofUsers,
  setUserIndex,
}) {
  const [isAddNewUserCardOpen, setIsAddNewUserCardOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  return (
    <header className="w-full flex flex-row bg-light-blue border-2">
      <div className="bg-medium-blue w-3/5">
        {listofUsers && (
          <div className="flex flex-row">
            {listofUsers.map((data, index) => (
              <UserCard
                key={index}
                index={index}
                name={data.name}
                setUserIndex={setUserIndex}
              />
            ))}
          </div>
        )}
      </div>
      <div className="bg-dark-blue w-2/5 py-1 md:py-4 lg:py-4">
        <button
          className="px-1 mt-1"
          onClick={() => setIsAddNewUserCardOpen(true)}
        >
          Add New User
        </button>
        <button className="px-1 mt-1 mx-1">Import User Data</button>
        <button className="px-1 my-1 mx-1">Export User Data</button>
      </div>
      {isAddNewUserCardOpen ? (
        <div className="window-modal">
          <div className="create-user-card"></div>
          <p>
            <strong>New User Name: </strong>
            <input
              className="w-3/5 min-w-[200px] h-10 border-2"
              id="input"
              type="text"
              placeholder=" Name ..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            ></input>
          </p>
          <br />
          <button
            className="px-1 mt-1 mx-1"
            onClick={() => {
              createNewUser(inputName);
              setInputName("");
              setIsAddNewUserCardOpen(false);
            }}
          >
            Create
          </button>
          <button
            className="px-1 mt-1 mx-1"
            onClick={() => setIsAddNewUserCardOpen(false)}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
