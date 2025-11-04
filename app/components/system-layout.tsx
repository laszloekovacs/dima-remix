type PropType = {
  heading: React.ReactNode
  main: React.ReactNode
  commandLine: React.ReactNode
}

const SystemLayout = (props: PropType) => {
  const { heading, main, commandLine } = props

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-w-screen min-h-screen p-4 gap-2">
      <header>{heading}</header>
      <main className="self-start">{main}</main>
      <footer>{commandLine}</footer>
    </div>
  )
}

export default SystemLayout
