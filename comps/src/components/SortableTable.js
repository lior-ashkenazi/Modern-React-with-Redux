import {useState} from 'react';
import {GoArrowSmallDown, GoArrowSmallUp} from 'react-icons/go';
import Table from './Table';

function SortableTable(props) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const {config, data} = props;

    const handleClick = (label) => {
        if (sortBy && label !== sortBy) {
            setSortOrder('asc');
            setSortBy(label);
            return;
        }

        if (sortOrder == null) {
            setSortOrder('asc');
            setSortBy(label);
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
            setSortBy(label);
        } else if (sortOrder === 'desc') {
            setSortOrder(null);
            setSortBy(null);
        }
    };

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

    // 1. Only sort Data if sortOrder && sortBy are not null
    // 2. If they're not null, make a copy of the 'data' prop
    //    (that is because we NEVER modify a prop or a piece of state)
    // 3. Find the correct sortValue function and use it for sorting
    let sortedData = data;
    if (sortOrder && sortBy) {
        const {sortValue} = config.find(column => column.label === sortBy);
        sortedData = [...data].sort((a, b) => {
            const valueA = sortValue(a), valueB = sortValue(b);

            const reversedOrder = sortOrder === 'asc' ? 1 : -1;

            if (typeof valueA === 'string')
                return valueA.localeCompare(valueB) * reversedOrder;
            else return (valueA - valueB) * reversedOrder;
        });
    }

    // Config prop in props is *overwritten* by updatedConfig
    return <Table {...props} data={sortedData} config={updatedConfig}/>

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