import React, { useState, useEffect, useRef } from 'react';
import Loader from 'src/components/Loader';
import { useStonesQuery } from 'src/generated/graphql';
import useModalWithData from 'src/hooks/useModalWithData';
import { IStone } from 'src/interfaces/IStone';

interface IStonePageInfo {
	__typename?: 'ResultInfo' | undefined;
	page: number;
	total: number;
	itemsPage: number;
	pages: number;
}

interface StoneData {
	__typename?: 'ResultStones' | undefined;
	status: boolean;
	message: string;
	info?: IStonePageInfo | undefined;
	stones?: IStone[] | undefined;
}

const initialSelected = null;
const itemsPage = 10;

export const useStonesHook = () => {
	const { modalOpen, setModalOpen, selected, setSelected, setModalState } =
		useModalWithData(false, initialSelected);

	const [isFetching, setIsFetching] = useState(false);
	const [moreItemsToShow, setMoreItemsToShow] = useState(true);

	const { data, error, loading, fetchMore, refetch } = useStonesQuery({
		fetchPolicy: 'cache-and-network',
		variables: {
			page: 1,
			itemsPage: itemsPage,
		},
	});

	const stonesArray: any = useRef([]);

	const stonesInfoPage = useRef({} as IStonePageInfo);

	useEffect(() => {
		if (!data) {
			setIsFetching(true);
		}
		if (stonesInfoPage.current.page < stonesInfoPage.current.pages) {
			setMoreItemsToShow(true);
		}
		if (data && stonesInfoPage.current.page === stonesInfoPage.current.pages) {
			setMoreItemsToShow(false);
		}
		setIsFetching(false);

		return () => {};
	}, [data]);

	if (data && data?.stones?.info) {
		stonesInfoPage.current = data.stones?.info;
	}

	const onRefresh = () => {
		setIsFetching(true);
		refetch();
		setIsFetching(false);
	};

	const handleOnEndReached = () => {
		if (
			stonesInfoPage.current.page &&
			stonesInfoPage.current.page < stonesInfoPage.current.pages
		) {
			return fetchMore({
				variables: {
					page: stonesInfoPage.current.page + 1,
					itemsPage,
				},
				updateQuery: onUpdate,
			});
		}
	};

	const onUpdate = (prev: StoneData, { fetchMoreResult }) => {
		if (!fetchMoreResult) {
			return prev;
		}
		if (!prev) {
			return [{}];
		}

		const {
			info: newInfo,
			status: newStatus,
			message: newMessage,
			stones: newStones,
		} = fetchMoreResult.stones;

		const prevStones = prev.stones.stones!;

		const stones = [...prevStones, ...newStones];

		return Object.assign({}, prev, {
			stones: {
				__typename: prev.__typename,
				info: newInfo,
				status: fetchMoreResult.stones.status,
				message: fetchMoreResult.stones.message,
				stones,
			},
		});
	};

	if (data?.stones && data?.stones.stones) {
		stonesArray.current = data.stones?.stones;
	}

	if (error) {
		return new Error(error.message);
	}
	if (loading) {
		<Loader />;
	}

	const handleOnSelected: (id: number) => void = (id: number) => {
		const stoneSelectedData: IStone[] = stonesArray.current.filter(
			item => item.id === id
		);
		setSelected(stoneSelectedData[0]);
		setModalState(true);
	};

	return {
		stonesInfoPage,
		stonesArray,
		isFetching,
		moreItemsToShow,
		modalOpen,
		selected,
		setModalOpen,
		handleOnSelected,
		onRefresh,
		handleOnEndReached,
	};
};
