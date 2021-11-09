import "../card/card.scss";
import { Card } from "../card/card";
import React, { useState, useEffect } from "react";

import {
  // getProducts,
  getProductsByCategoryId,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starOutline } from "@fortawesome/free-regular-svg-icons";
// import { useLocation } from  "react-router-dom";
const ListProducts = ({ match, location, history }) => {
  // const [dataState, setDataState] = useState([]);
  // const [sortType, setSortType] = useState("sort");
  // const [filterType, setFilterType] = useState("filterBrand");
  //call api
  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  const [starRating, setStarRating] = useState(0);
  useEffect(() => {
    if (match.params.id) {
      if (location.search) {
        dispatch(getProductsByCategoryId(match.params.id, location.search)); //?sort=rating
      } else {
        if (starRating) {
          dispatch(getProductsByCategoryId(match.params.id, location.search));
        }
        dispatch(getProductsByCategoryId(match.params.id, "?"));
      }

      console.log(location.search);
    }
  }, [dispatch, match.params.id, location.search]);
  const ratingFunction = (e) => {
    console.log(e.target.value);
    console.log(typeof location.search);
    console.log(location.search);
    setStarRating(e.target.value);
    console.log(starRating);
    if (location.search) {
      history.push(
        `/products/${match.params.id}${location.search}&rating[gte]=${e.target.value}`
      );
    } else {
      history.push(
        `/products/${match.params.id}?rating[gte]=${e.target.value}`
      );
    }
  };
  // onChange={(e) =>
  //   history.push(
  //     `/products/${match.params.id}?sort=${e.target.value}`
  //   )
  // }
  //
  // const {location} = useLocation();
  // console.log("match the params id", match.params.id);
  // console.log("location search for query", location.search);
  // console.log("location search for query", history);
  // history.push(`products/5f15d467f3a046427a1c26e1/?sort=`);
  return (
    <>
      {products.productReducer.length !== 0 &&
        typeof products.productReducer !== "undefined" && (
          <div className="container-fluid mt-5 pt-5">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <div className="container large-left-sider">
                  <div className="row pl-3">
                    <div className="col-12 pt-3">
                      <p
                        style={{
                          fontSize: "20px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        sort
                      </p>
                      {/* <select >
                      onChange={(e) => setSortType(e.target.value)}
                        <option value="sort">no sort</option>
                        <option value="price">price</option>
                        <option value="name">name</option>
                        <option value="rating">rating</option>
                      </select> */}
                      {/* history.push(`/products/${match.params.id}?sort=-price,name`); */}
                      <div
                        onChange={(e) =>
                          history.push(
                            `/products/${match.params.id}?sort=${e.target.value}`
                          )
                        }
                      >
                        <input type="radio" value="price" name="sort" /> price{" "}
                        <br />
                        <input
                          type="radio"
                          value="name"
                          name="sort"
                        /> name <br />
                        <input
                          type="radio"
                          value="rating"
                          name="sort"
                        /> rating <br />
                      </div>
                      <br />
                    </div>
                    <div className="col-12 pt-3">
                      <p
                        style={{
                          fontSize: "20px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        rating
                      </p>
                      <div onChange={(e) => ratingFunction(e)}>
                        <input type="radio" value="4" name="rating" />{" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={starOutline} />
                        &nbsp;& above
                        <br />
                        <input type="radio" value="3" name="rating" />{" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        &nbsp;& above
                        <br />
                        <input type="radio" value="2" name="rating" />{" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        &nbsp;& above
                        <br />
                        <input type="radio" value="1" name="rating" />{" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        <FontAwesomeIcon icon={starOutline} />
                        &nbsp;& above
                        <br />
                      </div>
                      <br />
                    </div>
                    <div className="col-12 pt-3">
                      <p
                        style={{
                          fontSize: "20px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        brands
                      </p>

                      <select>
                        {/* onChange={(e) => setFilterType(e.target.value)} */}
                        <option value="filterBrand">no filter</option>
                        {/* {brands.map((brand, index) => (
                      <option value={brand} key={index}>
                        {brand}
                      </option>
                    ))} */}
                      </select>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 pl-0"
                style={{ borderLeft: "1px solid grey" }}
              >
                <div className="row">
                  {products.productReducer.data.data.map((product, index) => (
                    <Card
                      key={index}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
export default ListProducts;
