


export function Status(props) {

    return(
        <div className="w-fit max-w-xs absolute right-0 h-fit m-2">
            { props.user.id ? (
                <p className="truncate"> 🟢 Hello, {props.user.name}</p>
            ) : (
                <p className="truncate"> 🔴 Guest User.</p>
            )}
        </div>
    )
}