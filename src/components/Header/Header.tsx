import { Heading } from "@chakra-ui/react"
import styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <Heading size='xl'>COMPANY CO.</Heading>
        </header>
    )
}