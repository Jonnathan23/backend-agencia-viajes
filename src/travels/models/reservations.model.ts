import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import User from '../../auth/models/User.model';
import Flight from './flights.model';

export const reservationStatus = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmada",
    CANCELED: "Cancelada"
} as const

export type ReservationStatus = typeof reservationStatus[keyof typeof reservationStatus]


export interface ReservationsI extends Model {
    res_usr_id: string, //FK
    res_flt_id: string, //FK
    res_id: string,
    res_reserved_at: string,
    res_status: ReservationStatus,
    res_count_consumer: number,
}

@Table({
    tableName: 'reservations',
    timestamps: false
})
class Reservation extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
    })
    declare res_id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare res_usr_id: string;

    @ForeignKey(() => Flight)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare res_flt_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare res_reserved_at: string;

    @Column({
        type: DataType.ENUM(reservationStatus.PENDING, reservationStatus.CONFIRMED, reservationStatus.CANCELED),
        allowNull: false,
        defaultValue: reservationStatus.PENDING
    })
    declare res_status: ReservationStatus;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare res_count_consumer: number;

}

export default Reservation