import React from "react";
import { makeStyles } from "@mui/styles";
import { List, WindowScroller } from "react-virtualized";
import useMediaQuery from '@mui/material/useMediaQuery';
import CollectionItem from "./CollectionItem";

const MIN_WIDTH = 920;
const cardWidth = 300;
const cardHeight = 450;
const rowHeigthMargin = 40;
const drawerWidth = 350;

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

const VirtualizedPage = ({ assetList }: { assetList: any }) => {
    const [mounted, setMounted] = React.useState(false);
    const classes = useStyles();

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:950px)');
    const lg = useMediaQuery('(max-width:1200px)');
    
    React.useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <div>
            {mounted &&
                <WindowScroller>
                    {({ width, height, isScrolling, registerChild, scrollTop }) => {
                        const extraSpace = md ? 1 : 0;
                        const rowWidth = (width - 40);
                        const itemsPerRow = Math.max(
                            1,
                            Math.floor(rowWidth / cardWidth) - extraSpace
                        );
                        const rowCount = Math.ceil(assetList.length / itemsPerRow);

                        return (
                            <React.Fragment>
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
                                                    <CollectionItem key={i} item={assetList[i]} empty={undefined} width={cardWidth} height={cardHeight}/>
                                                );
                                            }
                                            const emptySize = itemsPerRow - items.length;
                                            for (let i = 0; i < emptySize; i++) {
                                                items.push(<CollectionItem key={i + toIndex} empty item={undefined} width={cardWidth} height={cardHeight}/>);
                                            }
                                            return (
                                                <div className={classes.row} key={key} style={style}>
                                                    {items}
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </React.Fragment>
                        );
                    }}
                </WindowScroller>
            }
        </div>
    );
}

export default VirtualizedPage;