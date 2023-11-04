import { Tag, Text } from '@chakra-ui/react'
import styles from './ShipmentItem.module.css'

export const ShipmentItem = ({ trackingId, status, lastUpdate }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className={styles.root}>
            <div className={styles.textBlock}>
                <Text fontSize="sm">{trackingId}</Text>
                <Text fontSize="xs" color="#585B6B">Created: {formatDate(lastUpdate)}</Text>
            </div>
            <Tag size="lg" variant="outline" colorScheme={status === "Delivered" ? "green" : "yellow"}>{status}</Tag>
        </div>
    )
}