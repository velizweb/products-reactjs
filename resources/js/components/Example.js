import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Example = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        stock_min: 0,
    });
    const [show, setShow] = useState(false);
    const [showFormComment, setShowFormComment] = useState(false);
    const [productId, setProductId] = useState(null);
    const [comment, setComment] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    useEffect(() => {
        (() => {
            axios.get(`http://localhost:8000/api/products`).then((response) => {
                setProducts(response.data);
            });
        })();
    }, []);

    const edit = (id) => {
        axios
            .get(`http://localhost:8000/api/product/${id}`)
            .then((resp) => {
                const { data } = resp;
                setShow(true);
                setProduct(data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const deleted = (id) => {
        axios
            .delete(`http://localhost:8000/api/product/${id}`)
            .then((resp) => {
                axios
                    .get(`http://localhost:8000/api/products`)
                    .then((response) => {
                        const { data } = response;
                        setProducts(data);
                    });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleStore = () => {
        const url = product.id
            ? `http://localhost:8000/api/product/${product.id}`
            : `http://localhost:8000/api/product/store`;
        axios
            .post(url, product)
            .then((resp) => {
                axios
                    .get(`http://localhost:8000/api/products`)
                    .then((response) => {
                        const { data } = response;
                        setShow(false);
                        setProducts(data);
                        setProduct({
                            name: "",
                            price: 0,
                            stock_min: 0,
                        });
                        Form.reset();
                    });
            })
            .catch((err) => console.log(err.response));
    };

    const handleCommentStore = () => {
        axios
            .post(`http://localhost:8000/api/comment/store`, {
                product_id: productId,
                comment,
            })
            .then((resp) => {
                console.log("comment register");
                setShowFormComment(false);
            })
            .catch((err) => console.log(err.response));
    };
    const handleCommentClose = () => setShowFormComment(false);

    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowFormComment = (product) => {
        setProductId(product);
        setShowFormComment(true);
    };

    const handleInfoComment = (product) => {
        console.log(product);
        setProduct(product);
        setShowComments(true);
    };

    const handleInfoCommentClose = () => setShowComments(false);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Button variant="primary" onClick={handleShow}>
                    Create Product
                </Button>
                <div className="col-md-8 ">
                    <div className="card">
                        <div className="card-header">Products</div>

                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock Min</th>
                                        <th scope="col">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products &&
                                        products.map((product) => {
                                            return (
                                                <tr>
                                                    <th scope="row">
                                                        {product.id}
                                                    </th>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock_min}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() =>
                                                                handleShowFormComment(
                                                                    product.id
                                                                )
                                                            }
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        >
                                                            Register comment
                                                        </button>
                                                        <button
                                                            className="btn btn-info"
                                                            onClick={() =>
                                                                handleInfoComment(
                                                                    product
                                                                )
                                                            }
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        >
                                                            Show Comments
                                                        </button>
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() =>
                                                                edit(product.id)
                                                            }
                                                            style={{
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                deleted(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {product.id ? "Update Product" : "New Product"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={product.name}
                                type="text"
                                placeholder="Enter name product"
                                onChange={(e) => onChange(e)}
                                name="name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={product.price}
                                type="number"
                                placeholder="Enter price"
                                onChange={(e) => onChange(e)}
                                name="price"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Stock Min</Form.Label>
                            <Form.Control
                                value={product.stock_min}
                                type="number"
                                placeholder="Enter stock Min"
                                onChange={(e) => onChange(e)}
                                name="stock_min"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleStore}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFormComment} onHide={handleCommentClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Enter comment"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCommentClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCommentStore}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showComments} onHide={handleInfoCommentClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments product: {product.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped">
                        <tbody>
                            {product.comments &&
                                product.comments.map((comment) => {
                                    return (
                                        <tr>
                                            <th scope="row">{comment}</th>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleInfoCommentClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
