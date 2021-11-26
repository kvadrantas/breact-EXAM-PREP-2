function WarningModal ({showWarningModal, setShowWarningModal, error}) {

    return(
        <div className="main-modal" style={{
            display: showWarningModal ? 'block' : 'none',
            top: window.scrollY + 300 + 'px',
            width: '84%',
            zIndex: '3000'
            }}>
            <h2>Please check your input!</h2>
            <ul>
                <li>
                    required fields cannot be empty;
                </li>
                <li>
                    weight and milk cannot be negative or infinite.
                </li>
            </ul>
                <ul>Error: {error}</ul>
            <button className="form-button" onClick={() => setShowWarningModal(false)}>Ok</button>
        </div>
    )

}

export default WarningModal;