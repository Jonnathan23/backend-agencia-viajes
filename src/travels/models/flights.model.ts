import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import Reservation from './reservations.model'


export const flightIsActive = {
    TRUE: "Si",
    FALSE: "No"
} as const

export type FlightIsActive = typeof flightIsActive[keyof typeof flightIsActive]

export interface FlightsI extends Model {
    flt_id: string,
    flt_flight_number: string,
    flt_origin: string,
    flt_destination: string,
    flt_departure_time: string,
    flt_arrival_time: string,
    flt_total_seats: number,
    flt_price: number,
    flt_is_active: FlightIsActive,
}

@Table({
    tableName: 'flights',
    timestamps: true,
    createdAt: 'flt_created_at',
    updatedAt: 'flt_updated_at'
})
class Flight extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
    })
    declare flt_id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare flt_flight_number: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare flt_origin: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare flt_destination: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare flt_departure_time: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare flt_arrival_time: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: { min: 0 }
    })
    declare flt_total_seats: number

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        validate: { min: 0 }
    })
    declare flt_price: number

    @Column({
        type: DataType.ENUM(flightIsActive.TRUE, flightIsActive.FALSE),
        allowNull: false,
        validate: { len: [2, 2] },
        defaultValue: flightIsActive.TRUE
    })
    declare flt_is_active: FlightIsActive

    @HasMany(() => Reservation)
    declare reservations: Reservation[]

}

export default Flight