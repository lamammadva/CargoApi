import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { OrderEntity } from './Order.entity';
import { TariffsEntity } from './Tariffs.entity';
import { CargoStatus, PaymentStatus } from 'src/shared/enum/order.enum';

@Entity()
export class PackageEntity extends CommonEntity {
  @Column()
  trackingNumber: string;
  @Column({ nullable: true,type: 'float' , default: 0 })
  weight: number;
  @OneToOne(() => OrderEntity, (order) => order.package)
  order: OrderEntity;
  @Column({type:'enum',enum:CargoStatus,default:CargoStatus.SIFARIS_VERILIB})
  status: CargoStatus;
  @Column({ nullable: true, select: false, type: 'float' })
  height: number;
  @Column({ nullable: true, select: false, type: 'float' })
  width: number;
  @Column({ nullable: true, select: false, type: 'float' })
  depth: number;
  @ManyToOne(()=>TariffsEntity,(tariff)=>tariff.packages)
  tariff: TariffsEntity;
  @Column({ nullable: true, type: 'float' })
  totalprice:number
  @Column({default:PaymentStatus.PENDING, nullable:true})
  paymentStatus:string
}
