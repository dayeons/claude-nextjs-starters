"use client"

import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  SearchIcon,
} from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// TanStack Table v9: 테이블이 사용할 기능(정렬·전역 검색·페이지네이션)을 명시적으로 등록합니다.
export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
    basic: sortFn_basic,
  },
})

// 컬럼 정의 시 사용하는 타입 — `DataTableColumnDef<User>[]` 형태로 사용
export type DataTableFeatures = typeof dataTableFeatures
// 컬럼마다 값 타입(TValue)이 다르므로 any로 둡니다.
export type DataTableColumnDef<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>

type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  searchPlaceholder?: string
  pageSize?: number
}

// 정렬·검색·페이지네이션을 지원하는 범용 데이터 테이블
export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder = "검색...",
  pageSize = 10,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize } },
  })

  // 입력할 때마다 필터링하지 않도록 300ms 디바운스 (usehooks-ts)
  const handleSearch = useDebounceCallback((value: string) => {
    table.setGlobalFilter(value)
  }, 300)

  const rows = table.getRowModel().rows
  const { pageIndex } = table.state.pagination
  const filteredCount = table.getFilteredRowModel().rows.length

  return (
    <div className="space-y-4">
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={searchPlaceholder}
          defaultValue={table.state.globalFilter ?? ""}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </InputGroup>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyTitle>결과가 없습니다</EmptyTitle>
                      <EmptyDescription>
                        다른 검색어로 다시 시도해 보세요.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>총 {filteredCount}건</span>
        <div className="flex items-center gap-2">
          <span>
            {pageIndex + 1} / {Math.max(table.getPageCount(), 1)} 페이지
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="이전 페이지"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="다음 페이지"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

type SortableHeaderProps<TData extends RowData> = {
  column: Column<DataTableFeatures, TData>
  title: string
}

// 클릭 시 정렬 방향을 전환하는 컬럼 헤더
export function SortableHeader<TData extends RowData>({
  column,
  title,
}: SortableHeaderProps<TData>) {
  const sorted = column.getIsSorted()
  const Icon =
    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2"
      onClick={column.getToggleSortingHandler()}
    >
      {title}
      <Icon className="text-muted-foreground" />
    </Button>
  )
}
