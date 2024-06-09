import React, { useEffect, useState } from "react";

import { useFirebase } from "../context/FirebaseContext";
import BookCard from "../components/BookCard";
import { Row, Stack } from "react-bootstrap";

const HomePage = () => {
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
      <h2>Book List</h2>
      <Stack direction="horizontal" gap={4}>
      {bookList.map((item) => (
        <BookCard key={item.id} {...item.data()} />
      ))}
      </Stack>
    </div>
  );
};

export default HomePage;
