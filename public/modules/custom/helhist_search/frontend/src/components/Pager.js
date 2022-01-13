import React from 'react';

const Pager = ({ currentPage, totalPages, onPageChange }) => {
  let pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const classNames = `pager-link ${(i === currentPage) ? "active" : ""}`;
    pageLinks.push(<button key={"pager"+i} onClick={() => onPageChange(i)} className={classNames} style={{marginRight: "3px"}}>{i}</button>);
  }

  return (
    <div className="pager">
      {pageLinks}
    </div>
  )
}

export default Pager;