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
        navigate(`two/${item.id}`, { state: { book: item } });
    };

    return (
        <>
            {
                book.map((item) => {

                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    if (thumbnail !== undefined) {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={() => handleClick(item)}>
                                    <img src={thumbnail} alt="" />
                                    <div className="bottom">
                                        <h5 className="catigories">{item.volumeInfo.categories}</h5>
                                        <h3 className="title">{item.volumeInfo.title}</h3>
                                        <h4 className="autors">{item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}</h4>
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


