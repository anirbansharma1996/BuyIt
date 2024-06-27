import { useNavigate } from "react-router-dom";
import Categories from "../../lib/data/categories.json";
type SubCategory = {
  id: number;
  title: string;
  image: string;
  icon: string;
};

type Category = {
  id: number;
  title: string;
  icon: string;
  image: string;
  coverFile: string;
  subcategories: SubCategory[];
};

type Props = {};

const CategoriesList = (props: Props) => {
  const navigate = useNavigate();

  const handleSubCategory = (title: string) => {
    const encodedTitle = encodeURIComponent(title)
    navigate(`/category?title=${encodedTitle}`);
  };
  return (
    <section className="my-4">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 my-2">
        {Categories.map((c) => (
          <div
            onClick={() => handleSubCategory(c.title)}
            key={c.product_id}
            className="h-48 cursor-pointer"
          >
            <img
              src={`categories/${c.coverFile}`}
              className="mx-auto h-full w-full object-contain"
              alt={c.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
