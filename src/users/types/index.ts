import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  userName: string;
  password: string;
}

// export class SerializedUser {
//   _id?: string;

//   userName: string;

//   @Exclude()
//   password: string;

//   constructor(partial: Partial<SerializedUser>) {
//     Object.assign(this, partial);
//   }
// }
