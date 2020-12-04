import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


export type Data = {
    id: number;
    [K: string]: unknown;
}


type DataTableCellProps = {
    children: React.ReactNode;
}

const DataTableCell = ({children}: DataTableCellProps) => (
    <td className={styles.cell}>
        {children}
    </td>
);


type DataTableRowProps<TData extends Data = Data> = {
    fields?: {name: string; field: keyof TData}[];
    children?: React.ReactNode;
    data?: TData;

    handleSelect?: (id: number) => void;
};

const DataTableRow = ({
    data,
    children,
    fields,

    handleSelect,
}: DataTableRowProps) => {
    let cells;

    if (data && fields) {
        cells = fields.map(
            ({field}) => (
                <DataTableCell key={field}>
                    {data[field] as string}
                </DataTableCell>
            ),
        );
    } else if (children) {
        cells = children;
    }

    return (
        <tr
            className={styles.row}
            onClick={data && handleSelect ? () => handleSelect(data.id) : undefined}
        >
            {cells}
        </tr>
    );
};


type DataTableProps<TData extends Data = Data> = {
    handleRowSelect: (id: number) => void;

    dataList: TData[];
    fields: {name: string; field: keyof TData}[],

    className?: string;
}

const DataTable = ({
    dataList,
    className,
    fields,

    handleRowSelect,
}: DataTableProps) => (
    <table className={classnames(className, styles.table)}>
        <thead className={styles.thead}>
            <DataTableRow>
                {fields.map(
                    ({name, field}) => (
                        <DataTableCell key={field}>
                            {name}
                        </DataTableCell>
                    ),
                )}
            </DataTableRow>
        </thead>

        <tbody>
            {dataList.map(
                dataItem => (
                    <DataTableRow
                        key={dataItem.id}
                        fields={fields}
                        data={dataItem}

                        handleSelect={handleRowSelect}
                    />
                ),
            )}
        </tbody>
    </table>
);


export default React.memo(DataTable);
