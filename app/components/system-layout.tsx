type PropType = {
  heading: React.ReactNode
  main: React.ReactNode
  commandLine: React.ReactNode
}

const SystemLayout = (props: PropType) => {
  const { heading, main, commandLine } = props

  return (
    <div className="grid grid-rows-[auto-1fr-auto] min-w-screen min-h-screen">
      <header>{heading}</header>
      <main className="self-start">{main}</main>
      <footer>{commandLine}</footer>
    </div>
  )
}

export default SystemLayout
