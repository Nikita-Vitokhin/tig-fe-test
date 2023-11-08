import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Header } from './components/Header'
import { ShipmentList } from './components/ShipmentList'
import { ShipmentDetails } from './components/ShipmentDetails'
import { ShipmentData } from './components/ShipmentDetails/ShipmentDetails.types'

const client = new ApolloClient({
  uri: 'https://fe-coding-test-o6yezgstiq-km.a.run.app/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-token': 'fe-test-2023',
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedShipmentData, setSelectedShipmentData] = useState({});

  const handleItemClick = (shipmentData: ShipmentData) => {
    setSelectedShipmentData(shipmentData);
    setDrawerOpen(true);
  }

  return (
    <ApolloProvider client={client}>
      <Header />
      <section style={{ padding: '20px 23px 52px', display: 'flex', justifyContent: 'center', backgroundColor: '#DDDEE4' }}>
        <ShipmentList onItemClick={handleItemClick} />
      </section>
      <ShipmentDetails isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} shipmentData={selectedShipmentData} />
    </ApolloProvider >
  )
}

export default App
