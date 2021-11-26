function ActionMsg({msg, showMsg}) {

    return (
        <div className="action-msg" style={{
            height: showMsg ? '60px' : '0',
            // border: showMsg ? '1px solid #fadc64' : '1px solid transparent',
            top: showMsg ? window.scrollY : -2
            }}>
            <span>{msg}</span>
        </div>
    )
}

export default ActionMsg;