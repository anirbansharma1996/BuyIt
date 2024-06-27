import { useNavigate, useSearchParams } from "react-router-dom";
import Categories from "../lib/data/categories.json";
import { useEffect, useState } from "react";
import { Category, SubCategory, InnerSubCategory } from "../utils/types";
import CategoryCard from "../components/CategoryCard";

const CategoryView = () => {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState<SubCategory[]>([]);
  const [categorylist, setCategoryList] = useState<string[]>([]);
  const [innersubcategories, setInnerSubcategories] = useState<InnerSubCategory[]>([]);
  const [params] = useSearchParams();

  const category = params.get("title");

  useEffect(() => {
    setCategoryList(Categories.map((el: Category) => el.title));

    if (category) {
      const filteredCategories = Categories.filter(
        (el: Category) => el.title === category
      );
      if (filteredCategories.length > 0) {
        const categoryData = filteredCategories[0];
        setSubcategory(categoryData.subcategories);
        setInnerSubcategories(categoryData.subcategories[0].subcategories)
      }
    }
  }, [category]);

  const handleSubCat = (element: SubCategory) => {
    setInnerSubcategories(element.subcategories);
  };

  return (
    <>
      <div className="categories-list-items">
        {categorylist.map((el: string) => (
          <p
            className="cursor-pointer mt-6 lg:mt-0"
            key={el} 
            onClick={() =>
              navigate(`/category?title=${encodeURIComponent(el)}`)
            }
          >
            {el}
          </p>
        ))}
      </div>
      <div className="category-main w-[95%] m-auto p-2">
        <div className="categories-list">
          {subcategory?.map((el: SubCategory) => (
            <div
              onClick={() => handleSubCat(el)}
              key={el.product_id} 
              className="categories-images flex items-center gap-1 border-2 border-grey-900 m-1 rounded l cursor-pointer"
            >
              <img
                className="aspect-square mt-3"
                width={40}
                height={60}
                src={el.icon}
                alt={el.title}
              />
              <h4 className="text-sm">{el.title}</h4>
            </div>
          ))}
        </div>
        <div className="categories-item grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
          {innersubcategories?.map((item, i) => (
            <CategoryCard key={i} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryView;
