import UserCard from "../UserCard/UserCard.jsx";

function Header({ listofUsers }) {
  return (
    <header className="w-full flex flex-row bg-light-blue border-2">
      <div className="bg-medium-blue w-3/5">
        {listofUsers && (
          <div className="flex flex-row">
            {listofUsers.map((data, index) => (
              <UserCard key={index} index={index} name={data.name} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-dark-blue w-2/5 py-1 md:py-4 lg:py-4">
        <button className="px-1 mt-1">Add New User</button>
        <button className="px-1 mt-1 mx-1">Import User Data</button>
        <button className="px-1 my-1 mx-1">Export User Data</button>
      </div>
    </header>
  );
}

export default Header;
