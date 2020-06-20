import React from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
} from "reactstrap";
// import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg
                    top
                    width="318px"
                    height="180px"
                    src={product.images_path}
                    alt="product Image"
                />
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardSubtitle>
                        <Link to={`/owners/${product.owner._id}`}>
                            {product.owner.name}
                        </Link>
                    </CardSubtitle>
                    <CardText>
                    {product.category.name}
                    </CardText>

                    <CardText>
                    {product.price}
                    </CardText>
                    <CardText>
                    {product.description}
                    </CardText>
                    <Link className="btn btn-primary" to={`/products/${product._id}`}>
                        View
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProductCard;