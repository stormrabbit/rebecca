import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "rebecca" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;
}
