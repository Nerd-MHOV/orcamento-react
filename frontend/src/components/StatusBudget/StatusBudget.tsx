import "./style.scss"
export const StatusBudget = ({status}: {status: string}) => {
    return <p className={`status ${status}`}>{status}</p>
}

