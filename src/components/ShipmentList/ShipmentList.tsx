import { gql, useQuery } from '@apollo/client'
import { Box, Spinner, Text } from '@chakra-ui/react'
import styles from './ShipmentList.module.css'
import { ShipmentItem } from './ShipmentItem/ShipmentItem';
import { useState } from 'react';
import { SortIcon } from '../../assets/icons/SortIcon';
import { IShipmentList } from './ShipmentList.types';

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

export const ShipmentList = ({ onItemClick }: IShipmentList) => {
    const { loading, error, data } = useQuery(SHIPMENTS_QUERY);
    const [sortOption, setSortOption] = useState('default');
    const [statusSortOption, setStatusSortOption] = useState('default');

    const toggleSortOption = () => {
        setStatusSortOption('default')
        if (sortOption === 'default') {
            setSortOption('startAlphabet');
        } else if (sortOption === 'startAlphabet') {
            setSortOption('endAlphabet');
        } else {
            setSortOption('default');
        }
    };

    const toggleStatusSortOption = () => {
        setSortOption('default')
        if (statusSortOption === 'default') {
            setStatusSortOption('pendingFirst');
        } else if (statusSortOption === 'pendingFirst') {
            setStatusSortOption('deliveredFirst');
        } else {
            setStatusSortOption('default');
        }
    };

    let sortedShipments = [...(data?.shipments || [])];

    if (sortOption === 'startAlphabet') {
        sortedShipments.sort((a, b) => a?.trackingId?.localeCompare(b?.trackingId));
    } else if (sortOption === 'endAlphabet') {
        sortedShipments.sort((a, b) => b?.trackingId?.localeCompare(a?.trackingId));
    }

    if (statusSortOption === 'pendingFirst') {
        sortedShipments.sort((a) => (a?.status !== 'Delivered' ? -1 : 1));
    } else if (statusSortOption === 'deliveredFirst') {
        sortedShipments.sort((a) => (a?.status === 'Delivered' ? -1 : 1));
    }

    if (error) return <Box display="flex" alignItems="center" height="600px"><Text color="red">An error occured, please try later</Text></Box>
    return (
        loading ?
            <Box width="100%" height="600px" display="flex" justifyContent="center" alignItems="center" >
                < Spinner size="xl" />
            </Box > : (
                <div className={styles.root}>
                    <div className={styles.head}>
                        <button onClick={toggleSortOption} className={styles.sortButton}>
                            <Text size="sm" color="#585B6B">Shipment</Text>
                            <div className={styles.iconWrapper}><SortIcon /></div>
                        </button>
                        <button onClick={toggleStatusSortOption} className={styles.sortButton}>
                            <Text size="sm" color="#585B6B">Status</Text>
                            <div className={styles.iconWrapper}><SortIcon /></div>
                        </button>
                    </div>
                    {sortedShipments.map((shipment) => {
                        return <ShipmentItem onClick={onItemClick} key={shipment?.id} {...shipment} />;
                    })}
                </div>
            )
    );
};