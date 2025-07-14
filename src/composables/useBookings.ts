import { ref, type Ref } from "vue";
import type { BookingType, EventType } from "@/utils/types";

const loading = ref<Boolean>(false);
const error = ref<string | null>(null);
const bookings = ref<BookingType[]>([]);

const findBookingIdx = (bookingId: string) => {
  const bookingIdx = bookings.value.findIndex(booking => booking.id !== bookingId);
  return bookingIdx;
}


const fetchBookings = async () => {
  loading.value = true;
  error.value = null;
  try {
    bookings.value = await (await fetch('http://localhost:3001/bookings')).json();
  } catch (e) {
    error.value = 'Could not load your bookings at the moment. Please retry to load the bookings.';
  } 
  finally {
    loading.value = false;
  }
}

const handleRegistration = async (event: EventType) => {
  const alreadyRegistered = bookings.value.find(booking => booking.eventId === event.id && booking.userId === '1');  
  if(alreadyRegistered) {
    alert("You've already registered to this event");
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending' 
  }
  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newBooking, status: 'confirmed'})
      });
  
      if(response.ok) {
        const currBookingIdx = bookings.value.findIndex(
          (booking) => booking.id === newBooking.id
        );
        bookings.value[currBookingIdx] = await response.json();
      } else {
        throw new Error('Failed to confirm booking');
      }
  } catch(e) {
    console.log('Failed to confirm booking. Please retry!');
    bookings.value = bookings.value.filter(booking => booking.id !== newBooking.id);
  }
}


const cancelBooking = async (bookingId: string) => {
    const bookingIdx = findBookingIdx(bookingId);
    const originalBooking = bookings.value[bookingIdx];  

    bookings.value.splice(bookingIdx, 1);

    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: 'DELETE'
      })
      if(!response.ok) {
        console.log('Booking cannot be cancelled. Try again!');
      }
    } catch(e) {
        console.log('Booking cannot be cancelled. Try again!', e);
        bookings.value.splice(bookingIdx, 0, originalBooking);
    }
}


export default function useBookings(): {
  error: Ref<string | null>
  loading: Ref<Boolean>
  bookings: Ref<BookingType[]>
  fetchBookings: () => Promise<void>,
  cancelBooking: (bookingId: string) => Promise<void>
  handleRegistration: (event: EventType) => Promise<void>
} {
    return {
        error,
        loading,
        bookings, 
        fetchBookings,
        cancelBooking,
        handleRegistration
    }
}
