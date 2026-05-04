const Notification = ({message}) => {
    //styles
    const okStyle = {
        color: 'green',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        textAlign: 'center'
    }

    const errStyle = {...okStyle, color: 'red' }

    if (message === null) {
        return null
    }
    
    return (
        <div className="error" style={ message.err ? errStyle : okStyle}>
            {message.text}
        </div>
    )
}

export default Notification;