import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, confirmDelete}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    return (
        <div className="main-list-item">
    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.name}</span>
                <span><span className="field-names">Weight: </span>{item.weight}</span>
                <span><span className="field-names">Total Milk: </span>{item.total_milk}</span>
                <span><span className="field-names">Last Milking Time: </span>{moment.tz(item.last_milking_time, "Europe/Vilnius").format('YYYY-MM-DD')}  </span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => confirmDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 