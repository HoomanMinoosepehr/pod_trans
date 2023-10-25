


export function Text_input (props) {
    return (
        <div className="mt-3">
            <label htmlFor={props.name} className="mx-1">{props.label} : </label><br/>
            <input 
                className="bg-orange-600 px-2 bg-opacity-80 rounded-lg p-1 text-white placeholder:text-slate-300"
                type={props.type || 'text'} 
                name={props.name} id={props.id || props.name} 
                placeholder={props.placeholder || ''} 
                onChange={props.onChange}
            />
        </div>
    )
}

export function File_input (props) {
    return (
        <div className="mt-3">
            <label htmlFor="file" className="">File: </label><br />
            <input 
                className="border-2 border-gray-700 text-gray-700 rounded-full file:rounded-full file:bg-gray-700 file:text-yellow-400" 
                type="file" name="file" 
                onChange={props.onChange} 
            />
        </div>
    )
}

export function Text_area (props) {
    return (
        <div className="mt-3">
            <label htmlFor={props.name} className="mx-1">{props.label} : </label><br/>
            <textarea 
                className="bg-orange-600 px-2 bg-opacity-80 rounded-lg p-1 text-white placeholder:text-slate-300"
                type={props.type || 'text'} 
                name={props.name} id={props.id || props.name} 
                placeholder={props.placeholder || ''} 
                onChange={props.onChange}
            />
        </div>
    )
}