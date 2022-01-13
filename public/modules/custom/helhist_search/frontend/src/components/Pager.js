import React from 'react';

const Pager = ({ currentPage, totalPages, onPageChange }) => {
  let pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const classNames = `pager-link ${(i === currentPage) ? "active" : ""}`;
    pageLinks.push(<button key={"pager"+i} onClick={() => onPageChange(i)} className={classNames} style={{marginRight: "3px"}}>{i}</button>);
  }

  return (
    <div className="pager">
      {currentPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>First</button>
          <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
        </>
      )}

      {pageLinks}
      
      {currentPage < totalPages && (
        <>
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
          <button onClick={() => onPageChange(totalPages)}>Last</button>
        </>
      )}
    </div>
  )
}

export default Pager;