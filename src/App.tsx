import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Heading } from '@chakra-ui/react'
import { Header } from './components/Header'
import { ShipmentList } from './components/ShipmentList'

const SHIPMENTS_QUERY = gql`
  query Shipments {
    shipments {
      id
      trackingId
      status
      statusSeverity
      deliveredTime
      lastUpdate
      deliveryAddress
      totalTransit
    }
  }
`;

const TRACKING_EVENTS_QUERY = gql`
  query TrackingEvents($trackingId: String!) {
    trackingEvents(trackingId: $trackingId) {
      id
      trackingId
      status
      statusSeverity
      timestamp
      location
    }
  }
`;

function ShipmentsView() {
  const { loading, error, data } = useQuery(SHIPMENTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      {console.log(data)}
      {data.shipments.map((shipment: any) => (
        <div key={shipment.id}>
          <p>{shipment.trackingId}</p>
          <p>{shipment.status}</p>
        </div>
      ))}
    </div>
  );
}

function GetShipments() {
  const { loading, error, data } = useQuery(SHIPMENTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data
}

function GetShipmentDetails({ trackingId }: { trackingId: string }) {
  const { loading, error, data } = useQuery(TRACKING_EVENTS_QUERY, {
    variables: { trackingId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      {data.trackingEvents.map((event: any) => (
        <div key={event.id}>
          <p>{event.status}</p>
          <p>{event.timestamp}</p>
          {/* ...other fields */}
        </div>
      ))}
    </div>
  );
}

const client = new ApolloClient({
  uri: 'https://fe-coding-test-o6yezgstiq-km.a.run.app/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-token': 'fe-test-2023',
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <section className="shipmentBlock">
        <ShipmentList />
      </section>
      <ShipmentsView />
    </ApolloProvider >
  )
}

export default App
