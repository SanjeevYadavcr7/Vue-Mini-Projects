export interface EventType {
  id: string,
  title: string,
  date: string,
  description: string,
  location: string
}

export interface BookingType {
  id: string,
  userId: string,
  eventId: string,
  eventTitle: string,
  status: string
}
