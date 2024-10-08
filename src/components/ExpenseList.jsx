// src/components/ExpenseList.jsx
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { PencilIcon, CheckIcon, XMarkIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useExpenses } from '../context/ExpenseContext';

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onSave = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    setIsEditing(false);
  };

  const onCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center">
        <span>{value}</span>
        <PencilIcon
          className="h-5 w-5 ml-2 text-gray-400 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-gray-300 rounded-md"
      />
      <CheckIcon
        className="h-5 w-5 ml-2 text-green-500 cursor-pointer"
        onClick={onSave}
      />
      <XMarkIcon
        className="h-5 w-5 ml-2 text-red-500 cursor-pointer"
        onClick={onCancel}
      />
    </div>
  );
};

const ExpenseList = () => {
  const { expenses, updateExpense, deleteExpense } = useExpenses();
  const [globalFilter, setGlobalFilter] = useState('');

  const data = useMemo(() => expenses, [expenses]);

  const columns = useMemo(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ getValue }) => format(parseISO(getValue()), 'dd/MM/yyyy'),
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: EditableCell,
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: EditableCell,
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: ({ getValue, row, column, table }) => (
          <EditableCell
            getValue={getValue}
            row={row}
            column={column}
            table={table}
            render={(value) => `$${Number(value).toFixed(2)}`}
          />
        ),
      },
      {
        header: 'Payment Method',
        accessorKey: 'paymentMethod',
        cell: EditableCell,
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <TrashIcon
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => deleteExpense(row.original.id)}
            />
          </div>
        ),
      },
    ],
    [deleteExpense]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        updateExpense(data[rowIndex].id, { [columnId]: value });
      },
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Expense List</h1>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;