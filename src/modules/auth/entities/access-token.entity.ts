import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_access_tokens')
export class AccessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500 })
  value!: string;

  @Column({ comment: '令牌过期时间' })
  expired_at!: Date;

  @CreateDateColumn({ comment: '令牌创建时间' })
  created_at!: Date;

  @Column({ comment: '用户ID' })
  user_id!: number;
}
