import { useNavigate } from "react-router-dom";
import AddToCartButton from "./shared/AddToCartButton";
import { InnerSubCategory } from "../utils/types";
import { convertTextToURLSlug } from "../utils/helper";

const CategoryCard = ({ data }: { data: InnerSubCategory }) => {
  const navigate = useNavigate();
  const { product_id, title, image } = data;
  const cartProduct = {
    id: product_id.toString(),
    title: title,
    image: image,
    price: 100,
    mrp: 130,
  };

  const handleProductClick = () => {
    const pname = convertTextToURLSlug(data.title);
    navigate({
      pathname: `/prn/${pname}/prid/${data.product_id}`,
    });
  };

  return (
    <div
      className="_card h-[270px] w-[180px] relative flex cursor-pointer mb-2 mx-auto sm:mx-0"
      onClick={handleProductClick}
    >
      <div className="h-[154px] w-154px">
        <img src={image} alt="" className="h-full w-full p-2" />
      </div>
      <div className="overflow-hidden text-left flex flex-col mt-auto">
        <div className="_text-default text-[13px] font-medium leading-tight line-clamp-2 mb-0.5">
          {title}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[14px] _text-default">₹{100}</span>
          </div>
          <div className="h-9 w-[90px]">
            <AddToCartButton product={cartProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
