import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const { pageSize, itemsCount, currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page, index) => {
                    return (
                        <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                            <a className="page-link" onClick={() => { onPageChange(page) }}>{page}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );


}

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;