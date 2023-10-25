import { TypeAnimation } from 'react-type-animation'

export function Home(props) {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='text-6xl font-courgette text-orange-600 -translate-y-1/2'>
                <div>
                    <TypeAnimation
                        sequence={[
                            "This is Pod-Trans.",
                            1000,
                            "Pod-Trans will save your Podcast.",
                            1000,
                            "Pod-Trans will transcribe your Podcast to Text.",
                            2000,
                            "Pod-Trans will summarize your Podcast.",
                            2000,
                            "Pod-Trans will Save Your Time ;)",
                            2000
                        ]}
                        wrapper='span'
                        speed={30}
                        repeat={Infinity}
                    />
                </div>
            </div>
        </div>
    )
}