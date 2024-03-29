import IUser from './IUser';
import { IComment } from './IComment';
import { ILike } from './ILike';
import { IFound } from './IFound';

export interface IStone {
	__typename?: string;
	id: number;
	image: string;
	title?: string;
	description?: string;
	registerDate: string;
	latitude?: number;
	longitude?: number;
	user: IUser;
	active: boolean;
	abuse: boolean;
	code?: string;
	commentCount: number;
	comments: [IComment] | [];
	likeCount: number;
	likes?: [ILike];
	foundCount: number;
	founds?: [IFound];
	distance?: number;
}
