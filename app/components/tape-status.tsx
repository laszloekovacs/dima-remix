type PropsType = {
	// eg. node-13
	label: string
	// status after initializing
	statusText: string
	// serial that the user can input
	serial: number
}

export default function TapeStatusIndicator({ props }: { props: PropsType }) {
	return (
		<div>
			<p>{props.serial}</p>
			<p>{props.label}</p>
			<p>{props.statusText}</p>
		</div>
	)
}
