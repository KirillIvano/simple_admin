import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type DescriptionTableItemProps = {
    name: string;
    value: React.ReactNode | string;
}

const DescriptionItem = ({name, value}: DescriptionTableItemProps) => (
    <li className={styles.descriptionItem}>
        <div>{name}: </div>
        <div>{value}</div>
    </li>
);


type DescriptionTableProps = {
    tableClassName?: string;
    children: React.ReactNode;
}

const DescriptionTable = ({tableClassName, children}: DescriptionTableProps) => (
    <ul className={classnames(tableClassName, styles.description)}>
        {children}
    </ul>
);

DescriptionTable.Item = DescriptionItem;


export default DescriptionTable;
