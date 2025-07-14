<script setup lang="ts">
import { onMounted } from 'vue';
import BookingItem from './BookingItem.vue';
import useBookings from '../composables/useBookings';
import LoadingBookingCard from './LoadingBookingCard.vue';
import ErrorHandler from './ErrorHandler.vue';

const { 
    error,
    bookings, 
    cancelBooking,
    fetchBookings, 
    loading: bookingsLoading
} = useBookings();

onMounted(() => {
  console.log('🔄 Booking mounted');
  fetchBookings();
});

</script>

<template>
    <template v-if="error">
        <ErrorHandler :error="error" :retry="fetchBookings" />
    </template>
    <template v-else>
        <section class="grid grid-cols-1 gap-4">
            <template v-if="!bookingsLoading">
            <BookingItem
                v-for="booking in bookings"
                :key="booking.id"
                :status="booking.status"
                :event-title="booking.eventTitle"
                @remove-booking="cancelBooking(booking.id)"
                />
            </template>
            <template v-else>
                <LoadingBookingCard v-for="i in 2" :key="i" />
            </template>
        </section>
    </template>
</template>