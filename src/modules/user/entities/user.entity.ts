import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'sys_user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;
}
