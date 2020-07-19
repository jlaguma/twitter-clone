import React, { FC, MouseEvent } from 'react';

interface Props {
    tweetsPerPage: number;
    totalTweets: number;
    paginate: any;
}

const Pagination: FC<Props> = ({ tweetsPerPage, totalTweets, paginate }) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalTweets / tweetsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (e: MouseEvent, pageNumber: number) => {
        e.preventDefault();
        paginate(pageNumber);
    };

    return (
        <div className="pagination">
            <ul>
                {pageNumbers.map((pageNumber) => {
                    return (
                        <li key={pageNumber}>
                            <a
                                onClick={(e) => handleClick(e, pageNumber)}
                                href="/"
                            >
                                {pageNumber}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Pagination;
