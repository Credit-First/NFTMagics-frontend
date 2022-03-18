import * as React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles';
import { Theme, createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

import {
    AutoSizer,
    Column,
    Table,
    TableCellRenderer,
    TableHeaderProps,
} from 'react-virtualized';

const styles = (theme: Theme) =>
({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        width: '100%',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
} as const);

interface ColumnData {
    dataKey: string;
    label: string;
    numeric?: boolean;
    flexGrow?: number;
    width: any;
    type?: number;
}

interface Row {
    index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
    columns: readonly ColumnData[];
    headerHeight?: number;
    onRowClick?: () => void;
    rowCount: number;
    rowGetter: (row: Row) => Data;
    rowHeight?: number;
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };
    getRowClassName = ({ index }: Row) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight}}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
                {...columns}
            >
                { cellData === 'Transfer' ? <SwapHorizIcon /> : ''}
                { cellData === 'Sale' ? <ShoppingCartIcon /> : ''}
                { cellData === 'Minted' ? <ChildFriendlyIcon /> : ''}
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({
        label,
        columnIndex,
    }: TableHeaderProps & { columnIndex: number }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight!}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight!}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            if( dataKey === 'type') return;
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

// ---

interface Data {
    event: string;
    price: string;
    from: string;
    to: string;
    id: number;
    date: string;
}
type Sample = [string, string, string, string, string];

const sample: readonly Sample[] = [
    [ 'Transfer', '1593562', 'TheKooj', 'AceofTrade', '8 mounth ago'],
    [ 'Sale', '7363562', 'Crypto_cities', 'AceofTrade', '6 mounth ago'],
    [ 'Transfer', '6593562', 'TheKooj', 'Crypto_cities', '1 mounth ago'],
    [ 'Minted', '4693562', 'Crypto_cities', 'AceofTrade', '5 mounth ago'],
    [ 'Transfer', '1593562', 'TheKooj', 'AceofTrade', '4 mounth ago']
];

function createData(
    id: number,
    event: string,
    price: string,
    from: string,
    to: string,
    date: string,
): Data {
    return { id, event, price, from, to, date };
}
const rows: Data[] = [];

for (let i = 0; i < 10; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection)); 
}

export default function ReactVirtualizedTable() {
    return (
        <Paper style={{ height: 400, width: '100%', boxShadow: 'none', borderRadius: 10, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))' }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        flexGrow: 1,
                        width: 120,
                        label: 'Event',
                        dataKey: 'event',
                    },
                    {
                        width: 120,
                        label: 'Type',
                        dataKey: 'type',
                    },
                    {
                        width: 120,
                        label: 'From',
                        dataKey: 'from',
                        numeric: true,
                    },
                    {
                        width: 120,
                        label: 'To',
                        dataKey: 'to',
                        numeric: true,
                    },
                    {
                        width: 120,
                        label: 'Date',
                        dataKey: 'date',
                        numeric: true,
                    },
                ]}
            />
        </Paper>
    );
}
