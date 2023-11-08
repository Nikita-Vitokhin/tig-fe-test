import { Tag, Text } from '@chakra-ui/react'
import styles from './ShipmentItem.module.css'
import { IShpimentItem } from './ShipmentItem.types'

export const ShipmentItem = ({ trackingId, status, lastUpdate, onClick, ...rest }: IShpimentItem) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    return (
        <button className={styles.root} onClick={() => onClick({ trackingId, status, lastUpdate, ...rest })}>
            <div className={styles.textBlock}>
                <Text fontSize="sm">{trackingId}</Text>
                <Text fontSize="xs" color="#585B6B">Created: {lastUpdate && formatDate(lastUpdate)}</Text>
            </div>
            <Tag size="lg" variant="outline" colorScheme={status === "Delivered" ? "green" : "yellow"}>{status}</Tag>
        </button>
    )
}