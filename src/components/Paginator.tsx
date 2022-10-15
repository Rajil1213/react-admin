import React  from 'react'

const Paginator = (props: {
    page: number, 
    lastPage: number, 
    pageChanged: (page: number) => void
}) => {

    /**
     * Call Paginator with:
     * @param page The current page
     * @param lastPage The `lastPage` for pagination
     * @param pageChange An emitter function that increments the value of page, props.pageChanged(pageVal) === setPage(pageVal) (in parent component)
     */


    const next = () => {
        let pageVal = props.page < props.lastPage? props.page + 1: props.lastPage;
        props.pageChanged(pageVal);
    }

    const previous = () => {
        let pageVal = props.page > 1? props.page - 1: 1;
        props.pageChanged(pageVal);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={previous}>Previous</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={next}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator;