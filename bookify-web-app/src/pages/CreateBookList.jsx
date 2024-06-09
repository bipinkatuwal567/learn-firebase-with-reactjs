import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";

const CreateBookListPage = () => {
  const [bookName, setBookName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState("");

  const { handleCreateNewListing } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateNewListing(bookName, isbnNumber, bookPrice, bookImage);
  };
  return (
    <div className="container mt-5">
      <h2>Add book to the list</h2>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN number"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Book price"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setBookImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Add Book</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateBookListPage;
