import { useEffect, useState } from "react";
import isValidf from "../js/isValidf";


function Modal({edit, confirmDelete, modalItem, showModal, setShowModal, types, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        name: '',
        weight: '',
        total_milk: '',
        last_milking_time: '',      
    });

    useEffect(() => {
        setInputs({
            name: modalItem.name,
            weight: 0,
            total_milk: 0,
            last_milking_time: modalItem.last_milking_time,          
        })
    }, [modalItem]);

    const handleEdit = () => {
        if(
            !(isValidf('txt', 'required', inputs.name, error, setError) &&
            isValidf('num', 'required', inputs.weight, error, setError) &&
            isValidf('num', 'required', inputs.total_milk, error, setError) &&
            isValidf('txt', 'optional', inputs.last_milking_time.slice(0, 10), error, setError) 
            )
        ) {
            setShowWarningModal(true);
        } else {
            edit({
                name: inputs.name,
                weight: inputs.weight || modalItem.weight,
                total_milk: parseFloat(inputs.total_milk) + parseFloat(modalItem.total_milk),
                last_milking_time: inputs.last_milking_time,
            }, modalItem.id)     
           }

    };


    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        if(what ==='forsale') inputsCopy[what] = !inputs.forsale;
        setInputs(inputsCopy);
    }


    return (
        <div className="main-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>Edit</h2>
                <label>Name*</label><input type="text" value={inputs.name} onChange={(e) => formControl(e, 'name')} />
                <label>Weight</label><input style={{background: '#d6e1dc'}} type="number" defaultValue={modalItem.weight }  />
                <label>New Weight</label><input value={inputs.weight||0} type="number" onChange={(e) => formControl(e, 'weight')} />
                <label>Total Milk</label><input style={{background: '#d6e1dc'}} type="number" defaultValue={modalItem.total_milk} />
                <label>Milk Collected Today</label><input value={inputs.total_milk||0} type="number" onChange={(e) => formControl(e, 'total_milk')} />
                <label>Last Milking Time</label><input style={{background: '#d6e1dc'}} type="date" defaultValue={inputs.last_milking_time} />
                <label>New Milking Time</label><input type="date" onChange={(e) => formControl(e, 'last_milking_time')} />
            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => confirmDelete(modalItem.id)}>Delete</button>
        </div>
    )

}

export default Modal;