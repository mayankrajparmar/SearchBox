import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  personName: string;
  imageUrl: string;
  emailId: string;
}

const SearchBox = () => {
  const Person_Arr: User[] = [
    {
      id: 1,
      personName: "Olivia Johnson",
      imageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
      emailId: "olivia@example.com",
    },
    {
      id: 2,
      personName: "Peter Smith",
      imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
      emailId: "peter@example.com",
    },
    {
      id: 3,
      personName: "Quinn Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/13.jpg",
      emailId: "quinn@example.com",
    },
    {
      id: 4,
      personName: "Ryan Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
      emailId: "ryan@example.com",
    },
    {
      id: 5,
      personName: "Samantha White",
      imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
      emailId: "samantha@example.com",
    },
    {
      id: 6,
      personName: "Tyler Taylor",
      imageUrl: "https://randomuser.me/api/portraits/men/16.jpg",
      emailId: "tyler@example.com",
    },
    {
      id: 7,
      personName: "Ursula Anderson",
      imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
      emailId: "ursula@example.com",
    },
    {
      id: 8,
      personName: "Vincent Lee",
      imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
      emailId: "vincent@example.com",
    },
    {
      id: 9,
      personName: "Wendy Robinson",
      imageUrl: "https://randomuser.me/api/portraits/women/19.jpg",
      emailId: "wendy@example.com",
    },
    {
      id: 10,
      personName: "Xavier Miller",
      imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
      emailId: "xavier@example.com",
    },
  ];

  const [inputValue, setInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<User[]>(Person_Arr);
  const [selectedChip, setSelectedChip] = useState<User[]>([]);
  const [lastIndex, setLastIndex] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handelChange = (item: string) => {
    setInputValue(item);
    const filteredData = Person_Arr.filter(
      (curUser) =>
        curUser.personName.toLowerCase().includes(item.toLowerCase()) &&
        !selectedChip.find((selectedUser) => selectedUser.id === curUser.id)
    );

    if (filteredData.length > 0) setFilteredItems([...filteredData]);
    else setFilteredItems([]);
  };

  const handleItemToggle = (item: User) => {
    setSelectedChip((prevChips: User[]) =>
      prevChips.some(
        (selectedItem: { id: number }) => selectedItem.id === item.id
      )
        ? prevChips.filter(
            (selectedItem: { id: number }) => selectedItem.id !== item.id
          )
        : [...prevChips, item]
    );
    setInputValue("");
  };

  const handleRemovePerson = (item: User) => {
    setSelectedChip((prevChips) =>
      prevChips.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  useEffect(() => {
    if (selectedChip?.length === 1) {
      setLastIndex([...selectedChip]);
    }
    const backSpace = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (selectedChip.length > 0) {
          const updatedSelectedChip = [...selectedChip];
          updatedSelectedChip.pop();
          setSelectedChip(updatedSelectedChip);
          setLastIndex(updatedSelectedChip.length > 0 ? [] : [...lastIndex]);
        } else {
          setSelectedChip([...lastIndex]);
        }
      }
    };
    window.addEventListener("keydown", backSpace);
    return () => {
      window.removeEventListener("keydown", backSpace);
    };
  }, [selectedChip.length, showUsers]);

  return (
    <div className="w-full items-center flex justify-center">
      <div className="flex flex-col gap-6 w-fit bg-slate-200 rounded-xl p-10 items-center shadow-md">
        <h1 className="text-xl md:text-3xl font-bold text-indigo-400">
          {" "}
          Search Person By Name
        </h1>

        <div className="flex justify-center items-center w-[40rem] h-fit gap-2 flex-wrap border-2 border-indigo-400 rounded-lg p-2">
          {/* Selected users showing  */}
          {selectedChip?.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between gap-2 px-2 py-1 rounded-full bg-green-200"
            >
              <div className="flex items-center gap-1">
                <img
                  src={item?.imageUrl}
                  className="rounded-full w-7 h-7"
                  alt=""
                />
                <p className="text-sm font-semibold text-gray-800">
                  {item?.personName}
                </p>
              </div>
              <p
                onClick={() => handleRemovePerson(item)}
                className="text-lg font-semibold cursor-pointer text-gray-800"
              >
                X
              </p>
            </div>
          ))}
          <input
            type="text"
            className="outline-none bg-transparent text-gray-800"
            name=""
            id=""
            value={inputValue}
            placeholder="Type for search person "
            onChange={(e) => handelChange(e?.target?.value)}
            onFocus={() => setShowUsers(true)}
          />
        </div>

        {showUsers && (
          <div
            ref={modalRef}
            className={`w-[40rem] max-h-[20rem] min-h-fit overflow-y-auto duration-300 ease-out transition-all rounded-lg p-2 flex flex-col justify-center items-center gap-2  text-center`}
          >
            {filteredItems?.filter(
              (curId) =>
                !selectedChip.find((selectedChipId) => selectedChipId === curId)
            ).length > 0 ? (
              filteredItems
                ?.filter(
                  (curId) =>
                    !selectedChip.find(
                      (selectedChipId) => selectedChipId === curId
                    )
                )
                ?.map((item) => (
                  <div
                    key={item?.id}
                    onClick={() => handleItemToggle(item)}
                    className="flex items-center  gap-5 cursor-pointer hover:bg-gray-300 rounded-lg duration-200 px-3 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-3/4"
                  >
                    <img
                      src={item?.imageUrl}
                      className="w-14 h-14 rounded-full object-center"
                      alt="Person-Image-Error"
                    />
                    <div className="flex gap-3">
                      <p className="text-black">{item?.personName}</p>
                      <p className="text-black">{item?.emailId}</p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-white font-semibold">Person Not Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
