import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import Moment from "react-moment";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";

const CouponsDiscount = () => {
  const [popup, setPopup] = useState(false);
  let token = localStorage.getItem("Shaft");
  const [edit, setEdit] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState({
    couponCode: "",
    expirationDate: "",
    discount: null,
    minOrder: null,
  });

  const handleChange = (event) => {
    setCoupon({ ...coupon, [event.target.name]: event.target.value });
  };

  const fetchCoupons = async () => {
    const url = BaseUrl() + "/coupen/all";
    try {
      const res = await axios.get(url, auth);
      console.log("res", res);
      setCoupons(res.data.coupons);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const addCoupon = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/coupen/seller";

    const data = {
      couponCode: coupon.couponCode,
      expirationDate: coupon.expirationDate,
      discount: coupon.discount,
      minOrder: coupon.minOrder,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      fetchCoupons();
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteCoupon = async (id) => {
    const url = BaseUrl() + `/coupen/${id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchCoupons();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Coupons
          </span>
          <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Coupons
          </button>
        </div>
        {/* Add Form */}
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 sm:h-[90vh] h-[80vh] overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(241,146,46)] ">
                Add Coupons
              </span>
              <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setEdit("");
                    setPopup(false);
                  }}
                />{" "}
              </div>
            </div>
            {console.log(edit?.name)}

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={addCoupon}
            >
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Coupon Code
                </label>
                <input
                  required
                  type="text"
                  name="couponCode"
                  value={coupon.couponCode}
                  onChange={handleChange}
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Expiration Date
                </label>
                <input
                  id="name"
                  required
                  type="date"
                  name="expirationDate"
                  placeholder=""
                  value={coupon.expirationDate}
                  onChange={handleChange}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Discount
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  name="discount"
                  placeholder=""
                  value={coupon.discount}
                  onChange={handleChange}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Min Order
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  name="minOrder"
                  placeholder=""
                  value={coupon.minOrder}
                  onChange={handleChange}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>

              <button
                type="submit"
                value="Add"
                className="bg-[rgb(241,146,46)] cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                Add{" "}
              </button>
            </form>
          </div>
        </section>
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-slate-200 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Activation Date
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Expiration Date
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Coupon Code
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Discount
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Min. Order
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  "></th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((e, i) => {
                return (
                  <tr key={i} className="tracking-wider text-gray-900 ">
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.activationDate.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.expirationDate.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.couponCode}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.discount}%
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {e.minOrder}
                    </td>
                    {/* <td className=" py-3  space-x-3">
                      <button className="font-semibold">
                        <GrFormClose
                          className="text-lg md:text-2xl"
                          onClick={() => deleteCoupon(e._id)}
                        />
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(CouponsDiscount);
