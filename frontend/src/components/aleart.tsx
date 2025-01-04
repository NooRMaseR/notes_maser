
interface AlertProps {
    message: string;
    color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

export default function Alert({ message, color }: AlertProps) {
    return (
        <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
    
}