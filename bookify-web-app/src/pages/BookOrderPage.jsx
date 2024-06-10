import React, { useEffect, useState } from "react";

import { useFirebase } from "../context/FirebaseContext";
import BookCard from "../components/BookCard";
import { Stack } from "react-bootstrap";

const BookOrderPage = () => {
  const { fetchBookList } = useFirebase();

  const [bookList, setBookList] = useState([]);

  const fetchData = async () => {
    const snapshot = await fetchBookList();
    setBookList(snapshot.docs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <h2>Order List</h2>
      <Stack direction="horizontal" gap={4}>
        {bookList.map((item) => (
          <BookCard
            key={item.id}
            link={`/book/order/${item.id}`}
            id={item.id}
            btnText={"Check Order"}
            {...item.data()}
          />
        ))}
      </Stack>
    </div>
  );
};

export default BookOrderPage;
