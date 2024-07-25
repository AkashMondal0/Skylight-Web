import { Post } from "@/types";

const adjectives = ['Fast', 'Slow', 'Smart', 'Dumb', 'Strong', 'Weak', 'Amazing', 'Incredible', 'Fantastic', 'Beautiful', 'Lovely', 'Charming'];
const nouns = ['Tiger', 'Turtle', 'Rabbit', 'Elephant', 'Ant', 'Eagle', 'day', 'moment', 'experience', 'adventure', 'journey', 'memory'];

export function generateRandomUsername() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}
const verbs = ['enjoying', 'cherishing', 'loving', 'embracing', 'savoring', 'appreciating'];

export function generateRandomCaption() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];

  return `What an ${randomAdjective} ${randomNoun}! Really ${randomVerb} it.`;
}

// Array of countries
const countries = ["USA", "Canada", "Germany", "France", "Japan", "Australia", "Brazil", "India", "China", "Russia"];

// Array of places
const places = ["New York", "Toronto", "Berlin", "Paris", "Tokyo", "Sydney", "Rio de Janeiro", "Mumbai", "Beijing", "Moscow"];

// Function to generate a random index
function getRandomIndex(arrayLength: any) {
  return Math.floor(Math.random() * arrayLength);
}

// Function to generate a random country and place
export function getRandomCountryAndPlace() {
  const randomCountryIndex = getRandomIndex(countries.length);
  const randomPlaceIndex = getRandomIndex(places.length);

  return {
    country: countries[randomCountryIndex],
    place: places[randomPlaceIndex]
  };
}

export function getRandomPost(size: number) {
  const _posts: Post[] = Array.from({ length: size }, (_, i) => {
    const a = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    const b = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    const generate_img = `https://picsum.photos/id/${i + size}/${a * 100}/${b * 100}`
    return {
      id: `${i + size}`,
      content: `${generateRandomCaption()}`,
      fileUrl: [generate_img],
      title: `${getRandomCountryAndPlace().country, getRandomCountryAndPlace().place}`,
      commentCount: 4 * a,
      likeCount: 6 * b,
      createdAt: new Date().toDateString(),
      updatedAt: new Date(),
      is_Liked: false,
      user: {
        id: `user-${i + size}`,
        username: `${generateRandomUsername() + i}`,
        email: `user-${i} @gmail.com`,
        name: `User ${i + size}`,
        profilePicture: generate_img,
        followed_by: false,
        following: false
      },
      comments: [],
      likes: [],
      isDummy: true
    }
  })

  return _posts
}

export function getRandomProfilePost(size: number) {
  const _posts: Post[] = Array.from({ length: 10 }, (_, i) => {
    const generate_img = `https://picsum.photos/id/${i + size}/200/200`
    return {
      id: `${i + size}`,
      content: `Caption ${i + size}`,
      fileUrl: [generate_img],
      title: "",
      commentCount: 10,
      likeCount: 10,
      createdAt: new Date().toDateString(),
      updatedAt: new Date(),
      is_Liked: false,
      user: {
        id: `user-${i + size}`,
        username: `user-${i + size}`,
        email: `user-${i} @gmail.com`,
        name: `User ${i + size}`,
        profilePicture: generate_img,
        followed_by: false,
        following: false
      },
      comments: [],
      likes: [],
      isDummy: true
    }
  })
  return _posts
}