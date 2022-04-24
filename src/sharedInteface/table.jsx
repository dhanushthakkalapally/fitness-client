import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {useGlobalFilter, useSortBy, useTable} from 'react-table';
import Search from "./search";

export const TABLE_SIZE_SM = "SMALL";
export const TABLE_SIZE_LRG = "LARGE";
export const TABLE_SIZE_MD = "MEDIUM";

const Table = (props) => {
    const {
        columnConfig,
        data,
        enableSearch,
        searchConfig,
        tableSize,
        tableTitle,
        tableToolBarElements,
        paginationConfig,
        loading
    } = props;

    const {initialPageSize} = paginationConfig;
    const memoizedColumnConfig = useMemo(() => columnConfig, [columnConfig]);
    const memoizedData = useMemo(() => data, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        setGlobalFilter,
        gotoPage,
        state: tableState
    } = useTable({
        columns: memoizedColumnConfig,
        data: memoizedData,
        initialState: {pageSize: initialPageSize}
    }, useGlobalFilter, useSortBy);

    const {
        placeholder
    } = searchConfig;

    const handlePageClick = (pageObject) => {
        const {selected} = pageObject;
        gotoPage(selected);
    };

    const renderTableHeader = () => {
        return (
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                        return (
                            <React.Fragment key={column.getHeaderProps().key}>
                                {
                                    !column.canSort
                                        ? <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                        : (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <span
                                className={`d-flex justify-content-between ${column.isSorted ? "" : "text-black-50"}`}>
                                     <span>
                                     {column.render("Header")}
                                     </span>
                                {(column.isSorted) ? (
                                    <span>
                                                {column.isSortedDesc
                                                    ? <i className="fas fa-sort-down"/>
                                                    : <i className="fas fa-sort-up"/>}
                                    </span>
                                ) : (
                                    <span>
                                                <i className="far fa-sort-down"/>
                                    </span>
                                )}
                            </span>
                                            </th>
                                        )
                                }
                            </React.Fragment>
                        );
                    })}

                </tr>
            ))}
            </thead>
        );
    };


    const renderToolBar = () => {
        return (
            <section>
                <div className="d-flex justify-content-between">
                    <div>
                        <h2 className="text-center m-2">{tableTitle}
                        </h2>
                    </div>
                    <div>
                        {tableToolBarElements && tableToolBarElements({
                            selectedFlatRows,
                            tableState
                        })}
                    </div>
                </div>
            </section>
        );
    }

    const renderTableBody = () => {
        return (
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            // Apply the cell props
                            return (
                                <td {...cell.getCellProps()}>
                                    {// Render the cell contents
                                        cell.render('Cell')
                                    }
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
            </tbody>

        );
    };

    return (
        <section>
            {renderToolBar()}
            {enableSearch
                && (
                    <div className="p-4">
                        <Search placeholder={placeholder}
                                onChange={setGlobalFilter}/>
                    </div>
                )}

                <div className="table-responsive">
                    <table {...getTableProps()} className={`table ${tableSize === TABLE_SIZE_LRG ? "" : "table-sm"}`}>
                        {renderTableHeader()}
                        {renderTableBody()}
                    </table>
                </div>
        </section>
    );
};

Table.propTypes = {
    columnConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    tableSize: PropTypes.oneOf([TABLE_SIZE_SM, TABLE_SIZE_LRG]),
    enableSearch: PropTypes.bool,
    searchConfig: PropTypes.shape({
        placeholder: PropTypes.string
    }),
    tableTitle: PropTypes.string.isRequired,
    tableToolBarElements: PropTypes.func,
    loading: PropTypes.bool
};

Table.defaultProps = {
    enableSearch: false,
    searchConfig: {
        placeholder: "Search here!"
    },
    tableSize: TABLE_SIZE_LRG,
    tableToolBarElements: undefined,
    enableSelection: false,
    enablePagination: false,
    paginationConfig: {initialPageSize: 10},
    loading: false,
};

export default Table;
