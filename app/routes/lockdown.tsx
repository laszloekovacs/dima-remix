import { useEffect, useState } from "react"

export default function LockdownScreen() {
    const [countdown, setCountdown] = useState<Date | null>(null);

    useEffect(() => {
        // Initialize countdown to x seconds from now if not set
        if (!countdown) {
            setCountdown(new Date(Date.now() + 5000));
        } else {


            const timer = setInterval(() => {
                const now = new Date();
                if (countdown.getTime() <= now.getTime()) {
                    setCountdown(null);
                    clearInterval(timer);
                    window.location.href = "/";
                }
            }, 200);

            return () => clearInterval(timer);
        }
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