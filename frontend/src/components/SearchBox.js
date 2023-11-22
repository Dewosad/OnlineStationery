import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(navigate(navigate.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <div className="d-flex align-items-center">
        <FormControl
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2"
          style={{ marginRight: "8px" }}
        />
        <Button type="submit" variant="outline-success" className="p-2">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
