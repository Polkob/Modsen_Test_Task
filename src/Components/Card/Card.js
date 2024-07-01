import react, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './Card.css';

const Card = ({ book }) => {
    const navigate = useNavigate(); 
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();
    console.log(book);

    const handleClick = (item) => {
        setItem(item);
        setShow(true);
        navigate(`book/${item.id}`);
    };

    return (
        <>
            {
                book.map((item) => {

                    const volumeInfo = item.volumeInfo;
                    const thumbnail = volumeInfo?.imageLinks?.smallThumbnail;
                    const title = volumeInfo?.title || '';
                    const categories = volumeInfo?.categories ? volumeInfo.categories.join(', ') : '';
                    const authors = volumeInfo?.authors ? volumeInfo.authors.join(', ') : '';

                    if (thumbnail !== undefined) {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={() => handleClick(item)}>
                                    <img src={thumbnail}/>
                                    <div className="bottom">
                                        <h5 className="catigories">{categories}</h5>
                                        <h3 className="title">{title}</h3>
                                        <h4 className="autors">{authors}</h4>
                                    </div>
                                </div>

                            </>
                        )
                    }

                })
            }
        </>
    )
}
export default Card;

// import React, { useState } from "react";
// import { Link } from "react-router-dom"; 
// import './Card.css';

// const Card = ({ book }) => {
//     const [show, setShow] = useState(false);
//     const [bookItem, setItem] = useState();
//     console.log(book);

//     const handleClick = (item) => {
//         setItem(item);
//         setShow(true);
//     };

//     return (
//         <>
//             {book.map((item) => {
//                 const volumeInfo = item.volumeInfo;
//                 const thumbnail = volumeInfo?.imageLinks?.smallThumbnail;
//                 const title = volumeInfo?.title || '';
//                 const categories = volumeInfo?.categories ? volumeInfo.categories.join(', ') : '';
//                 const authors = volumeInfo?.authors ? volumeInfo.authors.join(', ') : '';

//                 if (thumbnail !== undefined) {
//                     return (
//                         <div className="card" key={item.id} onClick={() => handleClick(item)}>
//                             <Link to={`/book/${item.id}`} className="card-link">
//                                 <img src={thumbnail} alt={title} />
//                                 <div className="bottom">
//                                     <h5 className="categories">{categories}</h5>
//                                     <h3 className="title">{title}</h3>
//                                     <h4 className="authors">{authors}</h4>
//                                 </div>
//                             </Link>
//                         </div>
//                     );
//                 }
//                 return null;
//             })}
//         </>
//     );
// };

// export default Card;
