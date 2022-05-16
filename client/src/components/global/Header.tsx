import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { authSelector } from "../../redux/selector/selectors";
import { useDispatch, useSelector } from "react-redux";
import actionAuth from "../../redux/action/actionAuth";
import LazyLoadingImg from "../LazyLoadingImg/LazyLoadingImg";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

const accessPage = [
  {
    path: "login",
    name: "Login",
  },
  { path: "register", name: "Register" },
];

const listInfoOfUser = {
  profileUser: {
    name: "Your profile",
    path: "/your_profile",
  },
  settingUser: {
    name: "Setting",
    path: "/your_setting",
  },
  createCategory: {
    name: "Create Category",
    path: "/create_category",
  },
  signOut: {
    name: "Sign out",
  },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { authUser } = useSelector(authSelector);

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!authUser.access_token) return;
    actionAuth.logoutAction(authUser.access_token, dispatch);
  };
  return (
    <Disclosure as="nav" className="shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16 ">
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex">
                    <LazyLoadingImg
                      url="https://media.istockphoto.com/photos/graduation-hat-and-diploma-cartoon-style-with-clouds-on-abstract-3d-picture-id1338320564?s=612x612"
                      alt="Logo"
                      className="hidden lg:block h-8 w-auto"
                    />
                    <h1 className="md:block sm:hidden xs:hidden font-semibold ml-5 ">
                      LEARNING CODE
                    </h1>
                  </Link>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                {/* Search */}
                <div className="flex border-2 rounded-full">
                  <form action="" className="flex items-center max-w-[300px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="outline-0 rounded-full max-w-[200px] p-2"
                    />
                    <button className="hover:bg-sky-600 hover:text-white rounded-r-full h-full transition px-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div>
                  {authUser.user ? (
                    <>
                      {/* Icon Information */}
                      <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                          type="button"
                          className="p-1 rounded-full text-gray-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <LazyLoadingImg
                                url={`${authUser.user?.avatar}`}
                                alt=""
                                className="h-8 w-8 rounded-full"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {/* Your Profile */}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`${listInfoOfUser.profileUser.path}`}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {listInfoOfUser.profileUser.name}
                                  </Link>
                                )}
                              </Menu.Item>

                              {/* Setting */}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`${listInfoOfUser.settingUser.path}`}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {listInfoOfUser.settingUser.name}
                                  </Link>
                                )}
                              </Menu.Item>

                              {/* Create Categories */}
                              {authUser.user.role === "admin" ? (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={listInfoOfUser.createCategory.path}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {listInfoOfUser.createCategory.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ) : (
                                ""
                              )}

                              {/* Sign out */}
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={handleLogout}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 w-full flex justify-items-start"
                                        : "",
                                      "flex justify-items-start px-4 py-2 text-sm text-gray-700 w-full"
                                    )}
                                  >
                                    {listInfoOfUser.signOut.name}
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-3">
                      {accessPage.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            to={`${item.path}`}
                            className="rounded-full"
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
