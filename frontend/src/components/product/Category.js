import React from "react";
const handleBattery = () => {
  document.cookie = "keyword=Battery";
  document.location = "http://localhost:3000/category";
};
const handleTyre = () => {
  document.cookie = "keyword=Tyres";
  document.location = "http://localhost:3000/category";
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
export default function Category() {
  return (
    <div>
      <div className="product_category">
        <div className="row my-3">
          <div className="col-6 col-md-2 col-sm-4 ">
            <div className="card" onClick={handleTyre}>
              <img
                src="https://res.cloudinary.com/autoshop/image/upload/v1646735289/products/tyre2_zpzm0u.webp"
                className="card-img-top"
                alt="..."
                style={{ height: "177px" }}
              />
              <div className="card-body my-1">
                <h5 className="card-title d-flex justify-content-center battery">
                  Tyres
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
                style={{ height: "177px" }}
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
                style={{ height: "177px" }}
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
                style={{ height: "177px" }}
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
                style={{ height: "177px" }}
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
    </div>
  );
}
