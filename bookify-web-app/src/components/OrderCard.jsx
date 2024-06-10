import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const OrderCard = () => {
  const { bookId } = useParams();
  const { orderList } = useFirebase();

  const [orderData, setOrdeData] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      const docSnap = await orderList(bookId);
      setOrdeData(docSnap.docs);
    }
    fetchOrder();
  }, []);
  return (
    <div
      className="mt-5 d-flex"
      style={{ flexDirection: "column", gap: "20px" }}
    >
      <h3>Order Details</h3>
      {orderData.map((item) => {
        return (
          <div
            style={{ border: "1px solid black", borderRadius: "8px" }}
            className="p-2"
            key={item.id}
          >
            <p>Order by: {item.data().userDisplayName}</p>
            <p>Quatity: {item.data().qty}</p>
            <p>Email: {item.data().userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
