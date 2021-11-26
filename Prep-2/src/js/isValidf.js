// Check if data is valid weather it is text or number 
// and also controls if required data exists.
// Optional data can be empty, but if it is not
// it is also validated


function isValidf(type, req, val, error, setError) {
    if(req === 'required' && val !== 0) {
        if(!val) {
            // console.log('required empty', val); 
            setError("Required field is empty");
            return false;
        }
    }
    
    switch (type) {
        case 'txt':
            if(
                val.length > 255
            ) 
            {
                // console.log('greater then 255', val); 
                setError("Text length should be less then 255 symbols");
                return false;
            }
            else return true;
        case 'num':
            if(val) {
                if(
                    parseFloat(val) < 0 || !isFinite(parseFloat(val))
                )
                {
                    // console.log('negative', val); 
                    setError("Weight and milk cannot be negative");
                    return false;
                }
                else return true;
            } return true;
        case 'boolean':
            if(typeof val === 'boolean' || val === 1 || val === 0) 
            return true;
            else {
                // console.log('not bool', val); 
                setError("Not boolean value");
                return false;
            }
        default:
            break;
    }
}

export default isValidf;
