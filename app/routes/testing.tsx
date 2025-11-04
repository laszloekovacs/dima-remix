import SystemLayout from "app/components/system-layout"

export default function TestingRoute(): React.ReactNode {
	return (
		<SystemLayout
			main={
				<div style={{ background: "#ff6b6b", borderRadius: 8, height: 12 }} />
			}
			heading={
				<div style={{ background: "#ffd166", borderRadius: 8, height: 12 }} />
			}
			commandLine={
				<div style={{ background: "#6bcB77", borderRadius: 8, height: 12 }} />
			}
		/>
	)
}
