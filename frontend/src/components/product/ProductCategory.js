import React, { Fragment, useState, useEffect } from "react";
import Product from "./Product";

const ProductCategory = () => {
  const [pagecategory, setPageCategory] = useState([]);

  let cat_keyword = document.cookie
    .split("; ")
    .find((x) => x.startsWith("keyword="))
    .split("=")[1];
  console.log(cat_keyword);
  // const keyword = `${cat_keyword}`;

  useEffect(() => {
    console.log(cat_keyword);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/products?category=${cat_keyword}`
        );
        const data = await response.json();
        setPageCategory(data.products);
        console.log(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    window.addEventListener("load", () => {
      const callback2 = (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const response = await fetch(
              `/api/v1/products?keyword=${cat_keyword}`
            );
            const json = await response.json();
            var item = json.products;

            var product = [];
            for (var i = 0; i < item.length; i++) {
              product.push(item[i]);
            }

            const values = product.map(
              ({ name, _id, price, brand, category, variant, position }) => ({
                name,
                id: _id,
                price,
                brand,
                category,
                variant,
                position,
              })
            );

            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "productsImpression",
              ecommerce: {
                currencyCode: "EUR", // Local currency is optional.
                impressions: values,
              },
            });

            const values2 = product.map(
              ({
                _id,
                name,
                position,
                brand,
                category,
                category2,
                category3,
                variant,
                price,
              }) => ({
                item_id: _id,
                item_name: name,
                affiliation: "Autoshop store",
                index: position,
                item_brand: brand,
                item_category: category,
                item_category1: category2,
                item_category2: category3,
                item_variant: variant,
                price,
              })
            );

            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "view_item_list",
              ecommerce: {
                item_list_id: "related_products",
                item_list_name: "Related products",
                items: values2,
              },
            });
            observer2.unobserve(entry.target);
          }
        });
      };
      const options2 = { threshold: 0.1 };
      const observer2 = new IntersectionObserver(callback2, options2);
      const target2 = document.querySelector(".rounded");
      observer2.observe(target2);
    });
  }, [cat_keyword]);

  const handleBattery = () => {
    document.cookie = "keyword=Battery";
    document.location = "https://645e256ef532d60678f17e54--roaring-tulumba-34612a.netlify.app/category";
  };
  const handleTyre = () => {
    document.cookie = "keyword=Tyres";
    document.location = "https://645e256ef532d60678f17e54--roaring-tulumba-34612a.netlify.app/category";
  };
  const handleSteering = () => {
    document.cookie = "keyword=Steering%20Wheels";
    document.location = "http://localhost:3000/category";
  };
  const handleAEngine = () => {
    document.cookie = "keyword=Engine";
    document.location = "http://localhost:3000/category";
  };
  const handleHeadLamp = () => {
    document.cookie = "keyword=Head%20Lamp";
    document.location = "http://localhost:3000/category";
  };
  const handleEngineOil = () => {
    document.cookie = "keyword=Engine%20Oil";
    document.location = "http://localhost:3000/category";
  };
  return (
    <Fragment>
      <div className="product_category">
        <div className="row my-3">
          <div className="col-6 col-md-2 col-sm-4 ">
            <div className="card" onClick={handleTyre}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735289/products/tyre2_zpzm0u.webp"
                className="card-img-top"
                alt="..."
                style={{ height: "177px", width: "177px" }}
              />
              <div className="card-body my-1">
                <h5 className="card-title d-flex justify-content-center battery">
                  Tyre
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2 col-sm-4">
            <div className="card" onClick={handleEngineOil}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735293/products/gome_q9kjdj.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: "177px", width: "177px" }}
              />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-center tyre">
                  Engine Oil
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2 col-sm-4">
            <div className="card" onClick={handleBattery}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735288/products/exide_zycl3g.jpg"
                className="card-img-top"
                alt="..."
                style={{
                  height: "177px",
                  width: "177px",
                  padding: "unset",
                  paddingleft: "11px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-center sterringwheels">
                  Battery
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2 col-sm-4">
            <div className="card" onClick={handleAEngine}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735288/products/gasket_kit_Engine_w105ub.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: "177px", width: "177px" }}
              />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-center accessories">
                  Engine
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2 col-sm-4">
            <div className="card" onClick={handleHeadLamp}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735288/products/eltron_light_bmvagb.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: "177px", width: "177px" }}
              />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-center headlamp">
                  Head Lemps
                </h5>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2 col-sm-4">
            <div className="card" onClick={handleSteering}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735291/products/wheel_Assy_streering_1_yhyy6v.png"
                className="card-img-top"
                alt="..."
                style={{ height: "177px", width: "177px" }}
              />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-center">
                  Steering Wheels
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="my-4">Category Page</h3>
      {/* <section id="products" className="container mt-5">
        
        <div className="row">
          <div className="col-6 col-md-3 mt-5 mb-5">
            <div className="px-5">
              <Range
                marks={{
                  1: `₹1`,
                  1000: `₹1000`,
                }}
                min={1}
                max={1000}
                defaultValue={[1, 1000]}
                tipFormatter={(value) => `₹${value}`}
                tipProps={{
                  placement: "top",
                  visible: true,
                }}
                value={price}
                onChange={(price) => setPrice(price)}
              />

              <hr className="my-5" />

              <div className="mt-5">
                <h4 className="mb-3">Ratings</h4>

                <ul className="pl-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      key={star}
                      onClick={() => setRating(star)}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{
                            width: `${star * 20}%`,
                          }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-9">
            <div className="row">
              {pagecategory.map((product) => (
                <Product key={product._id} product={product} col={4} />
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <div className="row">
        {pagecategory.map((product) => (
          <Product key={product._id} product={product} col={3} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductCategory;
