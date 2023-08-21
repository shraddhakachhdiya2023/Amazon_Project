export default function Input(props) {
    const { type, onChange, value, placeholder, style, id, className, isError, helperText } = props

    return (
        <div>
            <input type={type}
                placeholder={placeholder || ""}
                style={style || {}}
                id={id || {}}
                className={className || ""}
                onChange={onChange}
                value={value || ""} />

            {
                isError ? <span className="text-danger">{helperText}</span> : ""
            }
        </div>
    )
}