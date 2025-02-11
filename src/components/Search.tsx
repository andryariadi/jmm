import Form from "next/form";
import { BiSearchAlt } from "react-icons/bi";
import SearchFormReset from "./SearchFormReset";

const Search = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="bg-amber-500 group relative search w-full flex items-center justify-center">
      <input
        type="text"
        name="query"
        placeholder="Search Startup..."
        className={`max-w-2xl w-full py-3 px-5 bg-gray-800 rounded-full
        outline-none border border-logo focus:border-primary text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300`}
      />

      <div className="absolute right-[16rem] flex items-center gap-2">
        {query && <SearchFormReset />}

        <button type="submit">
          <BiSearchAlt size={24} className="text-logo group-hover:text-logo transition-all duration-300" />
        </button>
      </div>
    </Form>
  );
};

export default Search;
