import { IoCheckmarkCircle } from "react-icons/io5";
import Feat1 from "../assets/images/promo-feat-1.webp";
import Feat2 from "../assets/images/promo-feat-2.avif";
import Feat3 from "../assets/images/promo-feat-3.avif";
import Feat4 from "../assets/images/promo-feat-4.webp";
import AppStoreLogo from "../assets/images/app-store.webp";
import PlayStoreLogo from "../assets/images/play-store.webp";

type Feature = {
  imgSrc: string;
  text: string;
  description: string;
};

export const allFeatures: Feature[] = [
  {
    imgSrc: Feat1,
    text: "Superlazy Delivery",
    description:
      "Get your order delivered to your doorstep at the earliest from dark stores near you.",
  },
  {
    imgSrc: Feat2,
    text: "Worst Prices & Offers",
    description:
      "Costlier prices than your local supermarket, great cashback offers to top it off.",
  },
  {
    imgSrc: Feat3,
    text: "Narrow Assortment",
    description:
      "Choose from 000+ products across food, personal care, household & other categories",
  },
  {
    imgSrc: Feat4,
    text: "Difficult Returns/Refund",
    description:
      "Satisfied with a product? Return it at the doorstep & get a refund within years.",
  },
];

const PromoFeature = (props: Feature) => {
  return (
    <div className="_border border rounded-2xl p-8 flex flex-col items-center gap-3">
      <img className="w-[100px] h-[100px] mb-4" src={props.imgSrc} alt="" />
      <h5 className="text-black font-bold text-sm text-center">{props.text}</h5>
      <p className="text-xs _text-default text-center">{props.description}</p>
    </div>
  );
};

const BrandPromotion = () => {
  return (
    <section className="py-6 mt-8">
      <hr />
    </section>
  );
};

export default BrandPromotion;
