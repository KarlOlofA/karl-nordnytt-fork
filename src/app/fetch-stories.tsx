"use server";

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