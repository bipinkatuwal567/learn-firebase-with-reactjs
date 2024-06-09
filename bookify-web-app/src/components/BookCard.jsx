import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/FirebaseContext";

const BookCard = (props) => {
  const [imageURL, setImageURL] = useState(null);
  const { getImageURL } = useFirebase();

  const fetchImageURL = async () => {
    const image = await getImageURL(props.imageURL);
    setImageURL(image);
  };

  useEffect(() => {
    fetchImageURL();
  }, []);
  return (
    <Card style={{ width: "18rem", marginTop: "1rem" }}>
      <div style={{ width: "100%", height: "220px" }}>
        <img
          src={imageURL}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <Card.Body>
        <Card.Title>{props.bookName}</Card.Title>
        <Card.Text>Sold by: {props.userDisplayName}</Card.Text>
        <Card.Text>Price: {props.bookPrice}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
