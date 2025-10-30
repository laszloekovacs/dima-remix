type PropType = {
	heading: React.ReactNode
	main: React.ReactNode
	commandLine: React.ReactNode
}

const SystemLayout = (props: PropType) => {
	const { heading, main, commandLine } = props

	return (
		<div className="grid grid-rows-[1fr-auto-1fr] w-screen h-screen">
			<div>{heading}</div>
			<div>{main}</div>
			<div>{commandLine}</div>
		</div>
	)
}

export default SystemLayout
