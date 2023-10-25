

export function Alert(props) {
    const bgColor = {
        red: 'bg-red-700',
        green: 'bg-green-600',
        yellow: 'bg-yellow-600'
    }

    return (
        <div className={`bg-opacity-80 ${bgColor[props.alert.color]} text-white top-16 w-fit absolute -translate-x-1/2 flex flex-col left-1/2 h-fit px-10 py-4 rounded-xl`}>
            <div>
                {Array.isArray(props.alert.message) ? (
                    props.alert.message.map( i => <div className="mt-1">- {i}</div>)
                ) : (
                    <p>{props.alert.message}</p>
                )}
            </div>
            <div className="flex justify-center">
                <button className="border border-white text-white rounded-lg px-5 py-1 mt-4"
                        onClick={() => props.setAlert(null)}
                >
                Ok!
                </button>
            </div>
        </div>
    )
}