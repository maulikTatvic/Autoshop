import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";
import Banners from "./product/Banners";
import Category from "./product/Category";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Engine Oil",
    "Head Lamp",
    "Engine",
    "Accessories",
    "Steering Wheels",
    "Tyres",
    "Battery",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));

    window.addEventListener("load", async () => {
      //Banner1
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "promotionImpression",
              ecommerce: {
                promoView: {
                  promotions: [
                    {
                      id: "123456789", // Name or ID is required.
                      name: "Tyre Banner",
                      creative: "AutoShop Creation",
                      position: "Homepage Top",
                    },
                  ],
                },
              },
            });

            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "view_promotion",
              ecommerce: {
                creative_name: "AutoShop Creation",
                creative_slot: "Homepage Top",
                promotion_id: "123456789",
                promotion_name: "Tyre Banner",
                items: [
                  {
                    item_id: "645b6a34fd62a516c66c547e",
                    item_name:
                      "Goodyear TYRE Taximax 4 Wheeler Tyre (185/65 R15, Tube Less)",
                    affiliation: "Autoshop store",
                    index: 2,
                    item_brand: "Goodyear",
                    item_category: "Tyres",
                    item_category2: "Motorcycle tyres",
                    item_category3: "Racing tyres",
                    item_variant: "Goodyear Assurance MaxLife 215/60R16 95V",
                    price: 5000,
                  },
                ],
              },
            });

            observer.unobserve(entry.target);
          }
        });
      };
      const options = { threshold: 0.1 };
      const observer = new IntersectionObserver(callback, options);
      const target = document.querySelector(".banner1");
      observer.observe(target);

      //Banner 2
      const callback1 = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "promotionImpression",
              ecommerce: {
                promoView: {
                  promotions: [
                    {
                      id: "987654321", // Name or ID is required.
                      name: "Battery Banner",
                      creative: "AutoShop Creation",
                      position: "Homepage center",
                    },
                  ],
                },
              },
            });

            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "view_promotion",
              ecommerce: {
                creative_name: "AutoShop Creation",
                creative_slot: "Homepage center",
                promotion_id: "987654321",
                promotion_name: "Battery Banner",
                items: [
                  {
                    item_id: "	645b6a34fd62a516c66c5480",
                    item_name: "EXIDE XP 880 Battery for Vehicle (Red)",
                    affiliation: "Autoshop store",
                    index: 4,
                    item_brand: "Exide",
                    item_category: "Battery",
                    item_category2: "Motorcycle batteries",
                    item_category3: "Lead-acid batteries",
                    item_variant:
                      "Exide XP 880 FP-AGML4/94R Flat Plate AGM Sealed Automotive Battery",
                    price: 15000,
                  },
                ],
              },
            });
            observer1.unobserve(entry.target);
          }
        });
      };
      const options1 = { threshold: 0.1 };
      const observer1 = new IntersectionObserver(callback1, options1);
      const target1 = document.querySelector(".banner2");
      observer1.observe(target1);

      //Products

      const callback2 = (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const response = await fetch(`/api/v1/products`);
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
            console.log(values2);

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
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <Category />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
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
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

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
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <Banners />
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} col={3} />
                    ))}
                </Fragment>
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
