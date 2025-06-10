import {Column, Attribute, Reference} from '@/core/decorator';

export namespace UserEntity {
  export class User {
    @Attribute('id')
    @Column(() => Number)
    id!: number;

    @Attribute('name')
    @Column(() => String)
    name!: string;

    @Attribute('username')
    @Column(() => String)
    username!: string;

    @Attribute('email')
    @Column(() => String)
    email!: string;

    @Attribute('phone')
    @Column(() => String)
    phone!: string;

    @Attribute('website')
    @Column(() => String)
    website!: string;

    @Attribute('address')
    @Reference(() => UserEntity.Address)
    @Column(() => Object)
    address!: UserEntity.Address;

    @Attribute('company')
    @Reference(() => UserEntity.Company)
    @Column(() => Object)
    company!: UserEntity.Company;
  }

  export class Address {
    @Attribute('street')
    @Column(() => String)
    street!: string;

    @Attribute('suite')
    @Column(() => String)
    suite!: string;

    @Attribute('city')
    @Column(() => String)
    city!: string;

    @Attribute('zipcode')
    @Column(() => String)
    zipcode!: string;

    @Attribute('geo')
    @Reference(() => UserEntity.Geo)
    @Column(() => Object)
    geo!: UserEntity.Geo;
  }

  export class Geo {
    @Attribute('lat')
    @Column(() => String)
    lat!: string;

    @Attribute('lng')
    @Column(() => String)
    lng!: string;
  }

  export class Company {
    @Attribute('name')
    @Column(() => String)
    name!: string;

    @Attribute('catchPhrase')
    @Column(() => String)
    catchPhrase!: string;

    @Attribute('bs')
    @Column(() => String)
    bs!: string;
  }
}
