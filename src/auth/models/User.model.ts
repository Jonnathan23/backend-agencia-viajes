import { Table, Column, Model, DataType, Validate, ForeignKey, BelongsTo } from 'sequelize-typescript'

export interface UserI extends Model {
    usr_id: string,
    usr_first_name: string,
    usr_last_name: string,
    usr_email: string,
}

@Table({
    tableName: 'users',
    timestamps: true,
    createdAt: 'usr_created_at',
    updatedAt: 'usr_updated_at'
})
class User extends Model<UserI> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,        
    })
    declare usr_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare usr_first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare usr_last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare usr_email: string;

}

export default User