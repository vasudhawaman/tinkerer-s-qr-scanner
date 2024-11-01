import {
  Table,
  TableHeader,
  TableHeaders,
  TableRow,
  TableRowElement,
} from "../../components/Table";

export default function DevicesUsageInfo() {
  return (
    <Table>
      <TableHeaders>
        <TableHeader>Device Name</TableHeader>
        <TableHeader>Picture</TableHeader>
        <TableHeader>Used By</TableHeader>
        <TableHeader>Last Used By</TableHeader>
      </TableHeaders>
      <tbody>
        <TableRow>
          <TableRowElement>Jetson Nano</TableRowElement>
          <TableRowElement>Pic goes here</TableRowElement>
          <TableRowElement>Adam</TableRowElement>
          <TableRowElement>{new Date().toDateString()}</TableRowElement>
        </TableRow>
      </tbody>
    </Table>
  );
}
