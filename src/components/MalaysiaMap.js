import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Popover } from 'antd';
import Pin from "../icon/icons8-location-100.png";
import PinBlue from "../icon/icons8-location-100-blue.png";
import { Descriptions } from 'antd';


export default function MalaysiaMap({ points = [] }) {
    const mapStyle = 'mapbox://styles/mapbox/streets-v11';

    return (
        <Map
            mapStyle={mapStyle}
            style={{ width: '100%', height: '100%' }}
            initialViewState={{
                longitude: 101.5758,
                latitude: 3.1319,
                zoom: 9
            }}
            mapboxAccessToken="pk.eyJ1IjoiYnJ5YW5jaHVhNzc3IiwiYSI6ImNsaTY2MTM4ZjE1ZW4zZW1scWNvZmRkYnQifQ.nPhr7J6sFIvhV3rdzqngvQ"

        >
            {
                points.map(({
                    transaction_location,
                    transaction_id,
                    client_id,
                    transaction_date,
                    transaction_amount,
                    is_anomaly
                }) => {
                    return (
                        <Marker {...transaction_location} anchor="bottom" >
                            <Popover
                                content={<div style={{ width: "300px" }}>
                                    <Descriptions size='small' column={1}>
                                        <Descriptions.Item label="Client id">{client_id}</Descriptions.Item>
                                        <Descriptions.Item label="Transaction date">{new Date(transaction_date).toISOString()}</Descriptions.Item>
                                        <Descriptions.Item label="Transaction amount">RM{transaction_amount}</Descriptions.Item>
                                    </Descriptions>
                                </div>}
                                title={transaction_id}>

                                <img
                                    width={30}
                                    src={is_anomaly ? PinBlue : Pin}
                                    alt="icon" />


                            </Popover>
                        </Marker>
                    )
                })
            }
        </Map>
    );
};     
