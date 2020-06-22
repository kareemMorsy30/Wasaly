import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';
import Pagination from '../../utils/pagination';
import { paginate } from '../../utils/paginate';
import { Container, CardDeck } from 'reactstrap';

const ListcatProducts = ({ productsList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(8);
    
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedproductList = paginate(productsList, currentPage, pageSize);

    return (
        <Container>
            <br />
            <CardDeck>
                {
                    paginatedproductList.map((product, index) => {
                        return (
                            <ProductCard
                                key={ index }
                                product={ product }
                                // handleClick={handleClick}
                            />
                        );
                    })
                }
            </CardDeck>
                <br/>
            <Pagination
                pageSize={ pageSize }
                itemsCount={ productsList.length }
                currentPage={ currentPage }
                onPageChange={ handlePageChange }
            />
        </Container>
    );
}

export default ListcatProducts;