import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ confirmedStays, bookings, numDays, cabinCount }) {
  const totalBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => {
    return acc + booking.totalPrice;
  }, 0);
  const totalStays = confirmedStays.length;
  const totalOccupancy =
    confirmedStays.reduce((acc, stay) => {
      return acc + stay.numberNights;
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Total bookings"
        value={totalBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        value={totalStays}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        value={(totalOccupancy * 100).toFixed(2) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
