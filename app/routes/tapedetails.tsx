import SystemLayout from "~/components/system-layout"

export default function TapeSelectionScreen() {
  return (
    <SystemLayout
      heading={<p>dima konzol</p>}
      main={<DetailsScreen />}
      commandLine={<p>commands</p>}
    />
  )
}

const DetailsScreen = () => {
  return (
    <div>
      <p>Kiválasztott szalag: "Химера"</p>
    </div>
  )
}
