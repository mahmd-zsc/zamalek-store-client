import {
  faEllipsis,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../redux/slices/dashboardSlice";
import {
  getProduct,
  getProductById,
} from "../../redux/apiCalls/productApiCalls";
import DeleteCard from "../deleteCard/deleteCard";

function Action({ data }) {
  let [deleteProductCard, setDeleteProductCard] = useState(false);
  let dispatch = useDispatch();
  const [isActionMenuVisible, setActionMenuVisibility] = useState(false);
  const actionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setActionMenuVisibility(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  let editHandler = () => {
    dispatch(getProductById(data.id));
    dispatch(dashboardActions.setEditProductId(data.id));
    dispatch(dashboardActions.setAction("edit-product"));

    setActionMenuVisibility(false);
  };
  let deleteHandler = () => {
    setActionMenuVisibility(false);
    setDeleteProductCard(true);
  };

  return (
    <li
      className="relative action w-1/12 flex items-center justify-end"
      ref={actionRef}
    >
      <span
        onClick={() => setActionMenuVisibility(!isActionMenuVisible)}
        className="cursor-pointer rounded-full p-2 hover:bg-gray-50 duration-300 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faEllipsis} className=" " />
      </span>

      {isActionMenuVisible && (
        <div className="absolute right-0 top-4 mt-2 w-32  bg-gray-100 rounded-lg shadow-md z-30">
          <ul className="py-1">
            <li
              className="px-4 py-2 flex items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => editHandler()}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </li>
            <li
              className="px-4 py-2 flex items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => deleteHandler()}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </li>
          </ul>
        </div>
      )}
      <DeleteCard
        type={"product"}
        deleteCard={deleteProductCard}
        deleteId={data.id}
        setDeleteCard={setDeleteProductCard}
      />
    </li>
  );
}

export default Action;
