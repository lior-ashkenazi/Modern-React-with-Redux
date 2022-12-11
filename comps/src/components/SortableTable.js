import {GoArrowSmallDown, GoArrowSmallUp} from 'react-icons/go';
import Table from './Table';
import useSort from '../hooks/use-sort';

function SortableTable(props) {
    const {config, data} = props;
    const {sortOrder, sortBy, sortedData, handleClick} = useSort(data, config);


    const updatedConfig = config.map((column) => {
        return !column?.sortValue ?
               column :
            {
                ...column,
                header: () =>
                    <th className="cursor-pointer hover:bg-gray-100"
                        onClick={() => handleClick(column.label)}>
                        <div className="flex items-center">{getIcons(
                            column.label,
                            sortBy,
                            sortOrder
                        )}
                            {column.label}</div>
                    </th>
            };
    });


    // Config prop in props is *overwritten* by updatedConfig
    return <Table {...props} data={sortedData} config={updatedConfig}/>;

}

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) return (
        <div>
            <GoArrowSmallUp/>
            <GoArrowSmallDown/>
        </div>
    );

    if (!sortOrder) return (
        <div>
            <GoArrowSmallUp/>
            <GoArrowSmallDown/>
        </div>
    );
    else if (sortOrder === 'asc') return (
        <div>
            <GoArrowSmallUp/>
        </div>
    );
    else if (sortOrder === 'desc') return (
        <div>
            <GoArrowSmallDown/>
        </div>
    );
}

export default SortableTable;