import React from "react";
import { makeStyles } from "@mui/styles";
import { List, WindowScroller } from "react-virtualized";
import useMediaQuery from '@mui/material/useMediaQuery';
import NFTCard from "./Card";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

TimeAgo.addLocale(en);

const MIN_WIDTH = 920;
const cardWidth = 300;
const cardHeight = 450;
const columnMargin = 20;
const rowHeigthMargin = 25;
const drawerWidth = 250;

const useStyles = makeStyles(() => ({
    cardArea: {
        marginTop: 30
    },
    row: {
        display: "flex",
        justifyContent: "center"
    },
    lastRow: {
        display: "flex",
        justifyContent: "center"
    }
}));

const VirtualizedPage = ({ assetList, sideBarOpen }: { assetList: any, sideBarOpen: any }) => {
    const timeAgo = new TimeAgo('en-US');
    const [mounted, setMounted] = React.useState(false);
    const classes = useStyles();

    const { account, library }: any = useWeb3React();

    let web3 = new Web3();
    if (library) web3 = new Web3(library.provider);

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:950px)');

    React.useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        }
    }, [])
    return (
        <div>
            {mounted &&
                <WindowScroller>
                    {({ width, height, isScrolling, registerChild, scrollTop }) => {
                        const drawer_width = (sideBarOpen) ? drawerWidth : 100;
                        const extraSpace = md ? 1 : 0;
                        const rowWidth = width - (!sm ? drawer_width : 0) - 40;
                        const itemsPerRow = Math.max(
                            1,
                            Math.floor(rowWidth / (cardWidth + columnMargin)) - extraSpace
                        );
                        const rowCount = Math.ceil(assetList.length / itemsPerRow);

                        return (
                            <div ref={registerChild} className={classes.cardArea}>
                                <List
                                    autoHeight
                                    width={rowWidth}
                                    height={height}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    rowCount={rowCount}
                                    rowHeight={cardHeight + rowHeigthMargin}
                                    rowRenderer={({ index, key, style }) => {
                                        const items = [];
                                        const fromIndex = index * itemsPerRow;
                                        const toIndex = Math.min(
                                            fromIndex + itemsPerRow,
                                            assetList.length
                                        );
                                        for (let i = fromIndex; i < toIndex; i++) {
                                            items.push(
                                                <NFTCard key={i} timeAgo={timeAgo} item={assetList[i]} empty={undefined} width={cardWidth} height={cardHeight} account={account} web3={web3}/>
                                            );
                                        }
                                        const emptySize = itemsPerRow - items.length;
                                        for (let i = 0; i < emptySize; i++) {
                                            items.push(<NFTCard key={i + toIndex} timeAgo={timeAgo} empty item={undefined} width={cardWidth} height={cardHeight} account={account} web3={web3} />);
                                        }
                                        return (
                                            <div className={classes.row} key={key} style={style}>
                                                {items}
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        );
                    }}
                </WindowScroller>
            }
        </div>
    );
}

export default VirtualizedPage;