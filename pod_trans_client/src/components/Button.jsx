

export function GreenButton(props) {


    return (
        <button className="bg-green-400 px-5 py-1 border rounded-xl hover:scale-110 duration-300 ring ring-green-600 ring-offset-2" 
                onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}

export function OrangeButton(props) {

    return (
        <button className="bg-orange-400 px-5 py-1 border rounded-xl hover:scale-110 duration-300 ring ring-orange-600 ring-offset-2" 
                onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}

export function Processing(props) {
    return (
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-700 rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
}
