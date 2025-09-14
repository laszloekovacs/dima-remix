import { useEffect, useState } from "react"

export default function LockdownScreen() {
    const [countdown, setCountdown] = useState<Date | null>(null);

    useEffect(() => {
        // Initialize countdown to 3 seconds from now if not set
        if (!countdown) {
            setCountdown(new Date(Date.now() + 3000));
            return;
        }

        const timer = setInterval(() => {
            const now = new Date();
            if (countdown.getTime() <= now.getTime()) {
                setCountdown(null);
                clearInterval(timer);
            } else {
                // Force update by setting a new Date object (to trigger re-render)
                setCountdown(new Date(countdown.getTime()));
            }
        }, 1000);

        // if countdown older than now, redirect to index
        if (countdown.getTime() <= Date.now()) {
            window.location.href = "/";
        }


        return () => clearInterval(timer);
    }, [countdown]);

    return (
        <div>
            <p>Sikertelen betores a rendszerbe erzekelve</p>
            <p>Terminal lezarva!</p>
            <p>biztonsagi csoport ertesitve</p>


            <div>
                <p>
                    Lezaras feloldasa:
                </p>
                <p>{countdown?.toISOString()}</p>
            </div>
        </div>
    )
}