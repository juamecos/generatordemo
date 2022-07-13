import { IStone } from './IStone';
import IUser from './IUser';
export interface IFound {
	__typename?: string;
	id: number;
	image: string;
	latitude: number;
	longitude: number;
	stone: IStone;
	user: IUser;
	owner: IUser;
	registerDate: string;
	verified: boolean;
}
