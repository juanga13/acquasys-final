import React, { useState } from 'react';
import { I18n } from 'react-redux-i18n';
import { Loader, Header, Table, Button, Dimmer, Icon } from 'semantic-ui-react';
import { REQUEST_STATUS } from '../../../utils/consts';
import './MyTable.scss';
import { getColor } from '../../../utils/iconColorGetter';

const MyTable = (props) => {
    const [sorting, setSorting] = useState({column: null, direction: null});
    const {
        data,
        columns,
        actions,
        status,
        color
    } = props;
    const keys = Object.keys(data.length > 0 && data[0]).filter(key => columns.includes(key));

    const handleSort = (key) => {
        console.log('handleSort');
    };

    return (
        <div className='table-container'>
            <Dimmer active={status === REQUEST_STATUS.LOADING} inverted><Loader inverted/></Dimmer>
            {status === REQUEST_STATUS.ERROR ?
                <Header disabled>{I18n.t('common.table.error.dataError')}</Header>
                :
                <Table fixed padded striped celled color={color}>
                    <Table.Header>
                    <Table.Row>
                        {keys.map((key) => (
                            <Table.HeaderCell
                                key={'header-' + key}
                                sorted={sorting.column === key ? sorting.direction : null}
                                onClick={() => handleSort(key)}
                            >{I18n.t('common.table.title.' + key)}</Table.HeaderCell>
                        )).concat(<Table.HeaderCell key={'header-actions'} colSpan='3'>{I18n.t('common.table.actions')}</Table.HeaderCell>)}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((item, id) => (
                            <Table.Row key={id}>
                                {keys.map((key) => {
                                    if (key === 'date') {
                                        return (
                                            <Table.Cell key={id + '-' + key + '-cell'}>{new Date(item[key]).toLocaleDateString()}</Table.Cell> 
                                        );
                                    } else if (key === 'amount') {
                                        return (
                                            <Table.Cell key={id + '-' + key + '-cell'}>{item[key] + ' $'}</Table.Cell> 
                                        );
                                    } else {
                                        return (
                                            <Table.Cell key={id + '-' + key + '-cell'}>{item[key]}</Table.Cell> 
                                        );
                                    } 
                                }).concat(
                                    <Table.Cell key={id + '-actions'} colSpan='3'>
                                        {actions.map(({type, action}) => (
                                            <Button
                                                key={id + '-' + type + '-button'}
                                                color={getColor(type)}
                                                onClick={() => action(item)}>
                                                
                                                <Icon name={type}/>
                                                {I18n.t('common.table.cells.' + type)}
                                            </Button>
                                        ))}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            }
        </div>
    );
};

export default MyTable;