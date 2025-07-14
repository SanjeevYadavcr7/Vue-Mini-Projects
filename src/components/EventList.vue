<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EventCard from './EventCard.vue';
import ErrorHandler from './ErrorHandler.vue';
import type { EventType } from '@/utils/types';
import useBookings from '@/composables/useBookings';
import LoadingEventCard from './LoadingEventCard.vue';

const events = ref<EventType[]>([]);
const error = ref<string | null>(null);
const eventsLoading = ref<Boolean>(false);

const { handleRegistration } = useBookings();

const fetchEvents = async () => {
  eventsLoading.value = true;
  error.value = null;
  try {
    events.value = await (await fetch('http://localhost:3001/events')).json();
  } catch(e) {
    error.value = 'Could not load events at the moment. Please retry to load the events';
  }
  finally {
    eventsLoading.value = false;
  }  
}

onMounted(() => {
  console.log('🔄 Events mounted');
  fetchEvents();
})

</script>

<template>
    <template v-if="error">
        <ErrorHandler :error="error" :retry="fetchEvents" />
    </template>
    <template v-else>
        <section class="grid grid-cols-2 gap-8">
            <template v-if="!eventsLoading">
                <template v-if="events.length">
                    <EventCard v-for="event in events" 
                        :key="event.id"
                        :id="event.id"
                        :title="event.title"
                        :when="event.date"
                        :description="event.description"
                        @register="handleRegistration(event)"
                    />
                </template>
                <template v-else>
                    <div class="text-red-500">No Events Found.</div>
                </template>
            </template>
            <template v-else v-for="i in 4" :key="i">
                <LoadingEventCard />
            </template>
        </section>
    </template>
</template>