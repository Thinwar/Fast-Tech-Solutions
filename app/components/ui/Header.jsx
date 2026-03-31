import Container from "./container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

import {
  Show,
  UserButton,
  SignInButton,
  SignUpButton,
  ClerkLoaded,
} from "@clerk/react-router";
import CartIcon from "./CartIcon";
import FavouriteButton from "./FavouriteButton";

export default function Header() {
  const Header = async () => {
    const user = await currentUser();
    console.log(user, "User");
  };
  return (
    <header className="bg-white  py-4">
      <Container className="flex items-center justify-between">
        {/* LEFT: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Logo />
        </div>

        {/* CENTER: Desktop Menu */}
        <HeaderMenu />

        {/* RIGHT: Search + Auth */}
        <div className="flex items-center gap-4">
          <SearchBar />
          <CartIcon />
          <FavouriteButton />
          <ClerkLoaded>
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="hidden sm:inline-block bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-600 transition font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
          </ClerkLoaded>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition font-semibold">
                Login
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </Container>
    </header>
  );
}
