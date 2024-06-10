import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const BookView = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [qty, setQty] = useState(1);

  const { getBook, getImageURL, placeOrder } = useFirebase();

  const fetchBookView = async () => {
    const docSnap = await getBook(id);
    if (docSnap.exists()) {
      setBookData(docSnap.data());
    }
  };

  const fetchBookImage = async () => {
    if (bookData) {
      const url = await getImageURL(bookData.imageURL);
      setImageURL(url);
    }
  };

  const buyBook = async (e) => {
    e.preventDefault();
    try{
      if (qty > 0) {
        const docRef = await placeOrder(id, qty); 
        toast.success("Book added successfully!")
      }
    }catch(e){
      toast.error(e.message)
    }
  };

  useEffect(() => {
    fetchBookView();
  }, []);

  useEffect(() => {
    fetchBookImage();
  }, [bookData]);

  if (bookData === null) {
    return <p>Loading..</p>;
  }

  return (
    <div
      className="mt-5"
      style={{ display: "flex", gap: "2rem", flexDirection: "column" }}
    >
      <div style={{ display: "flex", gap: "2rem" }}>
        <img
          src={imageURL}
          alt="book image"
          width={"180"}
          style={{ borderRadius: "8px", objectFit: "contain" }}
        />
        <div style={{ flex: "1" }}>
          <h3>{bookData.bookName}</h3>
          <div>
            <h3 style={{ fontSize: "20px" }}>Details</h3>
            <p>Price: Rs.{bookData.bookPrice}</p>
            <p>ISBN Number: {bookData.isbnNumber}</p>
          </div>

          <div>
            <h3 style={{ fontSize: "20px" }}>Owner Details</h3>
            <p>Name: {bookData.userDisplayName}</p>
            <p>Email: {bookData.userEmail}</p>
          </div>
        </div>
      </div>
      <div>
        <Form onSubmit={buyBook}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="success">
            Buy Book
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BookView;
