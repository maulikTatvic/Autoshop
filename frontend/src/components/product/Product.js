import React from "react";

const Product = ({ product, col }) => {
  const productClickHandler = () => {
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "productClick",
      ecommerce: {
        click: {
          products: [
            {
              name: `${product.name}`, // Name or ID is required.
              id: `${product._id}`,
              price: `${product.price}`,
              brand: `${product.brand}`,
              category: `${product.category}`,
              variant: `${product.variant}`,
              position: `${product.position}`,
            },
          ],
        },
      },
      eventCallback: function () {
        document.location = `http://localhost:3000/product/${product._id}`;
      },
    });

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "home_12345",
        item_list_name: "home products",
        items: [
          {
            item_id: `${product._id}`,
            item_name: `${product.name}`,
            affiliation: "AutoShop Store",
            index: `${product.position}`,
            item_brand: `${product.brand}`,
            item_category:  `${product.category}`,
            item_category2: `${product.category2}`,
            item_category3: `${product.category3}`,
            item_variant: `${product.variant}`,
            price: `${product.price}`,
          },
        ],
      },
    });
  };
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={product.images[0].url} alt=""/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <p onClick={productClickHandler}>{product.name}</p>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">₹{product.price}</p>
          <button
            href={`/product/${product._id}`}
            id="view_btn"
            onClick={productClickHandler}
            className="btn btn-block"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
