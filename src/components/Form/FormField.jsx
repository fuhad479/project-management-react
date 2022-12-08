export default function FormField({
    label,
    id,
    type,
    name,
    value,
    placeholder,
    onChangeHandler,
    className
}) {
    return (
        <>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-[14px] mb-[8px]"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
                className={className}
            />
        </>
    )
}
