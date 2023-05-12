import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    if (cartItems.length > 0) {
      var items = [];
      for (var i = 0; i < cartItems.length; i++) {
        items.push(cartItems[i]);
      }

      const values = items.map(
        ({ name, product, price, brand, category, variant, quantity }) => ({
          name,
          id: product,
          price,
          brand,
          category,
          variant,
          quantity,
        })
      );

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "checkoutOption",
        ecommerce: {
          checkout: {
            actionField: { step: 3, option: "Payment info" },
            products: values,
          },
        },
      });

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
        event: "add_payment_info",
        ecommerce: {
          currency: "INR",
          value: 7.77,
          coupon: "SUMMER_FUN",
          payment_type: "Credit Card",
          items: values2
        },
      });
    }
    document.location = "http://localhost:3000/payment";
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <a href={`/product/${item.product}`}>{item.name}</a>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>₹{(item.quantity * item.price).toFixed(2)}</b>
                    </p>
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
              Subtotal:{" "}
              <span className="order-summary-values">₹{itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">₹{shippingPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">₹{totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
