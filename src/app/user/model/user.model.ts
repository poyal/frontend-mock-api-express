import {Attribute, XssRequest, XssResponse, Reference}          from '@/core/decorator';
import {IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested} from '@/core/decorator/validator';
import {PageableModel}                                          from '@/core/model/pageable.model';

export namespace UserModel {
  export namespace Request {
    export class Search {
      @Attribute('타이틀')
      name?: string;

      constructor({name}: UserModel.Request.Search = {}) {
        if (!!name) {
          this.name = name;
        }
      }
    }

    export class SearchPage extends PageableModel.Request.Search {
      @Attribute('타이틀')
      name?: string;

      constructor(search: UserModel.Request.SearchPage = {}) {
        super(search);

        if (!!search.name) {
          this.name = search.name;
        }
      }
    }

    export class Add {
      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('username')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      username!: string;

      @Attribute('email')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      email!: string;

      @Attribute('phone')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      phone!: string;

      @Attribute('website')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      website!: string;

      @Attribute('address')
      @Reference(() => UserModel.Request.Address)
      @IsNotEmpty() @ValidateNested()
      address!: UserModel.Request.Address;

      @Attribute('company')
      @Reference(() => UserModel.Request.Company)
      @IsNotEmpty() @ValidateNested()
      company!: UserModel.Request.Company;
    }

    export class Modify {
      @Attribute('아이디')
      @IsInt() @IsNotEmpty()
      id!: number;

      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('username')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      username!: string;

      @Attribute('email')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      email!: string;

      @Attribute('phone')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      phone!: string;

      @Attribute('website')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      website!: string;

      @Attribute('address')
      @Reference(() => UserModel.Request.Address)
      @IsNotEmpty() @ValidateNested()
      address!: UserModel.Request.Address;

      @Attribute('company')
      @Reference(() => UserModel.Request.Company)
      @IsNotEmpty() @ValidateNested()
      company!: UserModel.Request.Company;
    }

    export class Address {
      @Attribute('street')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      street!: string;

      @Attribute('suite')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      suite!: string;

      @Attribute('city')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      city!: string;

      @Attribute('zipcode')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      zipcode!: string;

      @Attribute('geo')
      @Reference(() => UserModel.Request.Geo)
      @IsNotEmpty() @ValidateNested()
      geo!: UserModel.Request.Geo;
    }

    export class Geo {
      @Attribute('lat')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      lat!: string;

      @Attribute('lng')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      lng!: string;
    }

    export class Company {
      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('catchPhrase')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      catchPhrase!: string;

      @Attribute('bs')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      bs!: string;
    }
  }

  export namespace Response {
    export class FindAll {
      @Attribute('아이디')
      id!: number;

      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('username')
      @XssResponse()
      username!: string;

      @Attribute('email')
      @XssResponse()
      email!: string;

      @Attribute('phone')
      @XssResponse()
      phone!: string;

      @Attribute('website')
      @XssResponse()
      website!: string;

      @Attribute('address')
      @Reference(() => UserModel.Response.Address)
      address!: UserModel.Response.Address;

      @Attribute('company')
      @Reference(() => UserModel.Response.Company)
      company!: UserModel.Response.Company;
    }

    export class FindOne {
      @Attribute('아이디')
      id!: number;

      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('username')
      @XssResponse()
      username!: string;

      @Attribute('email')
      @XssResponse()
      email!: string;

      @Attribute('phone')
      @XssResponse()
      phone!: string;

      @Attribute('website')
      @XssResponse()
      website!: string;

      @Attribute('address')
      @Reference(() => UserModel.Response.Address)
      address!: UserModel.Response.Address;

      @Attribute('company')
      @Reference(() => UserModel.Response.Company)
      company!: UserModel.Response.Company;
    }

    export class Address {
      @Attribute('street')
      @XssResponse()
      street!: string;

      @Attribute('suite')
      @XssResponse()
      suite!: string;

      @Attribute('city')
      @XssResponse()
      city!: string;

      @Attribute('zipcode')
      @XssResponse()
      zipcode!: string;

      @Attribute('geo')
      @Reference(() => UserModel.Response.Geo)
      geo!: UserModel.Response.Geo;
    }

    export class Geo {
      @Attribute('lat')
      @XssResponse()
      lat!: string;

      @Attribute('lng')
      @XssResponse()
      lng!: string;
    }

    export class Company {
      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('catchPhrase')
      @XssResponse()
      catchPhrase!: string;

      @Attribute('bs')
      @XssResponse()
      bs!: string;
    }
  }
}
