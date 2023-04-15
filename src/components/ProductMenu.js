import { useParams } from "react-router-dom";
import { FAB_INDIA_URL } from "../../constants";
import { useState, useEffect } from "react";
import ProductImage from "../assets/img/20091487-01.jpg"
import Shimmer from "./Shimmer";
import { useDispatch } from "react-redux"
import { addItem, removeItem } from "../utils/cartSlice";

const product_demo = {
    "name": "Beige Cotton Kalamkari",
    "tags": ["cotton", "beige"],
    "avgRating": 4.2,
    "cost": "1700",
    "menu": {
        "items": {
            "pink": 2,
        }
    },
    "description":"Create an extremely classy festive look with this slim-fit long kurta. Tailored to sartorial perfection from cotton, it assures a soft and soothing touch against the skin. The Chinese collar with the front button placket adds to its appeal. The roll-up sleeves with cuffs further speak for themselves. The hand-block printed pattern makes it an eccentric choice. Pair it with a churidar or pyjama with jutties for a complete look.",
    "specification":"Green Kurta Fabric: The kurta will be made from high-quality cotton, silk or linen fabric. The fabric will be lightweight, comfortable and breathable.Color: The kurta will be in a bright and refreshing shade of green. The green color will be vibrant, rich and long-lasting.Design: The kurta will have a simple and elegant design that reflects the traditional and cultural aspects of Indian attire. It will have a classic collar, full-length sleeves and a straight hemline.     Sizes: The kurta will be available in a range of sizes to fit different body types. The sizes will range from small to XXL."
}
const ProductMenu = () => {
    const { prodId } = useParams(); // call useParams and get value of product id using object destructuring
    console.log({ prodId })
    const [product, setProduct] = useState(null); // call useState to store the api data in res

    const[isDescriptionShow, setIsDescriptionShow]= useState(true)


    const dispatch = useDispatch();

    const handleAddItem = () => {
        dispatch(addItem("Grapes"))
    }

    const handleRemoveItem = () => {
        dispatch(removeItem())
    }

    useEffect(() => {
        getProductInfo(); // call getproductInfo function so it fetch api data and set data in res state variable
    }, []);

    async function getProductInfo() {
        try {
            //   const response = await fetch(FAB_INDIA_URL + "/"+prodId);
            //   const json = await response.json();
            setProduct(product_demo);
            console.log(product_demo.menu.items)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="product-page m-7">

            <div className="product-menu flex">
                <div className="product-summary">
                    <img className="product-img h-45 w-35"
                        src={ProductImage} />

                    <div className="product-summary-details m-7">
                        <h2 className="product-title">{product?.name}</h2>
                        <p className="product-tags">{product?.tags.join(", ")}</p>
                        <div className="product-details">
                            <div className="product-rating" e>
                                {product?.avgRating}
                            </div>
                            <div>{product?.cost}</div>
                        </div>
                    </div>
                </div>

                <div className="product-menu-content p-5">
                    <div className="menu-items-container">
                        <div className="menu-items-list">
                            {Object.values(product?.menu?.items || {}).map((item) => (
                                <div className="menu-item" key={item?.id}>
                                    <div className="menu-item-details">
                                        <h3 className="item-title">{item?.name}</h3>
                                        <p className="item-cost">
                                            {item?.price > 0
                                                ? new Intl.NumberFormat("en-IN", {
                                                    style: "currency",
                                                    currency: "INR",
                                                }).format(item?.price / 100)
                                                : " "}
                                        </p>
                                        <p className="item-desc">{item?.description}</p>
                                    </div>
                                    <div className="menu-img-wrapper">
                                        {item?.cloudinaryImageId && (
                                            <img
                                                className="menu-item-img"
                                                src={ITEM_IMG_CDN_URL + item?.cloudinaryImageId}
                                                alt={item?.name}
                                            />
                                        )}
                                        <div className="flex flex-wrap">
                                        <button className="add-btn rounded-full bg-zinc-200 text-stone-500 hover:bg-zinc-300 px-2" onClick={() => handleAddItem()}>+</button>
                                        <button className="add-btn rounded-full bg-zinc-200 text-stone-500 hover:bg-zinc-300 px-2" onClick={() => handleRemoveItem()}>-</button>
                                        </div>
                                    </div>
                                    
                                    <div className="product-details flex flex-wrap">
                                    <div className="product-description">
                                        <button className="font-medium px-1 py-2" onClick={()=>{setIsDescriptionShow(true)}}>Description</button>
                                     </div>
                                     <div className="product-specification">
                                        <button className="font-medium px-1 py-2" onClick={()=>{setIsDescriptionShow(false)}}>Specification</button>
                                     </div>
                                     <div className="w-300 h-300">
                                     {isDescriptionShow? <h1>{product?.description}</h1> : <h1>{product?.specification}</h1>}
                                     </div>

                                     </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductMenu;