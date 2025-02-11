"use client";

import Link from "next/link";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/">
        <IoIosCloseCircleOutline size={24} className="text-logo group-hover:text-logo transition-all duration-300" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
