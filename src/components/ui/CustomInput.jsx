export function CustomInput({ type, placeholder, value, name }) {
    return (
        <>
            <div>
                <label htmlFor=""></label>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                ></input>
            </div>
        </>
    );
}
