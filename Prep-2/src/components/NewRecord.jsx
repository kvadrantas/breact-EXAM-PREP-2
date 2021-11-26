import { useState } from "react";
import isValidf from "../js/isValidf";


function NewRecord({create, showNewRecordModal, setShowNewRecordModal, types, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        name: '',
        weight: '',
        total_milk: '',
        last_milking_time: '',  
    });


    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(isValidf('txt', 'required', inputs.name, error, setError) &&
            isValidf('num', 'required', inputs.weight, error, setError) &&
            isValidf('num', 'optional', inputs.total_milk, error, setError) &&
            isValidf('txt', 'optional', inputs.last_milking_time.slice(0, 10), error, setError) 
            )
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                name: '',
                weight: '',
                total_milk: '',
                last_milking_time: '',              
            });

            setShowNewRecordModal(false);
        }
    }


    return (
        <div className="main-modal" style={{
            display: showNewRecordModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>New Record</h2>
                <label>Name*</label><input type="text" value={inputs.name} onChange={(e) => formControl(e, 'name')} />
                <label>Weight*</label><input type="number" value={inputs.weight} onChange={(e) => formControl(e, 'weight')} />
                <label>Milk Collected Today</label><input type="number" value={inputs.total_milk} onChange={(e) => formControl(e, 'total_milk')} />
                <label>Last Milking Time</label><input type="date" value={inputs.last_milking_time} onChange={(e) => formControl(e, 'last_milking_time')} />

            </div>
            <button className="form-button" onClick={handleCreate}>Add</button>
            <button className="form-button" onClick={() => setShowNewRecordModal(false)}>Cancel</button>
        </div>
    )
    
}

export default NewRecord;