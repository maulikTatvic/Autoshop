import React, { Fragment } from "react";

const bannerClickHandler = () => {
  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: "promotionClick",
    ecommerce: {
      promoClick: {
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
    eventCallback: function () {
      document.location =
        "http://localhost:3000/product/645e0c8917a074d67ef78cd2";
    },
  });

  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: "select_promotion",
    ecommerce: {
      creative_name: "AutoShop Creation",
      creative_slot: "Homepage Top",
      promotion_id: "123456789",
      promotion_name: "Tyre Banner",
      items: [
        {
          item_id: "	644ba45ea2cebd0fd131e083",
          item_name: "JK TYRE Taximax 4 Wheeler Tyre (185/65 R15, Tube Less)",
          affiliation: "Auto Shop Store",
          item_category: "Tyre",
          price: 650,
        },
      ],
    },
  });

  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: "select_promotion",
    ecommerce: {
      creative_name: "AutoShop Creation",
      creative_slot: "Homepage center",
      promotion_id: "987654321",
      promotion_name: "Battery Banner",
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
};

const banner2ClickHandler = () => {
  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: "promotionClick",
    ecommerce: {
      promoClick: {
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
    eventCallback: function () {
      document.location =
        "http://localhost:3000/product/645e0c8917a074d67ef78cd4";
    },
  });

  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: "select_promotion",
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
};

const Banners = () => {
  return (
    <Fragment>
      <div className="container banners">
        <div className="row search">
          <div className="banner1_img banner1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/image-6fe04.appspot.com/o/banner-car-tyres-empty-space-text-banner-car-tyres-empty-space-text-modern-167277902%20(2).jpg?alt=media&token=1fb84d0f-29c1-4a5d-97a2-fe5a93abec5e"
              className="img-fluid "
              alt=" "
              onClick={bannerClickHandler}
            />

            <div className="banner_text">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/image-6fe04.appspot.com/o/buy_1_get_1_free-transformed%20(1).png?alt=media&token=bf2097e7-6c18-4c51-bc32-232244f018be"
                className="img-fluid "
                alt=" "
              />
            </div>
          </div>
          <div className="banner1_img banner2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/image-6fe04.appspot.com/o/battry.webp?alt=media&token=d17ae9f2-0198-43ff-9c85-f3f4756f9d25"
              className="img-fluid"
              alt=""
              onClick={banner2ClickHandler}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Banners;
