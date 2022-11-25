import "./style.scss"

const Message = ({type, message}: MessageProps) => {
    return (
        <div className="message">
            <div className={`messageBx ${type}`}>{message}</div>
        </div>
    )
}

interface MessageProps {
    type: string,
    message?: string
}

export default Message