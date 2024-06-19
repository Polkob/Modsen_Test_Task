import react, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom"; ////////////

const Card = ({ book }) => {
    const navigate = useNavigate(); // Инициализируем useNavigate
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
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if (thumbnail !== undefined && amount !== undefined) {
                        return (
                            <>
                                {/* <div className="card" onClick={() => { setShow(true); setItem(item) }}> */}
                                <div className="card" key={item.id} onClick={() => handleClick(item)}>
                                    <img src={thumbnail} alt="" />
                                    <div>
                                        <h3 className="title">{item.volumeInfo.title}</h3>
                                        <p className="amount">{item.volumeInfo.authors}</p>
                                    </div>
                                </div>

                                {/* <Modal show={show} item={bookItem} onClose={() => setShow(false)} /> */}

                            </>
                        )
                    }

                })
            }
        </>
    )
}
export default Card;

