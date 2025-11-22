export const MOCK_USER_ID = 'mock-user-123'
export const MOCK_DOG_ID = 'mock-dog-123'

export const MOCK_DOGS = [
  {
    id: 'dog-2',
    name: 'Luna',
    breed: 'Husky',
    age: 2,
    bio: 'Very vocal and loves to run. Need someone who can keep up!',
    photos: ['/p1.jpeg'],
    user_id: 'user-3'
  },
  {
    id: 'dog-1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    bio: 'Loves tennis balls and long walks on the beach. Looking for a playdate!',
    photos: ['/p2.jpeg'],
    user_id: 'user-2'
  },
  {
    id: 'dog-3',
    name: 'Scooby Doo',
    breed: 'Great Dane',
    age: 7,
    bio: 'Ruh-roh! Looking for snacks and solving mysteries.',
    photos: ['/scooby.jpg'],
    user_id: 'user-scooby'
  },
  {
    id: 'dog-4',
    name: 'Daisy',
    breed: 'Beagle',
    age: 1,
    bio: 'Everything smells amazing! Let\'s go sniff some trees together.',
    photos: ['https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80'],
    user_id: 'user-5'
  },
  {
    id: 'dog-5',
    name: 'Max',
    breed: 'German Shepherd',
    age: 5,
    bio: 'Loyal and protective. Looking for a smart partner in crime.',
    photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'],
    user_id: 'user-6'
  }
]

export const MOCK_MY_DOG = {
    id: MOCK_DOG_ID,
    user_id: MOCK_USER_ID,
    name: 'Snoopy',
    breed: 'Beagle',
    age: 8,
    bio: 'Writer, pilot, and Joe Cool.',
    photos: ['/snoopy.jpeg']
}

export const MOCK_MATCHES = [
    {
        id: 'match-1',
        dog_a: MOCK_MY_DOG,
        dog_b: MOCK_DOGS[1] // Buddy
    },
    {
        id: 'match-scooby',
        dog_a: MOCK_MY_DOG,
        dog_b: MOCK_DOGS[2] // Scooby
    }
]

export const MOCK_MESSAGES = [
    {
        id: 'msg-1',
        match_id: 'match-1',
        sender_id: 'user-2',
        content: 'Woof! (Hi!)',
        created_at: new Date().toISOString()
    },
    {
        id: 'msg-2',
        match_id: 'match-1',
        sender_id: MOCK_USER_ID,
        content: 'Bork bork! (Hey there!)',
        created_at: new Date().toISOString()
    }
]
