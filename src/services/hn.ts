"use server";
import { Comment, Story } from "@/types";

export const getTopStories = async ():Promise<Story[]> => {
  const topstories:number[] = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
    next: {
      revalidate: 120
    }
  }).then(res => res.json());
  
  return Promise.all(topstories.splice(0, 10).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  }).then(res => res.json())))
}

export const getStory = async (id:number):Promise<Story> => {
  return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  })
    .then(res => res.json());
}

export const getComment = async (id:number):Promise<Comment> => {
  return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }
  })
    .then(res => res.json());
}


export interface fetchInterface {
  page: number,
  fetchTopStories: boolean
}

export async function fetchStories(fetchData: fetchInterface){
  const perPage = 48
  let url = ""

  if (fetchData.fetchTopStories){
    url = "https://hacker-news.firebaseio.com/v0/topstories.json"
  }
  else {
    url = "https://hacker-news.firebaseio.com/v0/newstories.json"
  }

  const stories:number[] = await fetch(url, {
    next: {
      revalidate: 120
    }
  }).then(res => res.json());

  const start = fetchData.page*perPage;
  const end = start + perPage;
  const storiesToFetch = stories.slice(start, end);
  const hasMoreStories = storiesToFetch.length > 0;

  const fetchedStories= await Promise.all(storiesToFetch.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    next: {
      revalidate: 120
    }}).then(res => res.json())
  ))

  return {stories: fetchedStories, hasMoreStories};
}