import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartItems.length > 0) {
      var items = [];
      for (var i = 0; i < cartItems.length; i++) {
        items.push(cartItems[i]);
      }

      const values = items.map(
        ({
          product,
          name,
          position,
          brand,
          category,
          category2,
          category3,
          variant,
          price,
          quantity,
        }) => ({
          item_id: product,
          item_name: name,
          affiliation: "Autoshop store",
          index: position,
          item_brand: brand,
          item_category: category,
          item_category1: category2,
          item_category2: category3,
          item_variant: variant,
          price,
          quantity,
        })
      );

      if (!Array.isArray(window.dataLayer)) {
        window.dataLayer = [];
      }

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "view_cart",
        ecommerce: {
          currency: "INR",
          items: values,
        },
      });
    }
  }, [cartItems]);

  const removeCartItemHandler = async (id, quantity) => {
    const response = await fetch(`/api/v1/product/${id}`);
    const json = await response.json();
    var item = json.product;

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: 7.77,
        items: [
          {
            item_id: `${item._id}`,
            item_name: `${item.name}`,
            affiliation: "Autoshop Store",
            index: `${item.position}`,
            item_brand: `${item.brand}`,
            item_category: `${item.category}`,
            item_category2: `${item.category2}`,
            item_category3: `${item.category3}`,
            item_variant: `${item.variant}`,
            price: `${item.price}`,
            quantity: `${quantity}`,
          },
        ],
      },
    });
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    if (cartItems.length > 0) {
      var items = [];
      for (var i = 0; i < cartItems.length; i++) {
        items.push(cartItems[i]);
      }

      const values2 = items.map(
        ({
          product,
          name,
          position,
          brand,
          category,
          category2,
          category3,
          variant,
          price,
          quantity,
        }) => ({
          item_id: product,
          item_name: name,
          affiliation: "Autoshop store",
          index: position,
          item_brand: brand,
          item_category: category,
          item_category1: category2,
          item_category2: category3,
          item_variant: variant,
          price,
          quantity,
        })
      );

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "INR",
          items: values2,
        },
      });

      history.push("/login?");
      history.push("/shipping");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />

                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <a href={`/product/${item.product}`}>{item.name}</a>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">₹{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() =>
                            removeCartItemHandler(item.product, item.quantity)
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Total Products:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Products)
                  </span>
                </p>
                <p>
                  Total Price:{" "}
                  <span className="order-summary-values">
                    ₹
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
