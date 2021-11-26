import { useState } from "react";
import isValidf from "../js/isValidf";

function Create({create, handleNewRecord, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        name: '',
        weight: '',
        total_milk: '',
        last_milking_time: '',
    });



    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        
        if(what ==='forsale') inputsCopy[what] = !inputs.forsale;

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
        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">Name*</label>
                <input type="text" value={inputs.name} onChange={(e) => formControl(e, 'name')} />
                <label htmlFor="">Weight*</label>
                <input type="number" value={inputs.weight} onChange={(e) => formControl(e, 'weight')} />
                <label htmlFor="">Milk Collected Today</label>
                <input type="number" value={inputs.total_milk} onChange={(e) => formControl(e, 'total_milk')} />                
                <label htmlFor="">Last Milking Time</label>
                <input type="date" value={inputs.last_milking_time} onChange={(e) => formControl(e, 'last_milking_time')} />

                <button className="form-button" onClick={handleCreate}>Add</button>
                <button className="form-button" onClick={handleNewRecord}>New Record...</button>
            </fieldset>
        </div>
    )

}

export default Create;