import React from 'react';
import ReactPaginate from 'react-paginate';

const Pager = ({ currentPage, totalPages, onPageChange }) => {
  let pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const classNames = `pager-link ${(i === currentPage) ? "active" : ""}`;
    pageLinks.push(<button key={"pager"+i} onClick={() => onPageChange(i)} className={classNames} style={{marginRight: "3px"}}>{i}</button>);
  }

  return (
    <div className="pager">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(ev) => onPageChange(ev.selected + 1)}
        initialPage={currentPage - 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pager;