import { IStone } from 'src/interfaces/IStone';
import IUser from './IUser';
export interface IComment {
	__typename: string;
	id: number;
	stone: IStone;
	user: IUser;
	comment: string;
	registerDate: string;
	abuse: boolean;
	active: boolean;
}
