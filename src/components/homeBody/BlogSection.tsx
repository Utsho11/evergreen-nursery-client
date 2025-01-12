import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const BlogSection = () => {
  return (
    <div className="my-24 container mx-auto px-4">
      <div className="text-center mx-auto lg:px-32">
        <h1 className="text-3xl sm:text-4xl font-medium pb-8">
          Plants Make Life Better
        </h1>
        <p className="text-[#767676] text-sm sm:text-base leading-relaxed pb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Software like Aldus
          PageMaker including versions of Lorem Ipsum were used to make a type
          specimen book.
        </p>
        <NavLink to="/blogs">
          <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8 py-3">
            READ MORE
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default BlogSection;
