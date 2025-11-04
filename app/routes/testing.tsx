import SystemLayout from "app/components/system-layout"
import TapeStatusIndiactor from "~/components/tape-status"

export default function TestingRoute(): React.ReactNode {
	return (
		<div>
			<div className="warning-stripes background-animation">hello world</div>

			<TapeStatusIndiactor />
		</div>
	)
}
