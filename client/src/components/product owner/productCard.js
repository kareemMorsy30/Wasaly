import React from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardText,
} from "reactstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg
                    top
                    width="318px"
                    height="180px"
                    src={product.images_path[0]}
                    alt="product Image"
                />
                <CardBody>
                    <CardTitle>productname :{product.name}</CardTitle>
                    <CardSubtitle>
                        <Link to={`/owners/${product.owner}`}>
                            ownername :{product.owner.ownerName}
                        </Link>
                    </CardSubtitle>
                    <CardText>
                    category : {product.category.name}
                    </CardText>

                    <CardText>
                    price : {product.price}
                    </CardText>
                    <CardText>
                 desc:    {product.description}
                    </CardText>
                    <CardText>
                    marketName: {product.owner.marketName}
                    </CardText>
                    <CardText>
                    phonne: {product.owner.marketPhone}
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