import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text, Drawer, Box, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, ModalCloseButton, Spinner, Grid, GridItem, Stepper, Step, StepSeparator, StepIndicator, Divider, Tag } from "@chakra-ui/react"
import { gql, useQuery } from '@apollo/client'
import styles from './ShipmentDetails.module.css'
import { Completed } from "../../assets/icons/Completed";
import { Info } from "../../assets/icons/Info";
import { Warning } from "../../assets/icons/Warning";
import { IShipmentDetails, TrackingEvent } from "./ShipmentDetails.types";

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

export const ShipmentDetails = ({ isOpen, onClose, shipmentData = {} }: IShipmentDetails) => {
    const { loading, error, data } = useQuery(TRACKING_EVENTS_QUERY, {
        variables: { trackingId: shipmentData?.trackingId || '' },
    })

    const formatDate = (dateString: string, options: Object) => {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleString('en-US', options).replace(',', '')

        return formattedDate
    }

    return (
        <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                {loading ? <div className={styles.spinnerWrapper}><Spinner size="xl" color="#DDDEE4" /></div> : (
                    <>
                        <DrawerHeader padding="22px 20px" borderBottomColor="#DDDEE4" display="flex" justifyContent="space-between" borderBottomWidth='1px'>
                            <Heading size="lg">{shipmentData?.trackingId}</Heading>
                            <ModalCloseButton position="inherit" variant='outline' borderColor="#DDDEE4" border="1px" />
                        </DrawerHeader>
                        <DrawerBody padding="20px">
                            {error ? <Box display="flex" alignItems="center" justifyContent="center" height="600px"><Text color="red">An error occured, please try later</Text></Box> : (
                                <Accordion defaultIndex={[0, 1]} allowMultiple>
                                    <AccordionItem borderTop="0px">
                                        <h2>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    <Text fontSize="12px" fontWeight="600" lineHeight="16px" color="#8F92A3">
                                                        SHIPMENT
                                                    </Text>
                                                </Box>
                                                <AccordionIcon color="#8F92A3" />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={10}>
                                            <Grid columnGap="20px" rowGap="10px" templateColumns="30% 70%">
                                                <GridItem>
                                                    <Text size="xs" color="#8F92A3">
                                                        Status
                                                    </Text>
                                                </GridItem>
                                                <GridItem>
                                                    <Tag size="lg" variant="outline" colorScheme={shipmentData?.status === "Delivered" ? "green" : "yellow"}>{shipmentData?.status}</Tag>
                                                </GridItem>
                                                <GridItem>
                                                    <Text size="xs" color="#8F92A3">
                                                        Delivered time
                                                    </Text>
                                                </GridItem>
                                                <GridItem><Text size="xs" fontWeight="500">{shipmentData?.deliveredTime && formatDate(shipmentData?.deliveredTime, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}</Text></GridItem>
                                                <GridItem>
                                                    <Text size="xs" color="#8F92A3">
                                                        Delivery address
                                                    </Text>
                                                </GridItem>
                                                <GridItem><Text size="xs" fontWeight="500">{shipmentData?.deliveryAddress}</Text></GridItem>
                                                <GridItem>
                                                    <Text size="xs" color="#8F92A3">
                                                        Last updated
                                                    </Text>
                                                </GridItem>
                                                <GridItem><Text size="xs" fontWeight="500">{shipmentData?.lastUpdate && formatDate(shipmentData?.lastUpdate, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}</Text></GridItem>
                                                <GridItem>
                                                    <Text size="xs" color="#8F92A3">
                                                        Total transit time
                                                    </Text>
                                                </GridItem>
                                                <GridItem><Text size="xs" fontWeight="500">{shipmentData?.totalTransit}</Text></GridItem>
                                            </Grid>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    <Text fontSize="12px" fontWeight="600" lineHeight="16px" color="#8F92A3">
                                                        TRACKING HISTORY
                                                    </Text>
                                                </Box>
                                                <AccordionIcon color="#8F92A3" />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            {data?.trackingEvents?.length ?
                                                <Box padding="20px 10px" border="1px solid #DDDEE4" borderRadius="5px" maxHeight="278px" overflowY="auto">
                                                    <Stepper gap={0} index={0} orientation="vertical">
                                                        {
                                                            data?.trackingEvents?.map((event: TrackingEvent) => {
                                                                return (
                                                                    <Step key={event?.id} style={{ width: '100%', gap: '10px', alignItems: "center" }}>
                                                                        <StepIndicator border="none" zIndex="100">
                                                                            {
                                                                                event?.statusSeverity === "Success" ? <Completed /> : event?.statusSeverity === "Info" ? <Info /> : <Warning />
                                                                            }
                                                                        </StepIndicator>
                                                                        <Box width="100%" paddingTop="20px">
                                                                            <Box width="100%" display="flex" justifyContent="space-between">
                                                                                <Box>
                                                                                    <Text>{event?.status}</Text>
                                                                                    <Text color="#585B6B">{event?.location}</Text>
                                                                                </Box>
                                                                                <Box textAlign="right">
                                                                                    <Text>{
                                                                                        event?.timestamp && formatDate(event?.timestamp, { day: 'numeric', month: 'long', year: 'numeric' })
                                                                                    }</Text>
                                                                                    <Text color="#585B6B">{event?.timestamp && formatDate(event?.timestamp, {
                                                                                        hour: 'numeric',
                                                                                        minute: '2-digit',
                                                                                        hour12: true
                                                                                    })}</Text>
                                                                                </Box>
                                                                            </Box>
                                                                            <Divider borderBottom="1px dashed #DDDEE4" marginTop="20px" />
                                                                        </Box>
                                                                        <StepSeparator style={{ maxHeight: "100%" }} />
                                                                    </Step>
                                                                )
                                                            })
                                                        }
                                                    </Stepper>
                                                </Box>
                                                : <Text size="xs" fontWeight="500">No data yet</Text>}
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            )}
                        </DrawerBody>
                    </>
                )}
            </DrawerContent>
        </Drawer >
    )
}