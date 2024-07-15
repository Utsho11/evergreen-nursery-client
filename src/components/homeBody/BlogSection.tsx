import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const BlogSection = () => {
  return (
    <div className="mb-32 container mx-auto">
      <div className="text-center mx-auto px-32">
        <h1 className="text-4xl font-medium pb-16">Plants Make Life Better</h1>
        <p className="text-[#767676] text-sm text-pretty pb-12">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book software like Aldus
          PageMaker including versions of Lorem Ipsum.it to make a type specimen
          book software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <NavLink to="/blogs">
          <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
            READ MORE
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default BlogSection;
