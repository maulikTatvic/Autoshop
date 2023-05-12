import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const paymentInfoStr = localStorage.getItem("orderSucess");
    const paymentInfoObj = JSON.parse(paymentInfoStr);
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

    console.log(values);

    if (!Array.isArray(window.dataLayer)) {
      window.dataLayer = [];
    }

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "purchase_GA3",
        ecommerce: {
          purchase: {
            actionField: {
              id: `${paymentInfoObj.paymentInfo.id}`,
              affiliation: "Online Store",
              revenue: `${paymentInfoObj.totalPrice}`,
              shipping: `${paymentInfoObj.shippingPrice}`,
            },
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
          event: "purchase",
          isUA:false,
          ecommerce: {
            transaction_id: `${paymentInfoObj.paymentInfo.id}`,
            shipping:`${paymentInfoObj.shippingPrice}`,
            currency: "INR",
            items: values2
          },
        });
      
    
  }, [cartItems]);

  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      {!document.cookie.match(/value/) ? (
        (window.location.href = "http://localhost:3000/")
      ) : (
        <Fragment>
          <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
              <img
                className="my-5 img-fluid d-block mx-auto"
                src="/Images/Order_Success.gif"
                alt="Order Success"
                width="200"
                height="200"
              />

              <h2>Your Order has been placed successfully.</h2>

              <a href="/orders/me">Go to Orders</a>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderSuccess;
