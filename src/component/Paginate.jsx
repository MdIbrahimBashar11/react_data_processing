import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Paginate({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const maxPagesToShow = 5; // Number of page numbers to show at a time

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the range of page numbers to display
  let pageRange;
  if (totalPages <= maxPagesToShow) {
    pageRange = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    const lowerBound = Math.max(1, currentPage - halfMaxPagesToShow);
    const upperBound = Math.min(totalPages, currentPage + halfMaxPagesToShow);

    pageRange = Array.from({ length: upperBound - lowerBound + 1 }, (_, index) => lowerBound + index);
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className='text-center py-4'>Show Data</h1>
      <div className='container'>
        <div className='row'>
          {currentItems.map((item) => (
            <div className='col-md-4' key={item.id}>
              <div className='card mb-4'>
                <img src={item.thumbnailUrl} className='card-img-top' alt={item.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{item.title}</h5>
                  <p className='card-text'>Album ID: {item.id}</p>
                  <Link to={`/details/${item.id}`} className='btn btn-primary'>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <nav aria-label='Page navigation'>
              <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className='page-link' onClick={handlePrevPage}>
                    Previous
                  </button>
                </li>
                {pageRange.map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <button
                      className='page-link'
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className='page-link' onClick={handleNextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paginate;
